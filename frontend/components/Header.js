import React, { Component } from "react";
import Nav from "./Nav";

const Header = () => (
  <>
    <div className="bar">
      <a href="">Sourdough Bakers</a>
    </div>
    <Nav />
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </>
);

export default Header;
