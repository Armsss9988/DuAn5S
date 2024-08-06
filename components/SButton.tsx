import type { PropsWithChildren } from "react";
import React from "react";
import { View, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
export interface ISButtonProps {
  visible?: boolean
  onPress?: () => void
}

const SButton: React.FC<PropsWithChildren<ISButtonProps>> = (props) => {
  const { children, visible = true, onPress } = props;

  if (!visible)
    return <></>;

  return (
    <View
      
    >
      <TouchableOpacity onPress={onPress}>
        <View
         
     
        >
          <Text >{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SButton;
