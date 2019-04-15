import styled from "styled-components";

const SuccessStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 7px solid ${props => props.theme.lightGreen};
  letter-spacing: 1.5px;
  font-size: 1.8rem;
  p {
    margin: 0;
    font-weight: 100;
  }
`;
export default SuccessStyles;
