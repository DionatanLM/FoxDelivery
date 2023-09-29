import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const USER_KEY = '@AuthData'
const BASE_API_URL =  process.env.API_URL

const login = async data => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/login`, data, {
      headers: {
        'public-request': 'true'
      }
    })

    return response.data
  } catch (error) {
    throw error // Você pode tratar ou personalizar a manipulação de erros conforme necessário
  }
}

// Função para fazer logout
const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY)
}

const authService = {
  login,
  logout
}

export default authService
