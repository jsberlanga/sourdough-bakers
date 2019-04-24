import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";

const Button = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  outline: none;
  color: ${props => props.theme.grey};
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    color: ${props => props.theme.pink};
    cursor: pointer;
  }

  @media (max-width: 1000px) {
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  updateCart = (cache, payload) => {
    // reading from the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // console.log("cache", cache);
    // console.log("data", data);
    // console.log("payload", payload);
    // removing from cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // writing back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCart}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id
          }
        }}
      >
        {(removeFromCart, { loading, error }) => {
          if (error) return <p>{error}</p>;
          return (
            <Button
              onClick={() => {
                removeFromCart().catch(err => alert(err.message));
              }}
            >
              🞭
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
