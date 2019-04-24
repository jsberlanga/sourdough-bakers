import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8rem;
  margin-bottom: -10rem;
  background: ${props => props.theme.grey};
  color: ${props => props.theme.offWhite};
  letter-spacing: 2px;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .title {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2rem;
    font-size: 1.7rem;
    font-family: "adobe-garamond-pro-italic";
  }
`;

const Footer = () => (
  <StyledFooter>
    <div className="title">
      © {new Date().getFullYear()}, sourdoughbakers All rights reserved.
    </div>
  </StyledFooter>
);

export default Footer;
