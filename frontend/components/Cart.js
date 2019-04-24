import React from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartItem from "./CartItem";
import OKButton from "./styles/OKButton";
import CloseButton from "./styles/CloseButton";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import TakeMoney from "./TakeMoney";

const CartStyles = styled.div`
  position: relative;
  background: ${props => props.theme.offWhite};
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 320px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};

  header {
    padding: 1rem 2rem;
    border-bottom: 5px solid ${props => props.theme.grey};
  }

  footer {
    padding: 2.5rem 2rem;
    border-top: 5px solid ${props => props.theme.grey};
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    font-size: 2.5rem;
    font-weight: 900;
  }
  p {
    margin-top: 0;
  }
  ul {
    background: ${props => props.theme.lightGrey};
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: auto;
    li {
      padding: 2rem;
      background: ${props => props.theme.lightGrey};
      border-bottom: 1px solid ${props => props.theme.lightGrey2};
    }
  }
  .cart-name {
    width: fit-content;
    transform: ${props => props.theme.transform};
    padding: 0.5rem 1rem;
    background: ${props => props.theme.pink};
    color: ${props => props.theme.offWhite};
    border-radius: 0.2rem;
    @media (max-width: 678px) {
      width: min-content;
    }
  }

  @media (max-width: 480px) {
    * {
      font-size: 95% !important;
    }
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
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <CloseButton style={{ zIndex: 1 }} onClick={toggleCart} />
                    <h3 className="cart-name">{me.name}'s Cart</h3>
                    <p>
                      You have {me.cart.length} Item
                      {me.cart.length > 1 ? "s" : null} in your Cart
                    </p>
                  </header>
                  <ul>
                    {me.cart.map(cartItem => (
                      <CartItem key={cartItem.id} cartItem={cartItem}>
                        {cartItem.id}
                      </CartItem>
                    ))}
                  </ul>
                  <footer>
                    <p>
                      Your cart total: {formatMoney(calcTotalPrice(me.cart))}
                    </p>
                    <div style={{ color: "#fff" }}>
                      {me.cart.length && (
                        <TakeMoney>
                          <OKButton>Checkout</OKButton>
                        </TakeMoney>
                      )}
                    </div>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

export default Cart;

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
