
import { NativeBaseProvider, Box, Button } from "native-base";
import { Link } from "expo-router";
import HomeScreen from "@/app-example/(tabs)";
export default function Login() {
  return (
    <NativeBaseProvider>
      <Box>Login</Box>
      <Link href="/home" >Login</Link>
    </NativeBaseProvider>
    
  );
}
