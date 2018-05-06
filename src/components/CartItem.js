import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { toCurrency, cutText } from "helpers/formatter";
import Counter from "./Counter";

const Container = styled.div`
  display: flex;
  padding: 18px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 18px;
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Name = styled.h5`
  font-family: Roboto;
  font-size: 16px;
  color: black;
  margin: 0px;
  margin-bottom: 18px;
`;

const Price = styled.p`
  font-size: 24px;
  font-family: Roboto;
  color: #ff8800;
  margin: 0px;
  margin-right: 32px;
`;

export const CloseButton = styled.span`
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  position: absolute;
  top: 4px;
  right: 4px;
`;

const CartItem = ({
  onClickClose,
  onClickMinus,
  onClickPlus,
  onChange,
  maximum,
  value,
  name,
  image,
  price
}) => {
  const totalWords = name.split(" ").length;

  return (
    <Container>
      <Image src={image} />
      <ContentContainer>
        <Name>{totalWords > 5 ? cutText(5, name) : name}</Name>
        <Counter
          onClickPlus={onClickPlus}
          onClickMinus={onClickMinus}
          onChange={onChange}
          maximum={maximum}
          value={value}
        />
      </ContentContainer>
      <Price>$ {toCurrency(price)}</Price>
      <CloseButton onClick={onClickClose}>&times;</CloseButton>
    </Container>
  );
};

CartItem.propTypes = {
  onClickClose: PropTypes.func,
  onClickMinus: PropTypes.func,
  onClickPlus: PropTypes.func,
  onChange: PropTypes.func,
  maximum: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
};

export default CartItem;
