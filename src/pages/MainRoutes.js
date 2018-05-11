import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Button from "components/Button";
import Logo from "components/Logo";
import MenuButton from "components/MenuButton";
import SearchBar from "components/SearchBar";
import Home from "./Home";
import Products from "./Products";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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
      isMenuOpen: false,
      keyword: ""
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
  }

  /**
   * Handle menu open or close
   *
   * @memberof MainRoutes
   */
  handleMenu() {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  }

  /**
   * Update search keyword
   *
   * @param {object} event - DOM event
   * @memberof MainRoutes
   */
  updateKeyword(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    const { isMenuOpen, keyword } = this.state;

    return (
      <Container>
        <Header>
          <MenuButton isOpen={isMenuOpen} onClick={this.handleMenu} />
          <StyledLogo />
          <SideContainer>
            <StyledButton caption="Register" isOutlined />
            <StyledButton caption="Login" />
          </SideContainer>
        </Header>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/products" component={Products} />
        </Switch>
      </Container>
    );
  }
}

export default MainRoutes;
