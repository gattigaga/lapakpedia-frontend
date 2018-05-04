import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  background: ${props => (props.isOutlined ? "white" : "black")};
  color: ${props => (props.isOutlined ? "black" : "white")};
  border: 1px solid black;
  outline: none;
  padding: 8px 16px;
  font-family: Roboto;
  cursor: pointer;
  transition: all 0.15s ease-in;
  letter-spacing: 0.1em;
  width: ${props => (props.isFullWidth ? "100%" : "auto")};

  &:hover {
    background: ${props => (props.isOutlined ? "black" : "white")};
    color: ${props => (props.isOutlined ? "white" : "black")};
  }
`;

const Button = ({ caption, type, onClick, href, isOutlined, isFullWidth }) => {
  const button = (
    <StyledButton
      type={type}
      onClick={onClick}
      isOutlined={isOutlined}
      isFullWidth={isFullWidth}
    >
      {caption}
    </StyledButton>
  );

  return href ? <Link to={href}>{button}</Link> : button;
};

Button.propTypes = {
  caption: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  isOutlined: PropTypes.bool,
  isFullWidth: PropTypes.bool
};

Button.defaultProps = {
  caption: "Button",
  type: "button"
};

export default Button;
