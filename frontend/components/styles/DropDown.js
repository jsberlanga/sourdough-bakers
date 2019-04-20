import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 999;
  border: 1px solid ${props => props.theme.lightGrey};
`;

const DropDownItem = styled.div`
  cursor: pointer;
  letter-spacing: 1.5px;
  font-style: italic;

  border-bottom: 1px solid ${props => props.theme.lightGrey};
  background: ${props =>
    props.highlighted ? "#DCDCDC" : props.theme.offWhite};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 2rem solid
    ${props =>
      props.highlighted ? props.theme.lightGrey3 : props.theme.offWhite};
  img {
    margin-right: 10px;
  }
`;

const appear = keyframes`
  from {
    height: 0
  }
  to {
    height: 7rem
  }
`;

const SearchBar = styled.div`
  transition: all 0.4s;
  position: relative;
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  background: #e8e8e8;
  height: 7rem;
  overflow: hidden;
  animation: ${appear} 0.5s;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 0 2rem;
  color: ${props => props.theme.grey};
  &:focus-within {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search-icon {
    margin: 0 2rem;
    font-size: 3rem;
  }
  input {
    width: 100%;
    border: 0;
    font-size: 2rem;
    outline: none;
    font-family: "adobe-garamond-pro";
    background: #e8e8e8;
    text-align: left;
    letter-spacing: 2px;

    ::placeholder {
      letter-spacing: 2px;
      font-size: 2rem;
      font-style: italic;
      color: ${props => props.theme.grey};
      opacity: 0.7;
    }
  }
`;

export { DropDown, DropDownItem, SearchBar };