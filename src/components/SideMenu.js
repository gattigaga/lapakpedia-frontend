import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TweenLite, TimelineLite, Power4 } from "gsap";

const Container = styled.div`
  width: 280px;
  height: 100vh;
  background: #ddd;
  padding: 48px;
  box-sizing: border-box;
  position: fixed;
  left: -100%;
`;

const List = styled.ul`
  padding: 0px;
  margin: 0px;
`;

const ListItem = styled.li`
  list-style: none;
  transition: all 0.3s ease-out;
  margin-bottom: 24px;
`;

const ListCaption = styled(Link)`
  font-family: Roboto;
  font-size: 18px;
  color: black;
  text-decoration: none;
  letter-spacing: 0.1em;
`;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.container = createRef();
    this.items = props.items.map(createRef);
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;

    if (isOpen !== nextProps.isOpen) {
      const width = 280;
      const timeline = new TimelineLite();
      const items = this.items.map(item => item.current);

      timeline
        .fromTo(
          this.container.current,
          0.6,
          {
            ease: Power4.easeIn,
            left: nextProps.isOpen ? -width : 0
          },
          {
            ease: Power4.easeIn,
            left: nextProps.isOpen ? 0 : -width
          }
        )
        .staggerFromTo(
          items,
          0.2,
          {
            ease: Power4.easeInOut,
            x: nextProps.isOpen ? -32 : 0,
            opacity: nextProps.isOpen ? 0 : 1
          },
          {
            ease: Power4.easeInOut,
            x: nextProps.isOpen ? 0 : -32,
            opacity: nextProps.isOpen ? 1 : 0
          },
          0.1
        );
    }
  }

  render() {
    const { items } = this.props;

    return (
      <Container innerRef={this.container}>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} innerRef={this.items[index]}>
              <ListCaption to={item.url}>{item.label}</ListCaption>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

SideMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  ),
  isOpen: PropTypes.bool
};

export default SideMenu;
