import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Product from "components/Product";

const Container = styled.div`
  margin-bottom: 32px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Label = styled.span`
  font-size: 24px;
  font-family: Roboto;
`;

const StyledLink = styled(Link)`
  color: #bbb;
  font-size: 14px;
  font-family: Roboto;
  text-decoration: none;
`;

const Content = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-left: ${props => (props.position === "left" ? "0px" : "32px")};
  padding-right: ${props => (props.position === "right" ? "0px" : "32px")};
  margin-bottom: 32px;
`;

const ProductStage = ({ products, label, link }) => (
  <Container>
    <Header>
      <Label>{label}</Label>
      <StyledLink to={link}>View All ></StyledLink>
    </Header>
    <Content>
      {products.map((product, index) => {
        const productsEachRow = 4;
        let position = "center";

        if (index === 0) {
          position = "left";
        } else if (index === productsEachRow - 1) {
          position = "right";
        }

        return (
          <Column key={product._id} position={position}>
            <Product {...product} href="#" />
          </Column>
        );
      })}
    </Content>
  </Container>
);

ProductStage.propTypes = {
  products: PropTypes.array.isRequired,
  label: PropTypes.string,
  link: PropTypes.string
};

ProductStage.defaultProps = {
  label: "Label",
  link: "#"
};

export default ProductStage;
