import styled from 'styled-components';
import CapMarker from './../components/capMarker';
import BackgroundFade from './../components/backgroundFade';
import { layerStyle, selectedLayerStyle } from './../layerStyle';
import  { useState, useEffect, useMemo, useCallback } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Searchbar from '../components/Searchbar';
import Carousel from '../components/carousel';

import ReactMapGL, { Marker, Source, Layer, LinearInterpolator, WebMercatorViewport} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

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

export default function Map({computedData, newFeature, viewport, setViewport, clickHandler, shortedArray}){

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
      <Marker latitude={40.619256} longitude={-73.964126}>
        <CapMarker/>
      </Marker>
    </ReactMapGL>
    <BackgroundFade/>
    <Searchbar />
    <CarouselWrapper>
      <Carousel shortedArray={shortedArray}/>
    </CarouselWrapper>
  </MapItem>
}