import React, { Component } from "react";
import Link from "next/link";

const Nav = () => (
  <div>
    <Link href="/sell">
      <a>Sell Page</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Nav;
