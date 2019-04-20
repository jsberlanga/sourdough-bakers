import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Count = styled.div`
  background: ${props => props.theme.pink};
  color: #fff;
  border-radius: 50%;
  padding: 0.2rem;
  line-height: 2rem;
  min-width: 2.5rem;
  font-weight: 400;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  margin-top: -3rem;
`;

const CartCount = ({ count }) => <Count>{count}</Count>;
export default CartCount;
