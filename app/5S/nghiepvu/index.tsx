import { Image, Text, View, VStack, HStack, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NghiepVu() {
  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          {itemData.map((item) => {
            return (
              <Item
                key={item.title}
                icon={item.icon}
                title={item.title}
                onPress={item.route}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Item = (probs: any) => {
  const router = useRouter();
  return (
    <VStack my="2" style={styles.item}>
      <TouchableOpacity onPress={() => router.push(probs.onPress)}>
        <HStack w="100%" minWidth="100%">
          <View marginLeft="5">{probs.icon}</View>

          <Text fontSize="sm" bold marginLeft="5" alignSelf="center">
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
        source={{
          uri: "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
        }}
      />
    ),
    title: "Gán Nhân Viên Quản Lý CSHT",
    route: "/home/nghiepvu/hoancong",
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
    title: "Quản Lý Phong Trào",
    route: "/5S/nghiepvu/hoancong",
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
    title: "Giao Việc Nhân Viên",
    route: "/5S/nghiepvu/hoancong",
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
    title: "Hoàn Công 5S",
    route: "/5S/nghiepvu/hoancong",
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
    title: "Chấm Điểm 5S",
    route: "/home/nghiepvu/hoancong",
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
    title: "Phiếu Giao Đơn Vị",
    route: "/home/nghiepvu/hoancong",
  },
];
