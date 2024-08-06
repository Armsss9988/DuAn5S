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

const HiddenSwipeItem: React.FC<StackProps> = ({ items }) => {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }
  return (
    <VStack my='1'>
      {rows.map((row, rowIndex) => (
        <VStack key={rowIndex} justifyContent="flex-end" >
          {row.map((item, itemIndex) => (
            <Box key={itemIndex} alignItems="flex-end">
              <Item key={itemIndex} {...item}/>
            </Box>
          ))}
        </VStack>
      ))}
    </VStack>
  );
};

export default HiddenSwipeItem;
