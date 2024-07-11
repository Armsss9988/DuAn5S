import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer} from 'expo-router/drawer';
export default function HomeLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
      <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="danhmuc" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Danh Mục',
            title: 'Danh Mục',
          }}
        />
         <Drawer.Screen
          name="nghiepvu" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Nghiệp Vụ',
            title: 'Nghiệp Vụ',
          }}
        />
         <Drawer.Screen
          name="hethong" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Hệ Thống',
            title: 'Hệ Thống',
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}
