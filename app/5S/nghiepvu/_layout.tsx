import { Stack } from "expo-router";
import { Button, NativeBaseProvider } from 'native-base';
import { useHeaderHeight } from "@react-navigation/elements"
export default function NghiepVuLayout() {
 
  return (
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
            title: 'Nghiệp Vụ',
            headerShown: false,
          }}  />
          <Stack.Screen name="hoancong" options={{
            title: 'Hoàn Công',
            headerShown: false,
          }}  />
        </Stack>    
     
  );
}
