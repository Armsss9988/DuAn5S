import { Stack } from "expo-router";
import { Button, NativeBaseProvider } from "native-base";
import { useHeaderHeight } from "@react-navigation/elements";
export default function NhaTramLayout() {
  return (
    <NativeBaseProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#565656",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitleVisible: true,
          headerBackVisible: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Danh Sách CSHT",
            headerShown: false,
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
