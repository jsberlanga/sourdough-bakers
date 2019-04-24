import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";

import formatMoney from "../lib/formatMoney";

import User from "./User";

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <User>
        {({ data }) => {
          const me = data ? data.me : null;
          return (
            <ItemStyles>
              {item.image && <img src={item.image} alt={item.title} />}
              <Title>
                <Link
                  href={{
                    pathname: "/item",
                    query: { id: item.id }
                  }}
                >
                  <a>{item.title}</a>
                </Link>
              </Title>
              <PriceTag>{formatMoney(item.price)}</PriceTag>
              <p>Description: {item.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                fugiat recusandae eligendi fugit itaque dicta ipsam
                necessitatibus aperiam cumque repudiandae!
              </p>

              <p>
                The main flour used was:{" "}
                <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
                  {item.flour}
                </span>
              </p>
              <p>This product is being sold by {item.user.name}</p>
              <div className="buttonList">
                <AddToCart id={item.id} />
                {me.id === item.user.id && (
                  <>
                    <Link
                      href={{
                        pathname: "/update",
                        query: { id: item.id }
                      }}
                    >
                      <a>Edit</a>
                    </Link>

                    <DeleteItem id={item.id} />
                  </>
                )}
              </div>
            </ItemStyles>
          );
        }}
      </User>
    );
  }
}

export default Item;
