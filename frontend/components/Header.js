import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

import Nav from "./Nav";

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
  top: 20%;
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
  @media (max-width: 1300px) {
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  margin: 2rem;
  .bar {
    border-bottom: 10px solid ${props => props.theme.offBlack};
    height: 10rem;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    height: 4rem;
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Sourdough Bakers</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);

export default Header;
