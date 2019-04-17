import styled from "styled-components";

const OKButton = styled.button`
  width: auto;
  background: ${props => props.theme.lightGreen};
  border-radius: 0.1rem;
  color: #fff;
  border: 0;
  font-size: 2rem;
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
