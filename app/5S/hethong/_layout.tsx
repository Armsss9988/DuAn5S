import { Stack } from "expo-router";
import { Button, NativeBaseProvider } from 'native-base';
import { useHeaderHeight } from "@react-navigation/elements"
export default function HeThongLayout() {
 
  return (
  <NativeBaseProvider >
    <Stack screenOptions={{
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerBackVisible: false,
          }}>      
          <Stack.Screen name="index" options={{
            title: 'Danh Muc',
            headerShown: false,
          }}  />
        </Stack>    
  </NativeBaseProvider>
     
  );
}
