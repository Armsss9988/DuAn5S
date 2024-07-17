import { Image, Text, View, Center } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useLinkTo } from "@react-navigation/native";

export default function DanhMuc() {
  
 
  return (
    <View style={styles.app}>
      {itemData.map((item) => {
        return <Item icon={item.icon} title={item.title} onPress={item.route} />;
      })}
    </View>
  );
}

const Item = (probs: any) => {
  const linkTo = useLinkTo();

  return (
  <TouchableOpacity onPress={() => linkTo(probs.onPress)} style={styles.item}>
    <View style={styles.item}>
      {probs.icon}
      <Text fontSize="sm" bold mt="5" textAlign="center">
        {probs.title}
      </Text>
    </View>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",

    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    minWidth: 140,
    padding: 20,
    margin: 2,
    height: 200,
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
      />
    ),
    title: "Đơn Vị",
    route: '/5S/danhmuc/nhatram/'
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/chucvu.png")}
      />
    ),
    title: "Chức Vụ",
    route: '/home/danhmuc/nhatram'
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/nhanvien.png")}
      />
    ),
    title: "Nhân Viên",
    route: '/home/danhmuc/nhatram'
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/loainhanvien.png")}
      />
    ),
    title: "Loại Nhân Viên",
    route: '/home/danhmuc/nhatram'
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/congviec.jpg")}
      />
    ),
    title: "Công Việc 5S",
    route: '/home/danhmuc/nhatram'
  },
  {
    icon: (
      <Image
        style={{ width: 50, height: 50, alignSelf: "center" }}
        source={require("@/assets/images/nhatram3.png")}
      />
    ),
    title: "Nhà Trạm",
    route: '/5S/danhmuc/nhatram'
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
    route: '/home/danhmuc/nhatram'
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
    route: '/home/danhmuc/nhatram'
  },
];
