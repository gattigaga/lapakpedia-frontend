import React, { Component, createRef } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { TweenLite, Power4 } from "gsap";

import Button from "components/Button";
import Logo from "components/Logo";
import MenuButton from "components/MenuButton";
import SideMenu from "components/SideMenu";
import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Login from "./Login";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  height: 80px;
  align-items: center;
  padding: 0px 24px;
  position: relative;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-left: 4px;
  font-size: 12px;
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SideContainer = styled.div`
  display: flex;
`;

class MainRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };

    this.wrapper = createRef();
    this.handleMenu = this.handleMenu.bind(this);
  }

  /**
   * Handle menu open or close
   *
   * @memberof MainRoutes
   */
  handleMenu() {
    this.setState(
      prevState => ({
        isMenuOpen: !prevState.isMenuOpen
      }),
      () => {
        const { isMenuOpen } = this.state;
        const distance = 280;

        TweenLite.fromTo(
          this.wrapper.current,
          0.6,
          {
            ease: Power4.easeIn,
            x: isMenuOpen ? 0 : distance
          },
          {
            ease: Power4.easeIn,
            x: isMenuOpen ? distance : 0
          }
        );
      }
    );
  }

  render() {
    const { isMenuOpen } = this.state;

    const items = [
      {
        label: "Home",
        url: "/"
      },
      {
        label: "Products",
        url: "/products"
      },
      {
        label: "Payment",
        url: "/payment"
      },
      {
        label: "Contact",
        url: "/contact"
      },
      {
        label: "About",
        url: "/about"
      }
    ];

    return (
      <Container>
        <SideMenu items={items} isOpen={isMenuOpen} />
        <Wrapper innerRef={this.wrapper}>
          <Header>
            <MenuButton isOpen={isMenuOpen} onClick={this.handleMenu} />
            <StyledLogo />
            <SideContainer>
              <StyledButton caption="Register" isOutlined />
              <StyledButton caption="Login" href="/login" />
            </SideContainer>
          </Header>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/products" component={Products} exact />
            <Route path="/products/:id" component={ProductDetail} />
          </Switch>
        </Wrapper>
      </Container>
    );
  }
}

export default MainRoutes;
