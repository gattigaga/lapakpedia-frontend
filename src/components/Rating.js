import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Star from "react-icons/lib/io/star";

export const StyledStar = styled(Star)`
  color: ${props => (props.isFilled ? "#ff8800" : "#bbb")};
  ${props => !props.isDisabled && "cursor: pointer"};
`;

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredValue: props.value
    };

    this.handleHover = this.handleHover.bind(this);
  }

  /**
   * Handle hovered star value
   *
   * @param {number} value - Star value
   * @memberof Rating
   */
  handleHover(value) {
    this.setState({ hoveredValue: value });
  }

  render() {
    const { hoveredValue } = this.state;
    const { value, onClick, isDisabled } = this.props;

    return (
      <div>
        {[...Array(5)].map((star, index) => {
          const newValue = index + 1;

          return (
            <StyledStar
              key={index}
              isFilled={newValue <= hoveredValue}
              isDisabled={isDisabled}
              onClick={() => onClick(newValue)}
              onMouseEnter={() => !isDisabled && this.handleHover(newValue)}
              onMouseLeave={() => !isDisabled && this.handleHover(value)}
            />
          );
        })}
      </div>
    );
  }
}

Rating.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};

export default Rating;
