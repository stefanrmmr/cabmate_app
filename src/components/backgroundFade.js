import styled from 'styled-components';

const BackgroundFadeItem = styled.div`
  width: 100%;
  height: 160px;
  background-color: whitesmoke;
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 85%);
  z-index: 1000;
`;

export default function BackgroundFade(){
  return <BackgroundFadeItem>
  </BackgroundFadeItem>
}