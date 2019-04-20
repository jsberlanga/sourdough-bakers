import styled from "styled-components";

const CloseButton = styled.button`
  width: 4rem;
  height: 4rem;
  font-size: 2.5rem;
  border-radius: 50%;
  border: none;
  font-family: "adobe-garamond-pro-bold";
  cursor: pointer;
  outline: none;
  background: ${props => props.theme.offBlack};
  margin: auto;
  color: ${props => props.theme.offWhite};
  position: absolute;
  top: 3rem;
  right: 1.7rem;
  :before {
    content: "🞭";
    margin-left: 10%;
  }
  :active {
    background: #455a64;
  }
`;

export default CloseButton;
