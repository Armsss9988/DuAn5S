import { Image, Text, View, Center } from "native-base";
import { StyleSheet } from "react-native";

export default function HeThong() {
  return (
    <View style={styles.app}>
      {itemData.map((item) => {
        return <Item icon={item.icon} title={item.title} />;
      })}
    </View>
  );
}

const Item = (probs: any) => (
  <View style={styles.item}>
    {probs.icon}
    <Text fontSize="sm" bold mt="5" textAlign="center">
      {probs.title}
    </Text>
  </View>
);

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
        source={{
          uri: "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
        }}
      />
    ),
    title: "Quản Lý Người Dùng",
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
    title: "Quản Lý Nhóm Người Dùng",
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
    title: "Quản Lý MENU",
  },
];
