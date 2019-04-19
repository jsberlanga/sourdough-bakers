import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

import Nav from "./Nav";
import Cart from "./Cart";

import { IoIosOptions } from "react-icons/io";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 3rem;
  margin-left: 2rem;
  position: relative;
  transform: ${props => props.theme.transform};
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.pink};
    color: ${props => props.theme.offWhite};
    text-decoration: none;
    letter-spacing: 3px;
    border-radius: 0.2rem;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.offBlack};
    height: auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
    align-items: stretch;
    .nav-open {
      display: none;
    }
    @media (max-width: 1300px) {
      text-align: center;
      grid-template-columns: 1fr;
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: left;
      .nav-open {
        display: initial;
        position: absolute;
        top: 5%;
        right: 5%;
        cursor: pointer;
        color: ${props => props.theme.pink};
      }
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;

class Header extends React.Component {
  state = {
    isOpen: true
  };
  render() {
    const { isOpen } = this.state;
    return (
      <StyledHeader>
        <div className="bar">
          <Logo>
            <Link href="/">
              <a>Sourdough Bakers</a>
            </Link>
          </Logo>
          {isOpen && <Nav />}
          <IoIosOptions
            className="nav-open"
            style={{ fontSize: "3rem" }}
            onClick={() =>
              this.setState(currentState => {
                return { isOpen: !currentState.isOpen };
              })
            }
          />
        </div>
        <div className="sub-bar">
          <p>Search</p>
        </div>
        <Cart />
      </StyledHeader>
    );
  }
}

export default Header;
