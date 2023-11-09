import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../ContentStep/styles";
import MapView, { Marker } from "react-native-maps";
import openMaps from "react-native-open-maps";
import { moneyToPtBrTwoPrecision } from "../../../../helpers/masks.helper";

const ContentStepTwo = ({ order }) => {
  const openMapApp = () => {
    openMaps({
      query: "Localização Predefinida",
      zoom: 15,
      provider: "google",
      travelType: "drive",
      end: `${coordinates.lat},${coordinates.lng}`,
    });
  };

  const coordinates = JSON.parse(order.latLngAddress);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PARADA NÚMERO 2 - ENTREGA</Text>
        <Text style={styles.subTitle}>CHEGAR ATÉ 20:31</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Nome do cliente:</Text>{" "}
          {order.clientName}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Endereço:</Text> {order.address}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Complemento:</Text>{" "}
          {order.complement ? order.complement : "Nenhum"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Numero do pedido:</Text>{" "}
          {order.orderNumber}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Forma de pagamento: </Text>{" "}
          {order.typePayment}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Valor do pedido: </Text>
          {moneyToPtBrTwoPrecision(order.price)}
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={openMapApp}
          style={styles.map}
        >
          {/* Marcador na localização predefinida */}
          <Marker
            coordinate={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
            title="Localização Predefinida"
            description="Descrição da localização"
          />
        </MapView>
        <TouchableOpacity style={styles.buttonMap} onPress={openMapApp}>
          <Text style={styles.buttonMapText}>
            Clique no mapa para abrir a rota
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentStepTwo;
