import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer} from 'expo-router/drawer';
import CustomDrawerContent from '../../components/navigation/CustomDrawerContent'
export default function HomeLayout() {

  return (
    <GestureHandlerRootView>
      <Drawer drawerContent={CustomDrawerContent}>
      <Drawer.Screen
          name="home" 
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="danhmuc" 
          options={{
            drawerLabel: 'Danh Mục',
            title: 'Danh Mục',
            headerShown: false,
          }}
        />
         <Drawer.Screen
          name="nghiepvu" 
          options={{
            drawerLabel: 'Nghiệp Vụ',
            title: 'Nghiệp Vụ',
            headerShown: false,
          }}
        />
         <Drawer.Screen
          name="hethong" 
          options={{
            drawerLabel: 'Hệ Thống',
            title: 'Hệ Thống',
            headerShown: false,
          }}
        />
        
      </Drawer>
      
    </GestureHandlerRootView>
  );
}
