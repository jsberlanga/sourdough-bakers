import styled from "styled-components";

const PriceTag = styled.span`
  background: ${props => props.theme.pink};
  transform: rotate(3deg);
  color: #fff;
  font-weight: 600;
  padding: 0.7rem;
  line-height: 1;
  font-size: 3.5rem;
  position: absolute;
  top: -7px;
  right: -7px;
  border-radius: 0.2rem;
`;

export default PriceTag;
