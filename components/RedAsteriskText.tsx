import React from "react";
import { Text } from "native-base";

interface RedAsteriskTextProps {
  children: React.ReactNode;
  error?: string;
}

const RedAsteriskText: React.FC<RedAsteriskTextProps> = ({
  children,
  error,
}) => {
  return (
    <Text>
      {children}
      <Text color="red.800">*</Text>
      {error && <Text color="red.900"> {error}</Text>}
    </Text>
  );
};

export default RedAsteriskText;