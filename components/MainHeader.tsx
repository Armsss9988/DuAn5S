import React from "react";
import { Box, HStack, Text, Button, Image } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useNavigation, useRouter } from "expo-router";
import CustomAlertDialog from "@/components/CustomAlertDialog";
import { useAlert } from "@/hooks/useAlert";
import { useContext } from "react";
import { AuthContext } from "./services/AuthProvider";

interface Prop {
  title: string;
  isBack: boolean;
}
const MainHeader: React.FC<Prop> = ({ title, isBack }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const { isShowAlert, showAlert, closeAlert } = useAlert();
  const router = useRouter();
  return (
    <Box safeAreaTop bg="blue.400" borderBottomRadius="10">
      <HStack px="4" py="3" alignItems="center" justifyContent="space-between">
        <HStack
          alignItems="center"
          bg="blue.400"
          w="100%"
          justifyContent="space-between"
        >
          <Button
            ml="1"
            size='sm'
            backgroundColor="blue.900"
            onPress={() => showAlert()}
          >
            Đăng Xuất
          </Button>
          <CustomAlertDialog
            title="Đăng Xuất"
            message="Bạn xác định sẽ đăng xuất?"
            isOpen={isShowAlert}
            onClose={closeAlert}
            onOk={() => {
              logout();
            }}
          />

          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
          <Image
            w="25"
            h="35"
            source={require("@/assets/images/VNPT_Logo.png")}
            alt="Image Welcome"
            mr="4"
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default MainHeader;
