import {
  Button,
  Box,
  View,
  Center,
  Image,
  VStack,
  Text,
  HStack,
} from "native-base";
import { AuthContext } from "@/components/services/AuthProvider";
import CustomAlertDialog from "@/components/CustomAlertDialog";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useAlert } from "@/hooks/useAlert";
import ImageCarousel from "@/components/ImageCarousel";
import MainHeader from "@/components/MainHeader";
import ImageCarouselSource from "@/components/ImageCarouselSource";
export default function Home() {
  const { userInfo, logout } = useContext(AuthContext);
  const { isShowAlert, showAlert, closeAlert } = useAlert();
  const images = [
  require('@/assets/images/quangbinh_trienkhai2017_01.jpg'),
  require('@/assets/images/vnpt.jpg'),
  require('@/assets/images/vnpt1.jpg'),
  require('@/assets/images/vnptLDTT.jpg'),
];
  return (
      
      <View bg="blue.100" w="100%" h="100%">
        <MainHeader isBack={false} title="Dự án 5S"/>
        <VStack
          space={4}
          justifyContent="space-evenly"
          alignItems="space-evenly"
        >
          <Center w="100%">
            <Text bold>Xin chào {userInfo.email}</Text>
          </Center>
          <Image
            w="100%"
            h="240"
            source={require("@/assets/images/background.png")}
            alt="Image Welcome"
          />

          <Box justifyContent="center" alignItems="center"></Box>
          <Box w="100%" mt="10">
            <ImageCarouselSource images={images} />
          </Box>
        </VStack>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6347",
  },
});
