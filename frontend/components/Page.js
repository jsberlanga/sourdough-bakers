import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

injectGlobal`
  @font-face {
    font-family: 'adobe-garamond-pro';
    src: url('/static/AGaramondPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal
  }
  body {
    font-family: 'adobe-garamond-pro';
  }
`;

export default class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    );
  }
}
