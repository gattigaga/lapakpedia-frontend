import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.h1`
  font-size: ${props => props.fontSize}px;
  font-family: Roboto;
  margin: 0px;
`;

const Logo = props => <Text {...props}>Lapakpedia</Text>;

Logo.propTypes = {
  fontSize: PropTypes.number,
  className: PropTypes.string
};

Logo.defaultProps = {
  fontSize: 32
};

export default Logo;
