import styled from 'styled-components';
import CapMarker from './../components/capMarker';
import BackgroundFade from './../components/backgroundFade';
import { layerStyle, selectedLayerStyle } from './../layerStyle';
import  { useState, useEffect, useMemo, useCallback } from 'react';
import { testLocation } from './start';

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

export default function Map({computedData, newFeature, viewport, setViewport, clickHandler, shortedArray, setDetailView, isDetailView, setSelectedDistrict}){

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
      <Source id="new-data" type="geojson" data={newFeature}>
        <Layer {...selectedLayerStyle} />
      </Source>
      <Marker latitude={40.640927} longitude={-73.973601}>
        <CapMarker/>
      </Marker>
    </ReactMapGL>
    <BackgroundFade/>
    <Searchbar />
    {isDetailView === false && <CarouselWrapper>
      <Carousel shortedArray={shortedArray} setDetailView={setDetailView} setSelectedDistrict={setSelectedDistrict} setViewport={setViewport} viewport={viewport}/>
    </CarouselWrapper>}
    {isDetailView === true && <BigCardWrapper>
      <BigCard setDetailView={setDetailView} isDetailView={isDetailView} setSelectedDistrict={setSelectedDistrict} newFeature={newFeature}/>
    </BigCardWrapper>}
  </MapItem>
}