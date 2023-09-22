import React, { useState } from "react";
import Header from "../../components/Header";
import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

const DeliveryPage = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          delivery
          setIsSwitchOn={setIsSwitchOn}
          isSwitchOn={isSwitchOn}
        />

        <View style={styles.cardDelivery}>
          <Image
            source={
              isSwitchOn
                ? require("./assets/delivery-helmet.png")
                : require("./assets/coffee-bold.png")
            }
            style={styles.image}
          />
          <Text style={styles.title}>
            {isSwitchOn ? "Disponivel" : "Indisponivel"}
          </Text>
          <Text style={styles.subTitle}>
            {isSwitchOn
              ? "Toque no botão para voltar a receber entregas"
              : "Nenhuma entrega em andamento, Para ficar indisponivel, toque no botão."}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default DeliveryPage;
