import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Box, Text, Center } from "native-base";
import { AuthContext } from "../services/AuthProvider";
import { useContext } from "react";
export default function CustomDrawerContent(probs: any) {
  const { logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...probs}>
      <Box pb="10">
        <Image
          style={{ alignSelf: "center" }}
          size={150}
          borderRadius={100}
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
        />
        <Center>
        <Text>
            Le Anh Minh
        </Text>
        </Center>
        
      </Box>

      <DrawerItemList {...probs} />
      <DrawerItem label={"Logout"} onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}
