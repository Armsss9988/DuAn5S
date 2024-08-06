import { View, Text, Image, Pressable, HStack } from "native-base";
import { useLinkTo } from "@react-navigation/native";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: "25%",
    alignItems: "center",

    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
});
type ItemProps = {
  icon?: ImageSourcePropType;
  title: string;
  onPress: () => void;
};
const Item: React.FC<ItemProps> = ({ title, icon, onPress }) => {
  const linkTo = useLinkTo();

  return (
    <>
      <Pressable
        onPress={onPress}
        rounded="8"
        overflow="hidden"
        borderWidth="1"
        borderColor="coolGray.300"
        minWidth="30%"
        alignContent="center"
        alignItems="center"
        shadow="3"
        bg="blue.200"
        p='0.5'
        my='0.5'
      >
        <HStack>
          <Image source={icon} alignSelf="center" />
          <Text fontSize={8} bold mt="1" textAlign="center">
            {title}
          </Text>
        </HStack>
      </Pressable>
    </>
  );
};
export default Item;
