import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const USER_KEY = "@AuthData";
const BASE_API_URL = process.env.API_URL;

const login = async (data) => {
  console.log(data);
  try {
    if (!data.username || !data.password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const response = await axios.post(`${BASE_API_URL}/auth/login`, data, {
      headers: {
        "public-request": "true",
      },
    });

    if (!response.data.token) {
      throw new Error("Token não encontrado na resposta do servidor");
    }

    console.log(response)
    await AsyncStorage.setItem(USER_KEY, response.data.token);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Não foi possível fazer login. Verifique suas credenciais e tente novamente."
    );
  }
};

// Função para fazer logout
const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

const authService = {
  login,
  logout,
};

export default authService;
