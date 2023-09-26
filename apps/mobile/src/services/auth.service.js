import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const USER_KEY = "@AuthData";
const BASE_API_URL = "http://192.168.15.154:8080";

const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/login`, data, {
      headers: {
        "public-request": "true",
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Você pode tratar ou personalizar a manipulação de erros conforme necessário
  }
};

// const login = async (data) => {
//   axios
//     .post(`${BASE_API_URL}/auth/login`, data)
//     .then((response) => {
//       return response.data.token;
//     })
//     .catch((error) => {
//       console.error("Erro na requisição:", error);
//     });
// };

// Função para fazer logout
const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

const authService = {
  login,
  logout,
};

export default authService;
