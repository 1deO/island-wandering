'use client'

// import * as React from 'react';
import Map, { Marker, useMap } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';


const shopList = [
  {
    longitude: 121.5253354,
    latitude: 25.0448201,
    name: "酒窩咖啡館"
  },
  {
    longitude: 121.5247662,
    latitude: 25.0446641,
    name: "ABOUT H"
  },
  {
    longitude: 121.5229213,
    latitude: 25.0455627,
    name: "木白甜點咖啡店"
  },
  
];


export default function Mapbox() {


  return (
    <>
    
      <Map
        // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
        mapboxAccessToken="pk.eyJ1Ijoiamllbmh1YWdvbyIsImEiOiJjbTdsNjY0MjMwNDl2MmtzZHloYXY0czNkIn0.mlD3UGH3wR3ZMJmCuHDpSQ"
        initialViewState={{
          longitude: 121.526234,
          latitude: 25.044666,
          zoom: 17
    
        }}
        //加入 marker
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {shopList.map((shop) => ( //對陣列的每個物件映射
          <Marker
            longitude={shop.longitude}
            latitude={shop.latitude}
            key={shop.name}
            onClick={() => {
              alert(shop.name);
            }}
          >
            <div className='w-6 h-6 bg-red-300 rounded-full'></div>
          </Marker>
        ))}

      </Map>
    </>
  );
}
