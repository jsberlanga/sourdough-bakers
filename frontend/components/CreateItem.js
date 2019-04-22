import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import OKButton from "./styles/OKButton";
import formatMoney from "../lib/formatMoney";

import Error from "./ErrorMessage";

import ingredients from "../lib/ingredients";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    $flour: String!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      flour: $flour
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: undefined,
    flour: ""
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    console.log({ name, type, value });

    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };
  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sourdough-bakers");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkj0lviac/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    const { title, description, image, largeImage, price, flour } = this.state;
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Do you want to sell some bread?</h2>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, { loading, error }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createItem();
                console.log(res);
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadFile}
                  />
                </label>
                {image && (
                  <>
                    <div style={{ fontStyle: "italic" }}>Image preview</div>
                    <img src={image} width={250} alt="Upload Preview" />
                  </>
                )}
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price must be in cents"
                    required
                    value={price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter A Description"
                    required
                    value={description}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="flour">
                  Type of Flour
                  <span style={{ fontStyle: "italic" }} />
                  <select name="flour" onChange={this.handleChange}>
                    {ingredients.flour.map(flour => (
                      <option key={flour} value={flour}>
                        {flour}
                      </option>
                    ))}
                  </select>
                </label>

                <OKButton type="submit">Submit</OKButton>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
