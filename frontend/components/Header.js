import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

import Nav from "./Nav";

const Logo = styled.h1`
  font-size: 3rem;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.pink};
    color: ${props => props.theme.offWhite};
    text-decoration: none;
    letter-spacing: 3px;
  }
  @media (max-width: 1300px) {
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.offBlack};
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
