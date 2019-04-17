import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border-radius: 0.4rem;
  border: 1px solid #d1d4df;
  padding: 2rem;
  font-size: 1.6rem;
  line-height: 1.5;
  max-width: 70rem;
  margin: 0 auto;
  background: ${props => props.theme.lightGrey};
  color: ${props => props.theme.offBlack};

  label {
    display: block;
    margin-bottom: 2rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.7rem;
    font-size: 1.4rem;
    font-family: "adobe-garamond-pro";
    border: 1px solid #c5c8d3;

    &:focus {
      outline: none;
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: ${props => props.theme.lightGreen2};
    border-radius: 0.1rem;
    color: #fff;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.9rem 1.7rem;
    font-family: "adobe-garamond-pro";
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 0.7rem;
      width: 95%;
      margin: 0 auto 3rem;
      border-radius: 0.2rem;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #aeddcd 0%,
        #95c4b4 50%,
        #aeddcd 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 60% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
