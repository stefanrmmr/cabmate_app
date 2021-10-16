import styled from 'styled-components';
import CapMarker from './../components/capMarker';
import BackgroundFade from './../components/backgroundFade';
import { layerStyle, selectedLayerStyle } from './../layerStyle';
import  { useState, useEffect, useMemo, useCallback } from 'react';
import { testLocation } from './start';
import { Link } from "react-router-dom";
import { easeCubic } from 'd3-ease';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Searchbar from '../components/Searchbar';
import Carousel from '../components/carousel';

import ReactMapGL, { Marker, Source, Layer, LinearInterpolator, WebMercatorViewport} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import BigCard from '../components/bigCard';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapItem = styled.div`

`;
const CarouselWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 228px;
  bottom: 0;
  left: 0;
  z-index: 1001;
`;
const BigCardWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 382px;
  bottom: 0;
  left: 0;
  z-index: 1001;
`;
const Menu = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1003;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Burger = styled.div`
  position: absolute;
  right: 24px;
  top: 32px;
  width: 132px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 16px 0;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const ProfilIcon = styled.img`
  
`;
const Text = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  color: black;
`;
const Separator = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(8, 47, 59, 0.2);
`;
const Locator = styled.div`
  position: absolute;
  right: 24px;
  bottom: ${props => props.isDetailView ? "400px" : "250px"};
  width: 44px;
  height: 44px;
  background-color: white;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DoubleButton = styled.div`
  width: 44px;
  height: 44px;
  background-color: white;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: ${props => props.isDetailView ? "460px" : "310px"};
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;
const ButtonSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(8, 47, 59, 0.2);
`;
const Icon = styled.img`
  
`;

export default function Map({computedData, newFeature, viewport, setViewport, clickHandler, shortedArray, setDetailView, isDetailView, setSelectedDistrict}){
  const [menuOpen, setMenuOpen] = useState(false);
  return <MapItem>
    <ReactMapGL 
      {...viewport} 
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/nilsjacobsen/ckusebxfycigb17s00prk3qdz"
      onClick={(event)=>clickHandler(event)}
    >
      <Source id="my-data" type="geojson" data={computedData}>
        <Layer {...layerStyle} />
      </Source>
      {isDetailView === true && <Source id="new-data" type="geojson" data={newFeature}>
        <Layer {...selectedLayerStyle} />
      </Source>}
      <Marker latitude={40.640927} longitude={-73.973601}>
        <CapMarker/>
      </Marker>
    </ReactMapGL>
    <BackgroundFade/>
    <Searchbar setMenuOpen={setMenuOpen}/>
    <Locator isDetailView={isDetailView} onClick={()=>{setViewport({...viewport, longitude: parseFloat(testLocation.coordinates.longitude), latitude: parseFloat(testLocation.coordinates.latitude), zoom: 12, transitionDuration: 1000, transitionEasing: easeCubic}); }}>
      <Icon src="./locator.svg" alt="Locator Icon"/>
    </Locator>
    <ButtonWrapper isDetailView={isDetailView}>
      <DoubleButton onClick={()=>{setViewport({...viewport, zoom: viewport.zoom + 1, transitionDuration: 500, transitionEasing: easeCubic}); }}>
        <Icon src="./bigger.svg" alt="Locator Icon"/>
      </DoubleButton>
      <ButtonSeparator />
      <DoubleButton onClick={()=>{setViewport({...viewport, zoom: viewport.zoom - 1, transitionDuration: 500, transitionEasing: easeCubic}); }}>
        <Icon src="./smaller.svg" alt="Locator Icon"/>
      </DoubleButton>
    </ButtonWrapper>
    {isDetailView === false && <CarouselWrapper>
      <Carousel shortedArray={shortedArray} setDetailView={setDetailView} setSelectedDistrict={setSelectedDistrict} setViewport={setViewport} viewport={viewport}/>
    </CarouselWrapper>}
    {isDetailView === true && <BigCardWrapper>
      <BigCard setDetailView={setDetailView} isDetailView={isDetailView} setSelectedDistrict={setSelectedDistrict} newFeature={newFeature}/>
    </BigCardWrapper>}
    {menuOpen && <Menu>
      <Background onClick={()=>setMenuOpen(false)}/>
      <Burger>
        <Profile>
          <ProfilIcon src="./profile.svg" alt="Profile Placeholder"/>
          <Text to={"/account"}>
            {"Profile"}
          </Text>
        </Profile>
        <Separator />
        <Text to={"/map"} onClick={()=>setMenuOpen(false)}>
          {"Map"}
        </Text>
        <Separator />
        <Text to={"/stats"}>
          {"Statistics"}
        </Text>
        <Separator />
        <Text to={"/account"}>
          {"Friends"}
        </Text>
        <Separator />
        <Text to={"/settings"}>
          {"Settings"}
        </Text>
      </Burger>
    </Menu>}
  </MapItem>
}