import React, { useState } from "react";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Switch } from "react-native-paper";
import { useUser } from "../../store/user.store";

const Header = ({ delivery, isSwitchOn, setIsSwitchOn }) => {
  const navigation = useNavigation();
  const { userData } = useUser();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const goToProfile = () => {
    navigation.navigate("Perfil");
  };
  return (
    <>
      <View style={styles.backgroundOrange} />
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={goToProfile}>
          <View style={styles.profile}>
            <Avatar.Icon
              size={50}
              icon="camera"
              style={{ backgroundColor: "green" }}
            />
            <Text style={styles.profileText}>{userData?.name}</Text>
          </View>
        </TouchableOpacity>
        {delivery && (
          <Switch
            style={styles.switch}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="#04D361"
          />
        )}
      </View>
    </>
  );
};

export default Header;
