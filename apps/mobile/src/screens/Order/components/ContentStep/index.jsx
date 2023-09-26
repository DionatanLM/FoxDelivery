import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import MapView, { Marker } from 'react-native-maps'
import openMaps, { createMapLink } from 'react-native-open-maps'
import { moneyToPtBrTwoPrecision } from '../../../../helpers/masks.helper'

const ContentStep = ({ currentStep }) => {
  const openMapApp = () => {
    const latitude = -27.4289483
    const longitude = -48.4602604

    const latitudeEnd = -27.4014097
    const longitudeEnd = -48.4109381

    openMaps({
      query: 'Localização Predefinida',
      zoom: 15,
      provider: 'google',
      travelType: 'drive',
      start: `Rua Vasco de Oliveira Gondin, 375`,
      end: `Rua dos cambuatas, 70`
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          PARADA NÚMERO {currentStep === 0 ? '1' : '2'}
        </Text>
        <Text style={styles.subTitle}>CHEGAR ATÉ 20:31</Text>
      </View>

      <View style={styles.textContainer}>
        {currentStep === 0 ? (
          <Text style={styles.text}>
            <Text style={styles.boldText}>Estabelecimento:</Text> Beer Burger
          </Text>
        ) : (
          <Text style={styles.text}>
            <Text style={styles.boldText}>Nome:</Text> Charlie
          </Text>
        )}
        <Text style={styles.text}>
          <Text style={styles.boldText}>Endereço:</Text> Rua das Flores, 12
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Complemento:</Text> Nenhum
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Numero do pedido:</Text> 3123
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Forma de pagamento: </Text> Dinheiro
          Troco para 60
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Valor do pedido: </Text>
          {moneyToPtBrTwoPrecision(55.9)}
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: -27.4287926,
            longitude: -48.4603373,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onPress={openMapApp}
          style={styles.map}
        >
          {/* Marcador na localização predefinida */}
          <Marker
            coordinate={{ latitude: -27.4287926, longitude: -48.4603373 }}
            title="Localização Predefinida"
            description="Descrição da localização"
          />
        </MapView>
        <TouchableOpacity style={styles.buttonMap} onPress={openMapApp}>
          <Text style={styles.buttonMapText}>Clique no mapa para abrir a rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ContentStep
