import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { toCurrency, cutText } from "helpers/formatter";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  border: 1px solid #eee;
  cursor: pointer;
  height: 100%;
  position: relative;
`;

const Name = styled.h5`
  font-family: Roboto;
  color: black;
  margin: 0px;
  text-decoration: none;
`;

const Category = styled.p`
  font-family: Roboto;
  font-size: 10px;
  color: #aaa;
  margin-top: 4px;
  margin-bottom: 14px;
`;

const Price = styled.p`
  font-family: Roboto;
  font-size: 16px;
  margin: 0px;
  color: #ff8800;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const DetailContainer = styled.div`
  padding: 12px;
  box-sizing: border-box;
`;

const Layer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
`;

const WarnText = styled.p`
  font-family: Roboto;
  font-size: 24px;
  color: white;
  margin: auto;
`;

const Product = ({ image, name, category, price, href, isNoStock }) => {
  const totalWords = name.split(" ").length;

  return (
    <StyledLink to={href}>
      <Container>
        <Image src={image} />
        <DetailContainer>
          <Name>{totalWords > 7 ? cutText(name) : name}</Name>
          <Category>{category}</Category>
          <Price>$ {toCurrency(price)}</Price>
        </DetailContainer>
        {isNoStock && (
          <Layer>
            <WarnText>Out of Stock</WarnText>
          </Layer>
        )}
      </Container>
    </StyledLink>
  );
};

Product.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  href: PropTypes.string,
  isNoStock: PropTypes.bool
};

Product.defaultProps = {
  href: "#"
};

export default Product;
