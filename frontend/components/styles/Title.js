import styled from "styled-components";

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: ${props => props.theme.transform};
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);

  a {
    background: ${props => props.theme.pink};
    border-radius: 0.2rem;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: #fff;
    padding: 0 1rem;
  }
`;

export default Title;
