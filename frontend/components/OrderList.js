import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { formatDistance } from "date-fns";
import Link from "next/link";
import styled from "styled-components";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import OrderListStyles from "./styles/OrderListStyles";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

const OrderList = props => {
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({ data: { orders }, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        console.log(orders);
        return (
          <>
            <div style={{ textAlign: "center" }}>
              {orders.length > 0 && <h1>THANK YOU!</h1>}
              <h2>You have made {orders.length} orders</h2>
            </div>
            <orderUl>
              {orders.map((order, index) => (
                <OrderListStyles key={order.id}>
                  <Link
                    href={{
                      pathname: "/order",
                      query: { id: order.id }
                    }}
                  >
                    <a>
                      <div className="order-meta">
                        <h4 style={{ fontWeight: 700 }}>
                          Order No. {index + 1}.
                        </h4>
                        <div>
                          <p>{order.items.length} Products</p>
                          {order.items.map(item => (
                            <p>{item.title}</p>
                          ))}
                        </div>
                        <p>
                          {formatDistance(
                            new Date(order.createdAt),
                            new Date()
                          )}{" "}
                          ago
                        </p>
                        <p>Total of {formatMoney(order.total)}</p>
                      </div>
                    </a>
                  </Link>
                </OrderListStyles>
              ))}
            </orderUl>
          </>
        );
      }}
    </Query>
  );
};

export default OrderList;
