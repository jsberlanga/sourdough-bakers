import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

import Nav from "./Nav";
import Cart from "./Cart";
import Search from "./Search";

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

// const Logo = styled.h1`
//   font-size: 3rem;
//   margin-left: 2rem;
//   position: relative;
//   transform: ${props => props.theme.transform};
//   a {
//     padding: 0.5rem 1rem;
//     background: ${props => props.theme.pink};
//     color: ${props => props.theme.offWhite};
//     text-decoration: none;
//     letter-spacing: 3px;
//     border-radius: 0.2rem;
//   }
// `;

const Logo = styled.div`
  background-image: url("../static/logo2.svg");
  background-size: contain;
  background-repeat: no-repeat;
  width: 25rem;
  height: 7rem;
  position: relative;
  margin: 1rem 2rem;
  @media (max-width: 1300px) {
    width: 36rem;
    height: 10rem;
    margin: 0.4rem auto;
  }
  @media (max-width: 768px) {
    width: 30rem;
    height: 7rem;
    margin: 1rem;
  }
  @media (max-width: 360px) {
    width: 24rem;
    height: 6rem;
    margin: 1rem;
  }
  cursor: pointer;
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
  }
`;

class Header extends React.Component {
  state = {
    isOpen: true,
    search: false
  };
  handleSearchBarOpen = () => {
    this.setState({ search: !this.state.search });
  };
  render() {
    const { isOpen } = this.state;
    return (
      <StyledHeader>
        <div className="bar">
          <Link href="/">
            <Logo />
          </Link>
          {isOpen && <Nav handleSearchBarOpen={this.handleSearchBarOpen} />}
          <IoIosOptions
            className="nav-open"
            style={{
              fontSize: "3rem",
              position: "absolute",
              top: "2rem"
            }}
            onClick={() =>
              this.setState(currentState => {
                return { isOpen: !currentState.isOpen };
              })
            }
          />
        </div>
        <div className="sub-bar">{this.state.search && <Search />}</div>
        <Cart />
      </StyledHeader>
    );
  }
}

export default Header;
