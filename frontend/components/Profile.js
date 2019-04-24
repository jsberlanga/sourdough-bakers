import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import { ALL_ITEMS_QUERY } from "./Items";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";

const ItemList = styled.div`
  min-height: 35vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5rem;
  margin: 0 auto;
  img {
    height: 15rem;
  }
  @media (max-width: 1130px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  .product-info {
    margin: 1rem;
    * {
      letter-spacing: 1px;
    }
  }
  .product-title {
    a {
      font-size: 2rem;
      color: ${props => props.theme.blue};
      border-bottom: 1.7px solid ${props => props.theme.blue};
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

class Profile extends Component {
  state = {
    object: this.props.profile
  };
  render() {
    return (
      <div>
        <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
          {({ data }) => {
            const { me } = data;
            return (
              <>
                <Center>
                  <h1>Hi there {me.name}!</h1>
                  <h1>
                    You are currently selling {me.items.length} products
                    {me.items.length ? ":" : "."}
                  </h1>

                  <Query
                    query={ALL_ITEMS_QUERY}
                    fetchPolicy="cache-and-network"
                  >
                    {({ data, error, loading }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error: {error.message}</p>;
                      return (
                        <ItemList>
                          {me.items.map(item => (
                            <ItemStyles key={item.id}>
                              <Item>
                                <div className="product-image">
                                  {item.image && (
                                    <img src={item.image} alt={item.title} />
                                  )}
                                </div>
                                <div className="product-info">
                                  <h3 className="product-title">
                                    <Link
                                      href={{
                                        pathname: "/item",
                                        query: { id: item.id }
                                      }}
                                    >
                                      <a>
                                        {item.title}
                                        <FaChevronRight
                                          style={{
                                            position: "absolute",
                                            marginTop: "1rem"
                                          }}
                                        />
                                      </a>
                                    </Link>
                                  </h3>
                                  <h3>Price: {formatMoney(item.price)}</h3>
                                </div>
                                <div
                                  className="buttonList"
                                  style={{
                                    textAlign: "center",
                                    textTransform: "uppercase"
                                  }}
                                >
                                  <Link
                                    href={{
                                      pathname: "/update",
                                      query: { id: item.id }
                                    }}
                                  >
                                    <a>Edit</a>
                                  </Link>
                                  <DeleteItem id={item.id} />
                                </div>
                              </Item>
                            </ItemStyles>
                          ))}
                        </ItemList>
                      );
                    }}
                  </Query>
                </Center>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Profile;
