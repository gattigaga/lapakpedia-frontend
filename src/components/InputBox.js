import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  border: 0px;
  border-bottom: 1px solid ${props => (props.isError ? "red" : "#ccc")};
  outline: none;
  font-size: 14px;
  font-family: Roboto;
  letter-spacing: 0.1em;
  padding: 8px 0px;
  width: 100%;
`;

export const Helper = styled.p`
  margin: 0px;
  margin-top: 2px;
  font-family: Roboto;
  font-size: 11px;
  color: ${props => (props.isError ? "red" : "#aaa")};
`;

const InputBox = ({
  placeholder,
  type,
  name,
  value,
  helperText,
  onChange,
  isError,
  isDisabled
}) => (
  <Container>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellcheck="false"
      isError={isError}
      disabled={isDisabled}
    />
    {helperText && <Helper isError={isError}>{helperText}</Helper>}
  </Container>
);

InputBox.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool
};

InputBox.defaultProps = {
  placeholder: "Placeholder"
};

export default InputBox;
