import { View, Text, Image, Pressable, HStack, Box } from "native-base";
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
    <Box
      alignItems="center"
      rounded="8"
      borderWidth="1"
      borderColor="coolGray.300"
      shadow="3"
      bg='blue.200'
      my="0.5"
    >
      <Pressable onPress={onPress}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              bg={
                isPressed
                  ? "coolGray.200"
                  : isHovered
                  ? "coolGray.200"
                  : "blue.200"
              }
              px='2'
              minW='120'
              
              overflow='hidden'
              rounded="8"
              shadow="3"
              style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}
            >
              <HStack>
                <Image source={icon} alignSelf="center" />
                <Text fontSize={8} bold ml='1' mt="1" textAlign="center" alignItems='center' justifyContent='center'>
                  {title}
                </Text>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};
export default Item;
