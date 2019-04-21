import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { format } from "date-fns";
import Head from "next/head";
import gql from "graphql-tag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        image
        price
        quantity
      }
    }
  }
`;

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data: { order }, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          return (
            <OrderStyles>
              <Head>
                <title>Sourdough Bakers - Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date of the order:</span>
                <span>
                  {format(new Date(order.createdAt), "MMMM d, YYYY h:mm a", {
                    awareOfUnicodeTokens: true
                  })}
                </span>
              </p>
              <p>
                <span>Order Total:</span>
                <span>{formatMoney(order.total)}</span>
              </p>

              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Quantity: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                      <p>Description: {item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <footer>
                <h2>TOTAL PAID {formatMoney(order.total)}</h2>
                <Link href="/items">
                  <a>Click Here!</a>
                </Link>
                <span> to go back to our shop</span>
              </footer>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
