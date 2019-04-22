import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Head from "next/head";

const SingleItemStyles = styled.div`
  max-width: 120rem;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-template-columns: 5fr 4fr;
  min-height: 80rem;

  /* font-family: "adobe-garamond-pro-bold"; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
      flour
    }
  }
`;

const SingleItem = props => {
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
      {({ error, loading, data }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for {props.id}</p>;
        const item = data.item;
        return (
          <SingleItemStyles>
            <Head>
              <title>Sourdough Bakers | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>
                Viewing:{" "}
                <span style={{ fontStyle: "italic" }}>{item.title}</span>
              </h2>
              <p>{item.description}</p>
              <p>The main flour used for this product was {item.flour}.</p>
            </div>
          </SingleItemStyles>
        );
      }}
    </Query>
  );
};

export default SingleItem;
