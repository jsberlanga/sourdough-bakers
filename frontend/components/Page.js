import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";

const theme = {
  pink: "#e4508f",
  blue: "#88A2E8",
  blue2: "#6F89CF",
  blue3: "#556fb5",
  grey: "#414F5D",
  yellow: "#FFDB78",
  yellow2: "#ffc15e",
  offBlack: "#364f6b",
  offWhite: "#f5f5f5",
  lightGrey: "#dee1ec",
  lightGrey2: "#D1D4DF",
  lightGrey3: "#C5C8D3",
  lightGreen: "#aeddcd",
  lightGreen2: "#A1D0C0",
  lightGreen3: "#95C4B4",
  bs: "4px 6px 6px -2px rgba(65, 79, 93, 0.1)",
  transform: "skew(-4deg) rotate(-1deg)"
};

const StyledPage = styled.div`
  color: ${props => props.theme.offBlack};
`;

const Inner = styled.div`
  max-width: 90vw;
  margin: 0 auto;
`;

injectGlobal`
  @font-face {
    font-family: 'adobe-garamond-pro';
    src: url('/static/AGaramondPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal
  }
  @font-face {
    font-family: 'adobe-garamond-pro-italic';
    src: url('/static/AGaramondPro-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic
  }
  @font-face {
    font-family: 'adobe-garamond-pro-bold';
    src: url('/static/AGaramondPro-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
    margin: 0;
    padding: 0;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'adobe-garamond-pro';
    line-height: 1.7;
    font-size: 1.6rem;
    background: #f5f5f5;
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
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
