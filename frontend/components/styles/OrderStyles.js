import styled from "styled-components";

const OrderStyles = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  border-top: 5px solid ${props => props.theme.pink};
  border-bottom: 5px solid ${props => props.theme.pink};
  border-radius: 0.5rem;
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid rgba(228, 80, 143, 0.3);

    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
  }

  footer {
    padding: 2rem;
    text-align: right;
    a {
      font-weight: 700;
      color: ${props => props.theme.pink};
      &:hover {
        border-bottom: 2px solid ${props => props.theme.pink};
      }
    }
    h2 {
      margin: 0;
    }

    * {
      letter-spacing: 2px;
    }
  }
`;
export default OrderStyles;
