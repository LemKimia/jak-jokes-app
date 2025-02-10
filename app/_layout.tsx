import { Stack } from "expo-router";
import { defaultConfig } from "@tamagui/config/v4";
import { TamaguiProvider, createTamagui } from "@tamagui/core";

const config = createTamagui(defaultConfig);

type Conf = typeof config;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="app" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
