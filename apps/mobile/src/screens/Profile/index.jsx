import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, Appbar, Button, TextInput } from "react-native-paper";
import { useAuth } from "../../store/auth.store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../../store/user.store";

const ProfilePage = () => {
  const { signOut } = useAuth();
  const { userData } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.cellphone);
  const [email, setEmail] = useState(userData.email);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };


  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error(
          "Permissão não concedida para acessar a biblioteca de mídia."
        );
      }
    })();
  }, []);

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
  return (
    <>
      <Appbar.Header
        mode="small"
        style={styles.header}
        theme={{ colors: { primary: "green", secondary: "red" } }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="#F6F6F6"
        />
        <Appbar.Content title="Perfil" color="#F6F6F6" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.containerImgProfile}>
          <Image source={{ uri: selectedImage }} style={styles.imageProfile} />

          <TouchableOpacity
            style={styles.buttonImg}
            onPress={handleChooseImage}
          >
            <MaterialCommunityIcons name="camera" color={"white"} size={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Nome"
            style={styles.input}
            activeUnderlineColor="#F58328"
            underlineStyle={{ backgroundColor: "none" }}
            value={name}
            onChangeText={handleNameChange}
          />

          <TextInput
            label="Telefone"
            style={styles.input}
            activeUnderlineColor="#F58328"
            underlineStyle={{ backgroundColor: "none" }}
            value={phone}
            onChangeText={handlePhoneChange}
          />

          <TextInput
            label="E-mail"
            style={styles.input}
            activeUnderlineColor="#F58328"
            underlineStyle={{ backgroundColor: "none" }}
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            label="CPF"
            disabled
            style={styles.input}
            activeUnderlineColor="#F58328"
            underlineStyle={{ backgroundColor: "none" }}
            value={userData.cpf}
          />

          <Button
            mode="outlined"
            onPress={() => console.log("Pressed")}
            textColor="#6e6e6e"
            disabled
          >
            Salvar
          </Button>
        </View>
        <Button
          icon="logout"
          mode="text"
          onPress={() => signOut()}
          textColor="#FB0000"
          style={styles.buttonLogout}
        >
          Sair da conta
        </Button>
      </View>
    </>
  );
};

export default ProfilePage;
