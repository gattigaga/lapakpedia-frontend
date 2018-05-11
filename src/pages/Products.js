import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import queryString from "query-string";

import config from "config/app";
import Product from "components/Product";
import PaginationButton from "components/PaginationButton";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 24px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
`;

const SpreadRow = Row.extend`
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-left: ${props => (props.position === "left" ? "0px" : "32px")};
  padding-right: ${props => (props.position === "right" ? "0px" : "32px")};
  margin-bottom: 32px;
`;

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: false,
      isHasNextPage: false
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.getProducts(nextProps);
  }

  /**
   * Get product list
   *
   * @memberof Product
   */
  async getProducts(props = this.props) {
    const { location } = props;
    const { page = 1 } = queryString.parse(location.search);
    const productsEachPage = 8;

    this.setState({ isLoading: true });

    try {
      const [
        responseProducts,
        responseNextProducts,
        responseCategories
      ] = await Promise.all([
        axios.get("/products", {
          params: {
            skip: (page - 1) * productsEachPage,
            take: productsEachPage
          }
        }),
        axios.get("/products", {
          params: {
            skip: page * productsEachPage,
            take: productsEachPage
          }
        }),
        axios.get("/categories")
      ]);
      const products = responseProducts.data;
      const isHasNextPage = responseNextProducts.data.length > 0;
      const categories = responseCategories.data;

      const isMatch = product => category => category._id === product.category;
      const relate = product => ({
        ...product,
        image: `${config.baseURL}/public/images/products/${product.photo}`,
        href: `/products/${product._id}`,
        category: categories.find(isMatch(product)).name
      });

      this.setState({
        isHasNextPage,
        isLoading: false,
        products: products.map(relate)
      });
    } catch (error) {
      this.setState({ isLoading: false }, () => console.error(error));
    }
  }

  render() {
    const { products, isLoading, isHasNextPage } = this.state;
    const { location, match } = this.props;
    let { page = 1 } = queryString.parse(location.search);
    page = Number(page);

    const totalProducts = products.length;
    const productsEachRow = 4;
    const totalRows = Math.ceil(totalProducts / productsEachRow);
    const isMatchRow = rowIndex => (product, productIndex) => {
      return Math.floor(productIndex / productsEachRow) === rowIndex;
    };
    const getProductsInRow = (products, rowIndex) =>
      products.filter(isMatchRow(rowIndex));

    return (
      <Container>
        <Wrapper>
          {!isNaN(totalRows) &&
            [...Array(totalRows)].map((row, rowIndex) => {
              const currentProducts = getProductsInRow(products, rowIndex);
              const totalColumnLeft = productsEachRow - currentProducts.length;

              return (
                <Row key={rowIndex}>
                  {currentProducts.map((product, productIndex) => {
                    let position = "center";

                    if (productIndex === 0) {
                      position = "left";
                    } else if (productIndex === productsEachRow - 1) {
                      position = "right";
                    }

                    return (
                      <Column key={productIndex} position={position}>
                        <Product {...product} />
                      </Column>
                    );
                  })}
                  {currentProducts.length < productsEachRow &&
                    [...Array(totalColumnLeft)].map(() => <Column />)}
                </Row>
              );
            })}
          <SpreadRow>
            <PaginationButton
              type="prev"
              href={`${match.url}?page=${isLoading ? page : page - 1}`}
              isDisabled={page <= 1}
            />
            <PaginationButton
              type="next"
              href={`${match.url}?page=${isLoading ? page : page + 1}`}
              isDisabled={!isHasNextPage}
            />
          </SpreadRow>
        </Wrapper>
      </Container>
    );
  }
}

export default Products;
