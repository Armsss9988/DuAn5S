import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Box, Text, Center } from "native-base";
export default function CustomDrawerContent(probs: any) {
  const router = useRouter();
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
      <DrawerItem label={"Logout"} onPress={() => router.replace("/")} />
    </DrawerContentScrollView>
  );
}
