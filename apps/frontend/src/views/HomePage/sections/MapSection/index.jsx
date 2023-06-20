import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './MapSection.module.scss';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import io from 'socket.io-client';
import { getSession, useSession } from 'next-auth/react';

const MapSection = ({ userStore }) => {
  const { data: sessionData } = useSession();

  const mapStyle = [
    {
      featureType: 'all',
      elementType: 'labels.text',
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  const socket = io('http://localhost:8080');

  useEffect(() => {
    socket.on('message', () => {
      console.log('connectedddd');
    });
  }, []);

  return (
    <Container
      fluid
      className={styles.container}
    >
      <Map
        google={google}
        initialCenter={{ lat: userStore?.lat, lng: userStore?.lng }}
        disableDefaultUI={true}
        styles={mapStyle}
        zoom={14}
      >
        <Marker
          title={`Sua Loja: ${userStore?.name}`}
          icon={{
            url: '/img/storeLocation.png',
            scaledSize: new google.maps.Size(30, 30),
          }}
          position={{
            lat: userStore?.lat,

            lng: userStore?.lng,
          }}
        />
      </Map>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapSection);
