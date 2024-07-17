import { Stack } from "expo-router";
import { Button, NativeBaseProvider, Box ,View } from 'native-base';
import { HelloWave } from "@/components/HelloWave";
import { useHeaderHeight } from "@react-navigation/elements"

export default function Home() {
  return (
    <>
        <Stack.Screen options={{
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerBackVisible: false,
          }}
          />
          <View>

          </View>
    </>
  );
}
