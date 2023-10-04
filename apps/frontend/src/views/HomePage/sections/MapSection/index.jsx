import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './MapSection.module.scss';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import socketIOClient from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useOrder } from '@/stores/order.store';
import { ORDER_STATUS, ORDER_STATUS_STYLES_ALT } from '@/constants/order.constants';

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

const MapSection = ({ userStore }) => {
  const { data: sessionData } = useSession();
  const { orders, findOrderByUserStore } = useOrder();
  const [locationDelivery, setLocationDelivery] = useState(null);
  const socket = socketIOClient(process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    findOrderByUserStore(userStore?.uuid);
  }, [findOrderByUserStore]);

  useEffect(() => {
    socket.on('locationDelivery', data => {
      if (data) {
        if (
          locationDelivery &&
          data?.latitude === locationDelivery?.latitude &&
          data?.longitude === locationDelivery?.longitude
        ) {
          return;
        }
        setLocationDelivery(data);
      }
    });
  }, [socket, locationDelivery]);

  function createCustomMarkerIcon(orderNumber, style) {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;

    const context = canvas.getContext('2d');
    context.fillStyle = style.background;
    context.arc(20, 20, 20, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = 'white';
    context.font = 'bold 14px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(orderNumber.toString(), 20, 20);

    return {
      url: canvas.toDataURL(),
      scaledSize: new window.google.maps.Size(40, 40),
    };
  }

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
        {orders.map((order, index) => {
          const latLng = JSON.parse(order.latLngAddress);
          const latitude = latLng?.lat;
          const longitude = latLng?.lng;

          const status = ORDER_STATUS[order.status];
          const cardClass = ORDER_STATUS_STYLES_ALT[status] || {};
          return (
            <Marker
              key={index}
              position={{ lat: latitude, lng: longitude }}
              title={`Número do pedido: ${order.orderNumber}`}
              icon={createCustomMarkerIcon(order.orderNumber, cardClass)}
            />
          );
        })}

        {locationDelivery && (
          <Marker
            position={{
              lat: locationDelivery?.latitude,
              lng: locationDelivery?.longitude,
            }}
            title={`Entregador: ${locationDelivery?.id}`}
            icon={{
              url: 'img/helmetMarker.png',
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        )}
      </Map>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapSection);
