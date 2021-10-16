import styled from 'styled-components';
import { useState } from 'react';
import { Link } from "react-router-dom";

export const testLocation = {
  "address": "Avenue C, Brooklyn, NY 11218, USA",
  "coordinates": {
    "latitude": "40.640927",
    "longitude": "-73.973601"
  }
}

const StartItem = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 120px 0;
`;
const Icon = styled.img`

`;
const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 34px;
  padding: 0 32px;
  text-align: center;
`;
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const IconList = styled.div`
  display: flex;
  gap: 16px;
`;
const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: rgba(8, 47, 59, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Text = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  #map-link{
    text-decoration: none;
  }
`;
const SearchBar = styled.div`
  
`;
const ImageWrapper = styled.div`
  position: absolute;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageWrapperRight = styled.div`
  position: absolute;
  height: 44px;
  width: 44px;
  left: calc(100vw - 48px - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`

`;
const Input = styled.input`
  height: 44px;
  width: calc(100vw - 48px);
  font-size: 13px;
  background: white;
  border: none;
  border-radius: 10px;
  padding-left: calc(38px);
  box-sizing: border-box;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  ::placeholder {
    color: rgba(8, 47, 59, 0.5);
    border-radius: 10px;
  }
  :focus { 
    outline: none !important;
    border: 1px solid black;
    border-radius: 10px;
  }
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
  width: fit-content;
  text-decoration: none;
`;

export default function Start(){
  
  const [ isLocated, setLocation ] = useState(null);

  return <StartItem>
    <Icon src="./Logo.svg" alt="Logo CabMate"/>
    <Title>
      {"Welcome to CabMate!"}
    </Title>
    <MiddleContainer>
      <Text>
        {"Gain efficiency & reduce cruising time"}
      </Text>
      <IconList>
        <IconWrapper>
          <Icon src="./trending-up.svg" alt="Logo CabMate"/>
        </IconWrapper>
        <IconWrapper>
          <Icon src="./clock2.svg" alt="Logo CabMate"/>
        </IconWrapper>
        <IconWrapper>
          <Icon src="./map.svg" alt="Logo CabMate"/>
        </IconWrapper>
      </IconList>
    </MiddleContainer>
    <SearchContainer>
      <SearchBar>
        <ImageWrapper>
          <Image src="./location.svg" alt="Search Icon"></Image>
        </ImageWrapper>
        <ImageWrapperRight onClick={()=>setLocation(testLocation.address)}>
          <Image src="./locator.svg" alt="Search Icon"></Image>
        </ImageWrapperRight>
        <Input type="text" placeholder="Where are you right now?" value={isLocated !== null ? testLocation.address : null}>
        </Input>
      </SearchBar>
      <Link id="map-link" to={"/map" + "?latitude=" + testLocation.coordinates.latitude + "&longitude=" + testLocation.coordinates.longitude}>
      <Button >
        {"LET'S START"}
      </Button>
      </Link>
    </SearchContainer>
  </StartItem>
}