import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

import config from "config/app";
import { toCurrency } from "helpers/formatter";
import Button from "components/Button";
import Rating from "components/Rating";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 24px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
`;

const LeftColumn = Column.extend`
  padding-right: 96px;
  box-sizing: border-box;
`;

const RightColumn = Column.extend`
  padding-left: 96px;
  text-align: right;
  box-sizing: border-box;
`;

const BuyButton = styled(Button)`
  font-size: 12px;
  height: 32px;
`;

const Image = styled.img`
  width: 480px;
  height: 480px;
  object-fit: cover;
`;

const SmallCaption = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: #aaa;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-family: Roboto;
  line-height: 1.5em;
`;

const Name = styled.h1`
  font-family: Roboto;
  font-size: 48px;
  margin: 0px;
`;

const Category = styled.p`
  margin-top: 12px;
  margin-bottom: 32px;
  font-family: Roboto;
  font-size: 18px;
  color: #aaa;
`;

const Price = styled.p`
  margin-top: 72px;
  font-family: Roboto;
  font-size: 36px;
  color: #ff8800;
`;

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      averageRating: 0,
      totalFavourites: 0,
      totalReviews: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  /**
   * Get single product
   *
   * @memberof ProductDetail
   */
  async getProduct() {
    const { match } = this.props;
    const { params } = match;

    this.setState({ isLoading: true });

    try {
      const [
        responseProduct,
        responseFavourites,
        responsePurchases
      ] = await Promise.all([
        axios.get(`/products/${params.id}`),
        axios.get(`/favourites?productID=${params.id}`),
        axios.get(`/purchases?productID=${params.id}`)
      ]);
      let product = responseProduct.data;
      const purchases = responsePurchases.data;
      const totalFavourites = responseFavourites.data.length;

      const sum = (total, { rate }) => total + rate;
      const totalRating = purchases.reduce(sum, 0);
      const totalReviews = purchases.length;
      const averageRating = totalRating / totalReviews;

      const responseCategory = await axios.get(
        `/categories/${product.category}`
      );
      const category = responseCategory.data;

      product = {
        ...product,
        image: `${config.baseURL}/public/images/products/${product.photo}`,
        category: category.name
      };

      this.setState({
        product,
        averageRating,
        totalFavourites,
        totalReviews,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false }, () => {
        console.error(error);
        alert("Sorry, cannot get product");
      });
    }
  }

  render() {
    const { product, averageRating, totalReviews } = this.state;

    return (
      <Container>
        <Wrapper>
          <Row>
            <LeftColumn>
              <Description>{product.description}</Description>
            </LeftColumn>
            <Column>
              <Image src={product.image} alt="Product" />
            </Column>
            <RightColumn>
              <Name>{product.name}</Name>
              <Category>{product.category}</Category>
              <Rating value={averageRating} size={24} isDisabled />
              <SmallCaption>{totalReviews} reviews</SmallCaption>
              <Price>$ {toCurrency(product.price)}</Price>
              <BuyButton caption="Add to Cart" />
            </RightColumn>
          </Row>
        </Wrapper>
      </Container>
    );
  }
}

export default ProductDetail;
