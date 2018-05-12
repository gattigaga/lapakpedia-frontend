import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { compose, slice, sortBy, groupBy, map } from "lodash/fp";

import config from "config/app";
import ProductStage from "components/ProductStage";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 24px;
  box-sizing: border-box;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latestProducts: [],
      favouriteProducts: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  /**
   * Get product list
   *
   * @memberof Home
   */
  async getProducts() {
    this.setState({ isLoading: true });

    try {
      const [
        responseLatestProducts,
        responseFavourites,
        responseCategories
      ] = await Promise.all([
        axios.get("/products?sortBy=desc&take=4"),
        axios.get("/favourites"),
        axios.get("/categories")
      ]);
      const latestProducts = responseLatestProducts.data;
      const favourites = responseFavourites.data;
      const categories = responseCategories.data;

      const sum = (total, { rate }) => total + rate;
      const valueInDesc = ({ length }) => -length;
      const getProductID = favourites => favourites[0].product;
      const getProductPromise = id => axios.get(`/products/${id}`);
      const getPurchasePromise = product =>
        axios.get(`/purchases?productID=${product._id}`);
      const getData = ({ data }) => data;
      const isCategoryMatch = product => category =>
        category._id === product.category;
      const isPurchaseMatch = product => purchases => {
        const totalPurchases = purchases.length;

        if (totalPurchases > 0) {
          return product._id === purchases[0].product;
        }

        return false;
      };
      const relate = (categories, purchases) => product => {
        const category = categories.find(isCategoryMatch(product)).name;
        const reviews = purchases.find(isPurchaseMatch(product)) || [];
        const totalRating = reviews.reduce(sum, 0);
        const totalReviews = reviews.length;
        const rating = totalRating / totalReviews;

        return {
          ...product,
          category,
          totalReviews,
          rating: isNaN(rating) ? 0 : rating,
          image: `${config.baseURL}/public/images/products/${product.photo}`,
          href: `/products/${product._id}`
        };
      };

      const getTop4Products = compose(
        map(getProductPromise),
        map(getProductID),
        slice(0, 4),
        sortBy(valueInDesc),
        groupBy("product")
      );

      const responseFavouriteProducts = await Promise.all(
        getTop4Products(favourites)
      );
      const favouriteProducts = responseFavouriteProducts.map(getData);

      const products = [...latestProducts, ...favouriteProducts];
      const purchasePromises = products.map(getPurchasePromise);

      const responsePurchases = await Promise.all(purchasePromises);
      const purchases = responsePurchases.map(getData);

      const withRelation = map(relate(categories, purchases));

      this.setState({
        latestProducts: withRelation(latestProducts),
        favouriteProducts: withRelation(favouriteProducts),
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false }, () => {
        console.error(error);
        alert("Sorry, cannot get products");
      });
    }
  }

  render() {
    const { latestProducts, favouriteProducts } = this.state;

    return (
      <Container>
        <Wrapper>
          <ProductStage
            label="New Arrival"
            link="/products"
            products={latestProducts}
          />
          <ProductStage
            label="Favourites"
            link="/products"
            products={favouriteProducts}
          />
        </Wrapper>
      </Container>
    );
  }
}

export default Home;
