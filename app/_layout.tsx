import { Stack, useRouter } from "expo-router";
import { Button, NativeBaseProvider, View, Center, Spinner } from "native-base";
import { RootSiblingParent } from "react-native-root-siblings";
import AuthProvider from "@/components/services/AuthProvider";
import { AuthContext } from "@/components/services/AuthProvider";
import { useContext, useEffect } from "react";
export default function RootLayout() {
  return (

      <AuthProvider>
        <RootSiblingParent>
          <NativeBaseProvider>
            <RootStack />
          </NativeBaseProvider>
        </RootSiblingParent>
      </AuthProvider>
  );
}
const RootStack = () => {
  const { token, isLoading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.push("/5S");
      } else {
        router.push("/");
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#111111",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {token ? (
        <Stack.Screen
          name="5S"
          options={{
            title: "Ứng dụng 5S",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      )}
    </Stack>
  );
};

const LoadingScreen = () => (
  <Center flex={1}>
    <Spinner size="lg" color="primary.500" />
  </Center>
);
