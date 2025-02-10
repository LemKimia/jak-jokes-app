import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="HomeContainer" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
