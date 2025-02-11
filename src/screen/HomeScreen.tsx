import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollView,
  Text,
  YStack,
  Accordion,
  Paragraph,
  Square,
} from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";

type HomeScreenProps = {
  jokesCategory: string[];
  isFetchingJokesCategory: boolean;
};

const HomeScreen = ({
  isFetchingJokesCategory,
  jokesCategory = [],
}: HomeScreenProps) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <ScrollView
      flex={1}
      style={{
        marginTop: top,
        paddingBottom: bottom + 30,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <YStack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        {isFetchingJokesCategory ? (
          <Text>Loading...</Text>
        ) : (
          <Accordion overflow="hidden" width="$20" type="multiple">
            {jokesCategory.map((category, index) => (
              <Accordion.Item key={index} value={`joke-${index}`}>
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph>{category}</Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                      >
                        <ChevronDown size="$1" />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content
                    animation="medium"
                    exitStyle={{ opacity: 0 }}
                  >
                    <Paragraph>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </YStack>
    </ScrollView>
  );
};

export default HomeScreen;
