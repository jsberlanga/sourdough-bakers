import styled from "styled-components";
import React from "react";

import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 7px solid ${props => props.theme.pink};
  letter-spacing: 1.5px;
  font-size: 1.8rem;
  p {
    margin: 0;
    font-weight: 100;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    ));
  }
  if (
    error.message ===
    "GraphQL error: A unique constraint would be violated on User. Details: Field name = email"
  ) {
    return (
      <ErrorStyles>
        <p data-test="graphql-error">
          {error.message.replace(
            "GraphQL error: A unique constraint would be violated on User. Details: Field name = email",
            "This email address is already in use. Please choose another one or sign in if you are the owner."
          )}
        </p>
      </ErrorStyles>
    );
  } else {
    return (
      <ErrorStyles>
        <p data-test="graphql-error">
          {error.message.replace("GraphQL error:", "")}
        </p>
      </ErrorStyles>
    );
  }
};

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.object
};

export default DisplayError;
