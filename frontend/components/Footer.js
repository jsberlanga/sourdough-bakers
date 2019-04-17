import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.div`
  height: 15rem;
  background: ${props => props.theme.grey};
  color: ${props => props.theme.offWhite};
  position: relative;
  margin-top: 5rem;
  .title {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 3rem;
    font-size: 2rem;
  }
`;

const Footer = () => (
  <StyledFooter>
    <div className="title">
      © {new Date().getFullYear()}, sourdoughbakers.com. All rights reserved.
    </div>
  </StyledFooter>
);

export default Footer;
