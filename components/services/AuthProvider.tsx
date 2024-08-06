import * as SecureStore from "expo-secure-store";
import userService from "./userService";
import { useToast, Toast } from "native-base";
import ToastAlert from "../ToastAlert";
import {
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  token: string | null;
  userInfo: {};
  isLoading: boolean;
  logout: () => void;
  login: (data: LoginData) => void;
}
export const AuthContext = createContext<any>(null);
export interface IAuthProviderProps {
  children: JSX.Element;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<LoginRes | {}>({});
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showErrorToast = (message: string) => {
    const toast = useToast();
    toast.show({
      title: "Login Failed",
      description: message,
      duration: 5000,
    });
  };
  const login = async (loginData: LoginData) => {
    try {
      const response : LoginRes = await userService.LoginUser(loginData);
      if (!response.error) {
        await SecureStore.setItemAsync("userInfo", JSON.stringify(response));
        await SecureStore.setItemAsync("token", response.token);
        Toast.show({
          render: () => {
            return (
              <ToastAlert title="Đăng nhập thành cmn công." status="success" />
            );
          },
          duration: 3000,
          placement: "top",
        });

        setToken(response.token);
        setUserInfo(response);
        console.log(`Saved User Data: ${response}`);
      } else {
        Toast.show({
          render: () => {
            return (
              <ToastAlert title="Tên người dùng hoặc mật khẩu không đúng." status="error" />
            );
          },
          duration: 3000,
          placement: "top",
        });
      }
    } catch (error) {
      console.error("Failed to save token and user info", error);
      throw new Error("Failed to save token and user info");
    }
  };
  const logout = async () => {
    await removeTokenAndUserInfo();
    setToken("");
    setUserInfo({});
  };
  const getUserInfo = async () => {
    try {
      const userInfo = await SecureStore.getItemAsync("userInfo");

      return {
        userInfo: userInfo ? JSON.parse(userInfo) : null,
      };
    } catch (error) {
      console.error("Failed to retrieve token and user info", error);
      return { token: null, userInfo: null };
    }
  };
  const removeTokenAndUserInfo = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("userInfo");
    } catch (error) {
      console.error("Failed to remove token and user info", error);
    }
  };
  const isLoggedIn = async () => {
    setIsLoading(true);
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        if (storedToken) {
          setToken(storedToken);
          const user = getUserInfo();
          setUserInfo(user);
        }
        
      } catch (error) {
        console.error("Failed to load token", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userInfo, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
