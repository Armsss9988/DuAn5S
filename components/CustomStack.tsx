import React from "react";
import Item from "./Item";
import { Box, VStack, Text,HStack } from "native-base";
import {
  ImageSourcePropType,
} from "react-native";

type StackItem = {
  icon?: ImageSourcePropType;
  title: string;
  onPress: () => void;
};

interface StackProps {
  items: StackItem[];
}

const CustomStack: React.FC<StackProps> = ({ items }) => {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }
  return (
    <VStack>
      {rows.map((row, rowIndex) => (
        <HStack key={rowIndex} justifyContent="space-evenly">
          {row.map((item, itemIndex) => (
            <Box key={itemIndex} alignItems="center">
              <Item key={itemIndex} {...item}/>
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

export default CustomStack;
