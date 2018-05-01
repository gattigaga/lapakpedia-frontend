import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TweenLite, Power2 } from "gsap";

const Container = styled.svg`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const Line = styled.line`
  stroke-width: 4px;
  stroke: black;
`;

class MenuButton extends Component {
  constructor(props) {
    super(props);

    this.lines = [...Array(3)].map(createRef);
  }

  componentDidMount() {
    const { isOpen } = this.props;

    this.handleAnimation(isOpen);
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;

    if (isOpen !== nextProps.isOpen) {
      this.handleAnimation(nextProps.isOpen);
    }
  }

  /**
   * Handle open and close state animation
   *
   * @param {boolean} isOpen - Check if user wants menu button to open or not
   * @memberof MenuButton
   */
  handleAnimation(isOpen) {
    const getY = index => 32 / 4 * (index + 1);

    TweenLite.to(this.lines[0].current, 0.3, {
      ease: Power2.easeInOut,
      attr: {
        y1: getY(isOpen ? 1 : 0),
        y2: getY(isOpen ? 1 : 0)
      }
    });

    TweenLite.to(this.lines[2].current, 0.3, {
      ease: Power2.easeInOut,
      attr: {
        y1: getY(isOpen ? 1 : 2),
        y2: getY(isOpen ? 1 : 2)
      }
    });
  }

  render() {
    const { onClick } = this.props;

    return (
      <Container onClick={onClick}>
        {[...Array(3)].map((line, index) => {
          const y = `${32 / 4 * (index + 1)}px`;

          return (
            <Line
              key={index}
              x1="4px"
              y1={y}
              x2="28px"
              y2={y}
              innerRef={this.lines[index]}
            />
          );
        })}
      </Container>
    );
  }
}

MenuButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func
};

MenuButton.defaultProps = {
  isOpen: false
};

export default MenuButton;
