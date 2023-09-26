import React from 'react'
import { styles } from './styles'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const OrderCard = ({ status, store, address, orderNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textWhite}>{status}</Text>
        <Text style={styles.textWhite}>#{orderNumber}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.textGray}>Detalhes da proxima parada:</Text>
        <Text style={styles.textLightGray}>Estabelecimento: {store}</Text>
        <Text style={styles.textLightGray}>Endereço: {address}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textLightGray}>Visualizar entrega completa</Text>
        <MaterialCommunityIcons
          name={'arrow-right'}
          color={'#9D9D9D'}
          size={20}
        />
      </View>
    </View>
  )
}

export default OrderCard
