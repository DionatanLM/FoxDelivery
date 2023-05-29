import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './MapSection.module.scss';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const MapSection = () => {
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
  return (
    <Container
      fluid
      className={styles.container}
    >
      <Map
        google={google}
        initialCenter={{ lat: -27.4333881, lng: -48.4565341 }}
        disableDefaultUI={true}
        styles={mapStyle}
        zoom={15}
      >
        <Marker
          title="Sua Loja"
          icon={{
            url: '/img/storeLocation.png',
            scaledSize: new google.maps.Size(30, 30),
          }}
          position={{
            lat: -27.4287974,

            lng: -48.4577624,
          }}
        />
      </Map>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapSection);
