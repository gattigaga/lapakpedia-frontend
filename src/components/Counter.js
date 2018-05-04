import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 96px;
  height: 32px;
  border: 1px solid black;
  display: flex;
`;

export const Button = styled.button`
  background: black;
  color: white;
  width: 32px;
  height: 100%;
  border: 0px;
  font-family: Roboto;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  user-select: none;
`;

export const Input = styled.input`
  width: 32px;
  height: 100%;
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 16px;
  border: 0px;
  text-align: center;
  outline: none;
`;

const Counter = ({ value, onClickPlus, onClickMinus, onChange }) => (
  <Container>
    <Button onClick={onClickMinus}>-</Button>
    <Input type="text" value={value} maxLength={2} onChange={onChange} />
    <Button onClick={onClickPlus}>+</Button>
  </Container>
);

Counter.propTypes = {
  onClickPlus: PropTypes.func,
  onClickMinus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.number
};

Counter.defaultProps = {
  value: 0
};

export default Counter;
