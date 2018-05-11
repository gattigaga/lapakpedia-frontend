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

      const valueInDesc = ({ length }) => -length;
      const getProductID = favourites => favourites[0].product;
      const getPromise = productID => axios.get(`/products/${productID}`);
      const getData = ({ data }) => data;
      const isMatch = product => category => category._id === product.category;
      const relate = product => ({
        ...product,
        image: `${config.baseURL}/public/images/products/${product.photo}`,
        href: `/products/${product._id}`,
        category: categories.find(isMatch(product)).name
      });
      const getTop4Favourites = compose(
        slice(0, 4),
        sortBy(valueInDesc),
        groupBy("product")
      );
      const getProductPromises = compose(map(getPromise), map(getProductID));
      const getTop4Products = compose(getProductPromises, getTop4Favourites);

      const responseFavouriteProducts = await Promise.all(
        getTop4Products(favourites)
      );
      const favouriteProducts = responseFavouriteProducts.map(getData);

      this.setState({
        latestProducts: latestProducts.map(relate),
        favouriteProducts: favouriteProducts.map(relate),
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
