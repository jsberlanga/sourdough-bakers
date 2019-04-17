import styled from "styled-components";

const FormButton = styled.button`
  margin: 2rem 0 0;
  position: relative;
  outline: none;
  :disabled {
    background: ${props => props.theme.lightGrey3};
    cursor: default;
    :hover:after {
      transition: all 1s;
      content: "Please fill out the form";
      background: ${props => props.theme.pink};
      position: absolute;
      left: 110%;
      top: 0;
      padding: 0.7rem;
      width: 20rem;
      font-size: 1.4rem;
      letter-spacing: 2px;
      font-weight: 400;
    }
  }
`;

export default FormButton;
