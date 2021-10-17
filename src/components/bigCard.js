import styled from 'styled-components';
import { motion } from "framer-motion";
import { useState } from 'react';
import { Link } from "react-router-dom";
 
const BigCardItem = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 24px;
  width: calc(100vw - 48px);
  height: 350px;
  background-color: white;
  overflow: visible;
  border-radius: 10px;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Handle = styled.div`
  width: 110px;
  height: 3px;
  background-color: rgba(8, 47, 59, 0.5);
  border-radius: 2px;
`;
const Header = styled.div`
  width: 100%;
  padding-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  padding: 16px 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
`;
const Separator = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(245, 141, 18, 0.5);
  margin-bottom: 8px;
`;
const MainContent = styled.div`
  width: calc(100vw - 48px - 70px);
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  //flex-direction: column;
  row-gap: 16px;
  flex-wrap: wrap;
  margin-bottom: auto;
`;
const ListElem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 50%;
`;
const IconWrapper = styled.div`
  background-color: rgba(8, 47, 59, 0.05);
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Icon = styled.img`
  
`;
const Text = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 13px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  #maps-link{
    text-decoration: none;
  }
`;
const Adress = styled.div`
  display: flex;
  gap: 16px;
`;
const Button = styled.div`
  background-color: #082F3B;
  border-radius: 10px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
  color: white;
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
`;

function dragHandler(offset, isDetailView, setDetailView){
  if(offset > 50){
    if(isDetailView === true){
      setDetailView(false);
    }
  }
}

export default function BigCard({isDetailView, setDetailView, newFeature}){
  const [slidePos, setSlidePos] = useState(0);

  const newUrl = "https://maps.google.com/?q=" + newFeature.properties.borough + "+" + newFeature.properties.zone;

  return <BigCardItem 
    drag="y"
    dragConstraints={{
      top: 0,
      bottom: 0,
    }}
    dragElastic={0.5}
    onDrag={(event)=>setSlidePos(event.offsetY)}
    onDragEnd={(event)=>dragHandler(event.offsetY, isDetailView, setDetailView)}
    style={{ opacity: 1 - (slidePos/200) }}
  >
    <Header>
      <Handle />
      <TitleWrapper>
        {newFeature.properties.location_id + " - " + newFeature.properties.zone}
      </TitleWrapper>
    </Header>
    <Separator />
    <MainContent>
      <ListElem>
        <IconWrapper>
          <Icon src="./cash.svg" alt="Cash Icon"/>
        </IconWrapper>
        <Text>
          {Math.round(newFeature.properties.income) + " $"}
        </Text>
      </ListElem>
      <ListElem>
        <IconWrapper>
          <Icon src="./gift.svg" alt="Tip Icon"/>
        </IconWrapper>
        <Text>
         {Math.round(newFeature.properties.tip) + " $"}
        </Text>
      </ListElem>
      <ListElem>
        <IconWrapper>
          <Icon src="./demand.svg" alt="Demand Icon"/>
        </IconWrapper>
        <Text>
          {Math.round(newFeature.properties.value)}
        </Text>
      </ListElem>
      <ListElem>
        <IconWrapper>
          <Icon src="./clock.svg" alt="Clock Icon"/>
        </IconWrapper>
        <Text>
        {Math.round(newFeature.properties.duration) + " min"}
        </Text>
      </ListElem>
      <ListElem>
        <IconWrapper> 
          <Icon src="./distance.svg" alt="Distance Icon"/>
        </IconWrapper>
        <Text>
        {Math.round(newFeature.properties.trip_dist) + " miles"}
        </Text>
      </ListElem>
    </MainContent>
    <Footer>
      <Adress>
        <Icon src="./location.svg" alt="Location Icon" />
        <Text>
          {Math.round(newFeature.properties.distance * 0.621371) + " miles, " + newFeature.properties.borough}
        </Text>
      </Adress>
      <a id="maps-link" href={newUrl}>
        <Button>
          {"LET'S GO"}
        </Button>
      </a>
    </Footer>
  </BigCardItem>
}