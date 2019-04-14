import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.lightGrey};
  border-radius: 1rem;
  & > * {
    margin: 0;
    padding: 1rem 3rem;
    border-right: 1px solid ${props => props.theme.lightGrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled="true"] {
    color: ${props => props.theme.lightGrey2};
    pointer-events: none;
  }
`;

export default PaginationStyles;
