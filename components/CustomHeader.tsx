import React from "react";
import { Box, HStack, Text, IconButton, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useNavigation, useRouter } from "expo-router";

interface Prop {
  title: string;
  isBack: boolean;
}
const CustomHeader: React.FC<Prop> = ({ title, isBack }) => {
  const router = useRouter();
  return (
    <Box safeAreaTop bg="blue.400" borderBottomRadius="10">
      <HStack px="4" py="3" alignItems="center" justifyContent="space-between">
        <HStack alignItems="center">
          {isBack && (
            <IconButton
              icon={<Icon as={FontAwesome} name="arrow-left" />}
              onPress={() => router.back()}
            />
          )}

          <Text color="white" fontSize="20" fontWeight="bold" ml="2">
            {title}
          </Text>
        </HStack>
        <IconButton icon={<Icon as={FontAwesome} name="search" />} />
      </HStack>
    </Box>
  );
};

export default CustomHeader;
