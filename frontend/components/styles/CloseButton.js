import styled from "styled-components";

const CloseButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  font-family: "adobe-garamond-pro-bold";
  cursor: pointer;
  outline: none;
  background: ${props => props.theme.offBlack};
  margin: auto;
  color: ${props => props.theme.offWhite};
  position: absolute;
  top: 2rem;
  right: 2rem;
  :before {
    content: "🞭";
  }
  :active {
    background: #455a64;
  }
`;

export default CloseButton;
