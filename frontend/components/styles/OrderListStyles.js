import styled from "styled-components";

const OrderListStyles = styled.li`
  list-style: none;
  padding: 1rem;
  p {
    margin: 0;
  }
  .order-meta {
    color: ${props => props.theme.grey};
    padding: 2rem;
    background: ${props => props.theme.yellow};
    box-shadow: ${props => props.theme.bs};
    border-radius: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderListStyles;
