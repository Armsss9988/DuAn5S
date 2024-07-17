import { Stack } from "expo-router";
import { Button, NativeBaseProvider } from 'native-base';
import { useHeaderHeight } from "@react-navigation/elements"
export default function DanhMucLayout() {
 
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
            title: 'Danh Mục',
            headerShown: false,
          }}  />
          <Stack.Screen name="nhatram" options={{
            title: 'Nhà Trạm',
            headerShown: false,
          }}  />
        </Stack>    
  </NativeBaseProvider>
     
  );
}
