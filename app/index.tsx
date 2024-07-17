import {
  NativeBaseProvider,
  Box,
  Button,
  View,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  Center,
} from "native-base";
import { useLinkTo } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
export default function Login() {
  const router = useRouter();
  const headerHeight = useHeaderHeight;
  return (
    <>
      <View
        borderRadius="md"

        mt="20"
        py="20"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Box w="100%" maxWidth="300px">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Username</FormControl.Label>
              <Input
                type="text"
                defaultValue=""
                placeholder="Username"
              />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                defaultValue=""
                placeholder="password"
              />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
        </Box>
        <Button  onPress={() => router.replace("/5S")}>
          Login
        </Button>
      </View>
    </>
  );
}
