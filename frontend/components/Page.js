import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  pink: "#e4508f",
  blue: "#556fb5",
  gray: "#414F5D",
  yellow: "#eac100",
  offBlack: "#364f6b",
  offWhite: "#f5f5f5",
  lightGrey: "#dee1ec",
  lightYellow: "#fffeec",
  lightGreen: "#aeddcd",
  maxWidth: "70rem",
  bs: "0 6px 12px 0 rgba(0, 0, 0, 0.1)"
};

const StyledPage = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.offBlack};
`;

const Inner = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.theme.blue};
`;

injectGlobal`
  @font-face {
    font-family: 'adobe-garamond-pro';
    src: url('/static/AGaramondPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit
  }
  body {
    font-family: 'adobe-garamond-pro';
    line-height: 1.7;
    font-size: 1.6rem
  }
  a {
    text-decoration: none;
    color: ${theme.offBlack}
  }
  a, button {letter-spacing: 2px}
  h1, h2, h3, h4, h5 {letter-spacing: 5px}
  h1 {font-size: 1.802em}
  h2 {font-size: 1.602em}
  h3 {font-size: 1.424em}
  h4 {font-size: 1.266em}
  h5 {font-size: 1.125em}
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
