import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { MdShoppingCart } from "react-icons/md";
import { CURRENT_USER_QUERY } from "./User";

import ItemButton from "./styles/ItemButton";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends Component {
  state = {
    quantity: 1
  };
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading }) => {
          return (
            <ItemButton disabled={loading} onClick={addToCart}>
              Add{loading && "ing"}{" "}
              <MdShoppingCart
                style={{
                  fontSize: "2rem",
                  margin: "0.3rem 0 0 0.3rem",
                  position: "absolute"
                }}
              />
            </ItemButton>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };
