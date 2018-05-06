import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: cover;
  border-radius: 100%;
`;

const Avatar = props => <Image {...props} />;

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number
};

Avatar.defaultProps = {
  size: 48,
  alt: "Profile"
};

export default Avatar;
