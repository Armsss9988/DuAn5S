import { Stack } from "expo-router";
import { Button, NativeBaseProvider } from 'native-base';
import { theme, config } from '../utils/custom-theme';
import { useHeaderHeight } from "@react-navigation/elements"
export default function RootLayout() {
 
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
            title: 'Login',
            headerShown: false,
          }}  />
          <Stack.Screen name="5S" options={{
            title: 'Ứng dụng 5S',
            headerShown: false,
          }}  />
        </Stack>    
  </NativeBaseProvider>
     
  );
}
