import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import OrderCard from "../../components/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { Dialog, Portal } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import socketIOClient from "socket.io-client";
import { API_URL } from "@env";
import { useUser } from "../../store/user.store";

const DeliveryPage = () => {
  const navigation = useNavigation();
  const { userData } = useUser();
  const [isSwitchOn, setIsSwitchOn] = useState(userData?.isActive);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState();
  const socket = socketIOClient(API_URL, {
    reconnection: true,
    reconnectionAttempts: Infinity,
  });

  const hideDialog = () => setShowOrderModal(false);

  const handleAcceptOrder = () => {
    setShowOrderModal(false);
    //setCurrentOrder(true);
    const obj = {
      socketId: newOrder.socketId,
      response: "accept",
    };
    socket.emit("deliveryman-response", obj);
  };

  const handleRejectOrder = () => {
    setCurrentOrder(false);
    setShowOrderModal(false);
    const obj = {
      socketId: socket.id,
      response: "reject",
    };
    socket.emit("deliveryman-response", obj);
    setNewOrder(null);
  };

  useEffect(() => {
    socket.emit("join-deliveryman", userData?.uuid);
    socket.on("new-order", (data) => {
      if (data) {
        setNewOrder(data);
        setShowOrderModal(true);
      }
    });
    Location.getCurrentPositionAsync({}).then((location) => {
      const { latitude, longitude } = location.coords;
      // socket.emit("locationDelivery", { latitude, longitude, id: "123456" });
    });
    return () => {};
  }, []);

  useEffect(() => {
    socket.on("new-order", (data) => {
      if (data) {
        setNewOrder(data);
        setShowOrderModal(true);
      }
    });
  }, [socket]);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          delivery
          setIsSwitchOn={setIsSwitchOn}
          isSwitchOn={isSwitchOn}
        />

        <View
          style={[
            styles.cardDelivery,
            !currentOrder && styles.cardDeliveryCentered,
          ]}
        >
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("Order", {
                uuid: "andkjsnfks3fjd",
                orderNumber: "123456",
              })
            }
            style={{ width: "100%" }}
          >
            <OrderCard
              status={"Em andamento"}
              store={"Beer Burger"}
              address={"Rua das Flores, 19"}
              orderNumber={"123456"}
            />
          </TouchableOpacity> */}
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
            {!isSwitchOn
              ? "Toque no botão para voltar a receber entregas"
              : "Nenhuma entrega em andamento, Para ficar indisponivel, toque no botão."}
          </Text>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={showOrderModal}
          onDismiss={hideDialog}
          dismissable={false}
          style={styles.dialog}
        >
          <View style={styles.dialogContainer}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogHeaderText}>
                Você possui uma nova corrida
              </Text>
            </View>
            <View style={styles.dialogBody}>
              <Text style={styles.dialogBodyText}>R$ 17,30</Text>
              <Text style={styles.dialogBodyDescription}>
                Percurso total de{" "}
                {parseFloat(newOrder?.totalDistance).toFixed(2)}km
              </Text>
            </View>

            <View style={styles.dialogFooter}>
              <Text style={styles.dialogFooterText}>
                Clique em um dos botões...
              </Text>
              <TouchableOpacity
                onPress={() => handleAcceptOrder()}
                style={[styles.buttonDialog, styles.buttonAccept]}
              >
                <MaterialCommunityIcons
                  name={"check"}
                  color={"#ffffff"}
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRejectOrder()}
                style={[
                  styles.buttonDialog,
                  styles.buttonGray,
                  styles.buttonCancel,
                ]}
              >
                <MaterialCommunityIcons
                  name={"close"}
                  color={"#ffffff"}
                  size={50}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Dialog>
      </Portal>
    </>
  );
};

export default DeliveryPage;
