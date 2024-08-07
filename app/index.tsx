import { useForm, Controller } from "react-hook-form";
import {
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  Toast,
} from "native-base";
import { AuthContext } from "@/components/services/AuthProvider";
import { useContext, useState } from "react";
import AppLoading from "@/components/AppLoading";
import { SafeAreaView } from "react-native";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    console.log("data " + data);
    try {
      await login(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Center flex={1}>
        <VStack width="90%" mx="3" maxW="300px">
          <FormControl isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            <FormControl.ErrorMessage>
              {errors.email?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={"password" in errors} mt="3">
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter your password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                  autoCapitalize="none"
                />
              )}
              name="password"
            />
            <FormControl.ErrorMessage>
              {errors.password?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          {isLoading ? (
            <AppLoading isShowLoading={true} message="Logging In...." />
          ) : (
            <Button mt="5" onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
          )}
        </VStack>
      </Center>
  );
}
