import styled from "styled-components";

const Item = styled.div`
  background: ${props => props.theme.lightGrey};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 40rem;
    object-fit: cover;
  }
  p {
    font-size: 1.7rem;
    line-height: 2;
    font-weight: 400;
    flex-grow: 1;
    padding: 0 3rem;
  }
  .buttonList {
    display: grid;
    font-weight: 700;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    & > * {
      letter-spacing: 3px;
      background: ${props => props.theme.pink};
      color: #fff;
      border: 0;
      padding: 1rem;
    }

    a {
      cursor: pointer;
    }
  }
`;

export default Item;
