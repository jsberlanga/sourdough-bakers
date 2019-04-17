import React from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import OKButton from "./styles/OKButton";
import CloseButton from "./styles/CloseButton";

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: #fff;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 400px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${props => props.theme.offBlack};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double ${props => props.theme.offBlack};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data }) => (
          <CartStyles open={data.cartOpen}>
            <header>
              <CloseButton onClick={toggleCart} />
              <h3>Your Cart</h3>
              <p>You have __ Items in your Cart</p>
            </header>
            <footer>
              <p>50.00zl</p>
              <OKButton>Checkout</OKButton>
            </footer>
          </CartStyles>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
