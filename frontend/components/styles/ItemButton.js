import styled from "styled-components";

const ItemButton = styled.button`
  all: unset;
  cursor: pointer;
  letter-spacing: 2px;
  &:disabled {
    background: #d74382;
  }
`;

export default ItemButton;
