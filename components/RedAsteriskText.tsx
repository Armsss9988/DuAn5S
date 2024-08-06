import React from "react";
import { Text } from "native-base";

interface RedAsteriskTextProps {
  children: React.ReactNode;
  error?: any;
}

const RedAsteriskText: React.FC<RedAsteriskTextProps> = ({
  children,
  error,
}) => {
  return (
    <Text bold>
      {children}
      <Text color="red.800">*</Text>
      {error && <Text color="red.900"> {error}</Text>}
    </Text>
  );
};

export default RedAsteriskText;
