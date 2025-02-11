import { Stack } from "expo-router";
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui, TamaguiProvider } from "tamagui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createTamagui(defaultConfig);
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
};

export default RootLayout;
