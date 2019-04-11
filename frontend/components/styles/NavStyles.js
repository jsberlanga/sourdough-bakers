import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: capitalize;
    font-weight: 700;
    background: none;
    border: 0;
    cursor: pointer;
    &:before {
      content: "";
      width: 1px;
      background: ${props => props.theme.lightGrey};
      height: 99%;
      left: 0;
      position: absolute;
      transform: skew(-5deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 3px;
      background: ${props => props.theme.pink};
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 5rem);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightGrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export default NavStyles;
