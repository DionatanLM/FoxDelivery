import React, { useState } from "react";
import { View, Image, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput, Checkbox, Text } from "react-native-paper";
import backgroundImg from "../../assets/backgroundDelivery.png";
import { styles } from "./styles";
import { useAuth } from "../../store/auth.store";

const theme = {
  colors: {
    primary: "#FFAD6B",
  },
};

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {signIn} = useAuth();

  const handleSignIn = async () => {
    try {
      const objForm = {
        username: username,
        password: password,
      };
      await signIn(objForm);
      console.log("logado");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground style={styles.container} source={backgroundImg}>
      <Image
        source={require("../../assets/logo_entregadores_branco.png")}
        style={styles.logo}
      />
      <View style={styles.containerInput}>
        <TextInput
          label="E-mail"
          value={username}
          onChangeText={(e) => setUsername(e)}
          style={styles.input}
          theme={theme}
          underlineColor="transparent"
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={secureTextEntry ? true : false}
          style={styles.input}
          theme={theme}
          underlineColor="transparent"
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye" : "eye-off"}
              color="#9C98A6"
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              size={24}
            />
          }
          selectionColor="#fff"
        />
        <View style={styles.checkboxContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox.Android
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => setRememberMe(!rememberMe)}
              color="#ffffff"
              uncheckedColor="#ffffff"
            />
            <Text style={styles.checkboxLabel}>Lembrar-me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          mode="contained"
          onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Quer ser um entregador? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
