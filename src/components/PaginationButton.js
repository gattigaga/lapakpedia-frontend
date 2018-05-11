import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TweenLite, Power2 } from "gsap";
import { Link } from "react-router-dom";

import { capitalize } from "helpers/formatter";

const Container = styled.svg`
  width: 80px;
  height: 36px;
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
`;

const Layer = styled.rect`
  width: 100%;
  height: 100%;
  fill: ${props => (props.isDisabled ? "white" : "black")};
  stroke-width: 1px;
  stroke: black;
`;

const Label = styled.text`
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: 0.1em;
  fill: ${props => (props.isDisabled ? "black" : "white")};
  text-anchor: middle;
  alignment-baseline: middle;
`;

const Line = styled.line`
  stroke: white;
  stroke-width: 2px;
  opacity: 0;
`;

class PaginationButton extends Component {
  constructor(props) {
    super(props);

    this.lines = [...Array(3)].map(createRef);
    this.label = createRef();

    this.handleAnimation = this.handleAnimation.bind(this);
    this.createLines = this.createLines.bind(this);
  }

  /**
   * Handle animation while hovered
   *
   * @param {boolean} isEnter - Check if mouse entering this component
   * @memberof PaginationButton
   */
  handleAnimation(isEnter) {
    const { type } = this.props;
    let labelX = 0;
    let linesXY = [];

    if (type === "prev") {
      labelX = isEnter ? "65%" : "50%";
      linesXY = [
        {
          x: isEnter ? "13%" : "35%",
          y: isEnter ? "50%" : "35%"
        },
        {
          x: isEnter ? "13%" : "35%"
        },
        {
          x: isEnter ? "13%" : "35%",
          y: isEnter ? "50%" : "65%"
        }
      ];
    } else {
      labelX = isEnter ? "35%" : "50%";
      linesXY = [
        {
          x: isEnter ? "87%" : "65%",
          y: isEnter ? "50%" : "35%"
        },
        {
          x: isEnter ? "87%" : "65%"
        },
        {
          x: isEnter ? "87%" : "65%",
          y: isEnter ? "50%" : "65%"
        }
      ];
    }

    TweenLite.to(this.label.current, 0.3, {
      ease: Power2.easeInOut,
      attr: {
        x: labelX
      }
    });

    TweenLite.to(this.lines[0].current, 0.3, {
      ease: Power2.easeInOut,
      opacity: isEnter ? 1 : 0,
      attr: {
        x1: linesXY[0].x,
        y1: linesXY[0].y
      }
    });

    TweenLite.to(this.lines[1].current, 0.3, {
      ease: Power2.easeInOut,
      opacity: isEnter ? 1 : 0,
      attr: {
        x1: linesXY[1].x
      }
    });

    TweenLite.to(this.lines[2].current, 0.3, {
      ease: Power2.easeInOut,
      opacity: isEnter ? 1 : 0,
      attr: {
        x1: linesXY[2].x,
        y1: linesXY[2].y
      }
    });
  }

  /**
   * Construct arrow by direction type
   *
   * @returns
   * @memberof PaginationButton
   */
  createLines() {
    const { type } = this.props;

    if (type === "prev") {
      return [
        <Line
          key={0}
          x1="13%"
          y1="50%"
          x2="20%"
          y2="35%"
          innerRef={this.lines[0]}
        />,
        <Line
          key={1}
          x1="13%"
          y1="50%"
          x2="35%"
          y2="50%"
          innerRef={this.lines[1]}
        />,
        <Line
          key={2}
          x1="13%"
          y1="50%"
          x2="20%"
          y2="65%"
          innerRef={this.lines[2]}
        />
      ];
    }

    return [
      <Line
        key={0}
        x1="87%"
        y1="50%"
        x2="80%"
        y2="35%"
        innerRef={this.lines[0]}
      />,
      <Line
        key={1}
        x1="87%"
        y1="50%"
        x2="65%"
        y2="50%"
        innerRef={this.lines[1]}
      />,
      <Line
        key={2}
        x1="87%"
        y1="50%"
        x2="80%"
        y2="65%"
        innerRef={this.lines[2]}
      />
    ];
  }

  render() {
    const { isDisabled, type, href } = this.props;

    return (
      <Link to={isDisabled ? "#" : href}>
        <Container
          isDisabled={isDisabled}
          onMouseEnter={() => !isDisabled && this.handleAnimation(true)}
          onMouseLeave={() => !isDisabled && this.handleAnimation(false)}
        >
          <Layer isDisabled={isDisabled} />
          {this.createLines()}
          <Label x="50%" y="52%" innerRef={this.label} isDisabled={isDisabled}>
            {capitalize(type)}
          </Label>
        </Container>
      </Link>
    );
  }
}

PaginationButton.propTypes = {
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(["next", "prev"]),
  href: PropTypes.string
};

PaginationButton.defaultProps = {
  type: "next",
  href: "#"
};

export default PaginationButton;
