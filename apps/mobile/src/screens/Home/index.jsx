import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Avatar, Chip, Divider, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { moneyToPtBrTwoPrecision } from "../../helpers/masks.helper";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeliveryPage from "../Delivery";
import HelpPage from "../Help";
import Header from "../../components/Header";
import * as Location from "expo-location";
import { useUser } from "../../store/user.store";

const HomePage = () => {
  const navigation = useNavigation();
  const { userData } = useUser();

  const [showBalance, setShowBalance] = useState(false);
  const initialDisplayCount = 3;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleHistory = () => {
    setIsExpanded(!isExpanded);
    setDisplayCount(isExpanded ? initialDisplayCount : arrayDeliveries.length);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    (async () => {
      // Solicita permissão para acessar a localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada.");
        return;
      }

      // Obtém a localização atual
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const arrayDeliveries = [
    {
      id: 1,
      address: "Rua Madre Maria Vilac, 1380",
      neighborhood: "Canasvieiras",
      price: 20.0,
      status: "Entregue",
    },
    {
      id: 2,
      address: "Avenida Beira-Mar Norte, 500",
      neighborhood: "Centro",
      price: 25.0,
      status: "Pendente",
    },
    {
      id: 3,
      address: "Rua das Flores, 789",
      neighborhood: "Jardim Botânico",
      price: 18.5,
      status: "Entregue",
    },
    {
      id: 4,
      address: "Avenida Paulista, 1234",
      neighborhood: "Bela Vista",
      price: 30.0,
      status: "Cancelado",
    },
    {
      id: 5,
      address: "Rua do Comércio, 567",
      neighborhood: "Centro",
      price: 22.0,
      status: "Em Andamento",
    },
    {
      id: 6,
      address: "Avenida Atlântica, 2000",
      neighborhood: "Copacabana",
      price: 40.0,
      status: "Entregue",
    },
    {
      id: 7,
      address: "Rua da Praia, 321",
      neighborhood: "Barra da Tijuca",
      price: 35.5,
      status: "Pendente",
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.padding}>
          <View style={styles.activity}>
            <View style={styles.activityTitleContainer}>
              <Text style={styles.activityTitle}>Sua atividade hoje</Text>
              <View style={styles.tabStatus}>
                <MaterialCommunityIcons
                  name="lightning-bolt-circle"
                  color={userData?.isActive ? "#04D361" : "red"}
                  size={15}
                  s
                />
                <Text>{userData?.isActive ? "Online" : "Offline"}</Text>
              </View>
            </View>

            <View style={styles.activityBalanceContainer}>
              <Text style={styles.balanceSubTitle}>Saldo</Text>

              <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>
                  {showBalance ? moneyToPtBrTwoPrecision(200) : "R$ *****"}
                </Text>
              </View>

              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <MaterialCommunityIcons
                  name={!showBalance ? "eye-off-outline" : "eye-outline"}
                  color={"#929292"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.routesContainer}>
              <View style={styles.routesTitleContainer}>
                <MaterialCommunityIcons
                  name={"motorbike"}
                  color={"#929292"}
                  size={30}
                />
                <Text style={styles.routesTitle}>Rotas finalizadas</Text>
              </View>
              <Text style={styles.routesSubTitle}>10</Text>
            </View>

            <View style={styles.routesContainer}>
              <View style={styles.routesTitleContainer}>
                <MaterialCommunityIcons
                  name={"check-circle-outline"}
                  color={"#929292"}
                  size={30}
                />
                <Text style={styles.routesTitle}>Rotas aceitas</Text>
              </View>
              <Text style={styles.routesSubTitle}>20</Text>
            </View>

            <View style={styles.routesContainer}>
              <View style={styles.routesTitleContainer}>
                <MaterialCommunityIcons
                  name={"close-circle-outline"}
                  color={"#929292"}
                  size={30}
                />
                <Text style={styles.routesTitle}>Rotas rejeitadas</Text>
              </View>
              <Text style={styles.routesSubTitle}>4</Text>
            </View>
          </View>

          <View style={!isExpanded ? styles.activity : styles.activityAlt}>
            <View style={styles.activityTitleContainer}>
              <Text style={styles.activityTitle}>Histórico de entregas</Text>
            </View>

            {arrayDeliveries.slice(0, displayCount).map((delivery) => (
              <View style={styles.deliveryCard} key={delivery.id}>
                <View style={styles.deliveryCardHeader}>
                  <Text style={styles.deliveryText}>{delivery.address}</Text>

                  <MaterialCommunityIcons
                    name={
                      delivery.status === "Entregue"
                        ? "check-circle-outline"
                        : "close-circle-outline"
                    }
                    color={
                      delivery.status === "Entregue" ? "#04D361" : "#FB0000"
                    }
                    size={20}
                  />
                </View>
                <View style={styles.deliveryCardHeader}>
                  <Text style={styles.deliveryText}>
                    {delivery.neighborhood}
                  </Text>
                  <Text style={styles.deliveryPrice}>
                    {moneyToPtBrTwoPrecision(delivery.price)}
                  </Text>
                </View>
              </View>
            ))}
            {arrayDeliveries.length > initialDisplayCount && (
              <Divider style={styles.divider} />
            )}
            {arrayDeliveries.length > initialDisplayCount && (
              <TouchableOpacity onPress={toggleHistory}>
                <View style={styles.deliveryHistory}>
                  <Text style={styles.deliveryHistoryTotal}>
                    {isExpanded ? "Recolher" : "Ver histórico completo"}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffc99d",

        tabBarStyle: {
          backgroundColor: "#F58328",

          ...Platform.select({
            android: {
              // Estilos específicos para Android aqui
              paddingTop: 8,
              height: 70,
              paddingBottom: 10,
            },
            ios: {
              // Estilos específicos para iOS aqui
              paddingTop: 8,
              height: 86,
            },
          }),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Entregas"
        component={DeliveryPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="racing-helmet"
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ajuda"
        component={HelpPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              color={color}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
