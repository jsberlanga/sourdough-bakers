import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Modal from "react-modal";
import styled from "styled-components";

import Error from "./ErrorMessage";
import CloseButton from "./styles/CloseButton";
import OKButton from "./styles/OKButton";
import ItemButton from "./styles/ItemButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "1rem"
  }
};

const ModalContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  font-size: 2rem;
  grid-gap: 0.4rem;
  align-items: center;
  background: ${props => props.theme.lightGrey2};
  color: ${props => props.theme.grey};
  padding: 8rem 3rem 0rem;
`;

import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  state = {
    modalIsOpen: false
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
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
          <>
            <ItemButton
              onClick={() => {
                this.openModal();
              }}
            >
              Delete Item
            </ItemButton>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Delete Item Modal"
              ariaHideApp={false}
            >
              <ModalContent>
                <CloseButton onClick={this.closeModal} />
                <div>Are you sure you want to delete the item?</div>
                <OKButton
                  onClick={() => {
                    deleteItem().catch(err => {
                      if (err) {
                        this.closeModal();
                        alert(err.message);
                      }
                    });
                  }}
                >
                  CONFIRM
                </OKButton>
              </ModalContent>
            </Modal>
          </>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
