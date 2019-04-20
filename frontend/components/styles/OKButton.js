import styled from "styled-components";

const OKButton = styled.button`
  width: auto;
  background: ${props => props.theme.lightGreen3};
  border-radius: 0.1rem;
  color: ${props => props.theme.offWhite};
  border: 0;
  font-size: 2.5rem;
  font-weight: 600;
  padding: 0.9rem 1.7rem;
  font-family: "adobe-garamond-pro-bold";
  outline: none;
  cursor: pointer;
  transition: all 0.1s;

  :active {
    background: ${props => props.theme.lightGreen2};
  }
`;

export default OKButton;
