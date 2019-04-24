import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchBar } from "./styles/DropDown";

import { GoSearch } from "react-icons/go";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
          { flour_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
      price
    }
  }
`;

const routeToItem = item => {
  Router.push({
    pathname: "/item",
    query: { id: item.id }
  });
};

class AutoComplete extends React.Component {
  state = {
    items: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value.trim() }
    });
    console.log(res);
    this.setState(() => {
      return { items: res.data.items, loading: false };
    });
  }, 300);
  render() {
    resetIdCounter();
    return (
      <Downshift
        onChange={routeToItem}
        itemToString={item => (item === null ? "" : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <SearchBar>
                  <GoSearch className="search-icon" />
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search for a product or type of flour",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                </SearchBar>
              )}
            </ApolloConsumer>

            {isOpen && (
              <DropDown>
                {!this.state.loading &&
                  this.state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img
                        width="50"
                        height="60"
                        src={item.image}
                        alt={item.title}
                      />
                      {item.title}
                    </DropDownItem>
                  ))}
                {!this.state.loading && !this.state.items.length && (
                  <DropDownItem>
                    Nothing was found for the term "{inputValue}"
                  </DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    );
  }
}

export default AutoComplete;
