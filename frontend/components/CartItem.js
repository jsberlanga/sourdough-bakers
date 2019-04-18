import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import formatMoney from "../lib/formatMoney";
import Router from "next/router";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  .img {
    margin-right: 1rem;
    cursor: pointer;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <div
      onClick={() => {
        Router.push({
          pathname: "/item",
          query: { id: cartItem.item.id }
        });
      }}
      className="img"
      style={{
        width: "150px",
        height: "200px",
        backgroundImage: `url(${cartItem.item.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "0.5rem",
        boxShadow: "1px 1px 4px 1px silver"
      }}
    />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p style={{ fontStyle: "italic" }}>
        buying from {cartItem.item.user.name}
      </p>
      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)}
        {" - "}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
        </em>
      </p>
    </div>
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};

export default CartItem;
