import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 0px;
  border-bottom: 1px solid black;
  padding: 4px 0px;
  outline: none;
  font-size: 14px;
  font-family: Roboto;
  letter-spacing: 0.1em;
`;

const SearchBar = ({ onChange, onPressEnter }) => (
  <Input
    type="text"
    onChange={onChange}
    onKeyPress={event => event.key === "Enter" && onPressEnter()}
    placeholder="Search Products"
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func
};

SearchBar.defaultProps = {
  onChange: () => {},
  onPressEnter: () => {}
};

export default SearchBar;