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
  background: ${props => (props.disabled ? "white" : "black")};
  color: ${props => (props.disabled ? "black" : "white")};
  width: 32px;
  height: 100%;
  border: 0px;
  font-family: Roboto;
  font-size: 18px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
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

const Counter = ({ value, maximum, onClickPlus, onClickMinus, onChange }) => (
  <Container>
    <Button onClick={onClickMinus} disabled={value === 1}>
      -
    </Button>
    <Input type="text" value={value} maxLength={2} onChange={onChange} />
    <Button onClick={onClickPlus} disabled={value === maximum}>
      +
    </Button>
  </Container>
);

Counter.propTypes = {
  onClickPlus: PropTypes.func,
  onClickMinus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.number,
  maximum: PropTypes.number
};

Counter.defaultProps = {
  value: 1,
  maximum: 99
};

export default Counter;
