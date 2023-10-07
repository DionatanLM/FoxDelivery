import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { USER_KEY, API_URL } from "@env";

const getUser = async () => {
  const userData = await AsyncStorage.getItem(USER_KEY);
  try {
    if (userData) {
      const _userData = JSON.parse(userData);
      const response = await axios.get(
        `${API_URL}/deliveryman/username/${_userData.user.username}`
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateIsActive = async (id, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/deliveryman/availability/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const userService = {
  getUser,
  updateIsActive
};

export default userService;
