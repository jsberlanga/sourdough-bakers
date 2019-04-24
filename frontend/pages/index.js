import styled, { keyframes } from "styled-components";

const blur = keyframes`
from {
  filter: blur(10px);
}
to {
  filter: blur(0);
}
`;

const ImageContainer = styled.div`
  margin: 3rem auto 0;
  position: relative;
  max-height: 70vh;
  color: ${props => props.theme.pink};
  font-family: "montserrat";
  font-size: 8rem;
  clip-path: polygon(0 0, 100% 0, 100% 110%, 0 118%);
  .main {
    z-index: 2;
    position: absolute;
    right: 4rem;
    animation: ${blur} 2s ease-in-out;
  }
  .title-1 {
    top: 0;
  }
  .title-2 {
    top: 8rem;
  }
  .title-3 {
    top: 16rem;
  }
  .subtitle {
    font-family: "adobe-garamond-pro-italic";
    font-size: 7rem;
  }
  .subtitle-1 {
    top: 23rem;
  }
  .subtitle-2 {
    top: 29rem;
  }

  img {
    width: 90vw;
    z-index: -1;
    border-radius: 3rem;
    animation: ${blur} 2s ease-in;
    @media (max-width: 960px) {
      height: 0;
    }
  }
  @media (max-width: 960px) {
    min-height: 60vh;
  }
  @media (max-width: 640px) {
    font-size: 6rem;
    .title-1 {
      top: 0;
    }
    .title-2 {
      top: 6rem;
    }
    .title-3 {
      top: 12rem;
    }
    .subtitle-1 {
      top: 18rem;
    }
    .subtitle-2 {
      top: 24rem;
    }
  }
`;

const Home = () => (
  <ImageContainer>
    <div>
      <div className="main title-1">BUY</div>
      <div className="main title-2">SELL</div>
      <div className="main title-3">BREAD</div>
      <div className="main subtitle subtitle-1">no sweat</div>
      <div className="main subtitle subtitle-2">it's that simple</div>
    </div>
    <img src="../static/images/hero.png" />
  </ImageContainer>
);

export default Home;
