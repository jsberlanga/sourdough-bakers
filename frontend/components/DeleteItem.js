// Use of react modal

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  updateCache = (cache, payload) => {
    // This update fn manually updates apollo cache on the client so it matches the one on the server after deleting items
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // console.log(data, payload);
    // 2. Filter the deleted item out of page
    data.items = data.items.filter(item => {
      return item.id !== payload.data.deleteItem.id;
    });
    // 3. Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCache}
      >
        {(deleteItem, { error }) => (
          <div
            onClick={() => {
              if (confirm("Are you sure?")) deleteItem();
            }}
          >
            Delete Item
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
