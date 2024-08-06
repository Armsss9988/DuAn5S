import { get, post } from "../config/Request";
import axios from "axios";
enum URL {
  login = "/Home/Login",
  addCSHT = "/Home/Logout",
}

class userService {
  static _instance = new userService();

  async LoginUser(loginData: LoginData) {
    try {
      return await post({
        url: URL.login,
        params: loginData,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error ${error}`);
      }
    }
  }
  async Logout(newCSHT: cshtItem) {
    try {
      const response = await post({
        url: URL.addCSHT,
        params: { newCSHT },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        throw new Error(`Network Error`);
      }
    }
  }
}
export default userService._instance;
