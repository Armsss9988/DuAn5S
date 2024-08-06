import { Image, Text, View, Center, HStack, VStack, Flex } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, useRouter } from "expo-router";
export default function DanhMuc() {
  return (
    <SafeAreaView>
      <View>
        {itemData.map((item) => {
          return (
            <Item
              key={item.route}
              icon={item.icon}
              title={item.title}
              onPress={item.route}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const Item = (probs: any) => {
  const router = useRouter();
  return (
    <VStack my='2' style={styles.item}>
      <TouchableOpacity onPress={() => router.push(probs.onPress)}>
        <HStack w="100%" minWidth="100%" >
          <View marginLeft='5'>{probs.icon}</View>

          <Text fontSize="sm" bold marginLeft='5' alignSelf='center'>
            {probs.title}
          </Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 10,
  },
  title: {},
});

const itemData = [
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/donvi.jpg")}
        alt="Đơn Vị"
      />
    ),
    title: "Đơn Vị",
    route: "/5S/danhmuc/nhatram/",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/chucvu.png")}
        alt="Chức Vụ"
      />
    ),
    title: "Chức Vụ",
    route: "/home/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/nhanvien.png")}
      />
    ),
    title: "Nhân Viên",
    route: "/home/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/loainhanvien.png")}
      />
    ),
    title: "Loại Nhân Viên",
    route: "/home/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/congviec.jpg")}
      />
    ),
    title: "Công Việc 5S",
    route: "/home/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/nhatram3.png")}
      />
    ),
    title: "Nhà Trạm",
    route: "/5S/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={{
          uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
        }}
      />
    ),
    title: "Danh Sách Bộ Tiêu Chí",
    route: "/home/danhmuc/nhatram",
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={{
          uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
        }}
      />
    ),
    title: "Danh Sách Tiêu Chí",
    route: "/home/danhmuc/nhatram",
  },
];
