import {
  ScrollView,
  Text,
  YStack,
  Accordion,
  Paragraph,
  Square,
} from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Jokes } from "../utils/type";

type HomeScreenProps = {
  jokes: Jokes[];
  jokesCategory: string[];
  isFetchingJokesCategory: boolean;
};

const HomeScreen = ({
  jokes,
  jokesCategory,
  isFetchingJokesCategory,
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
                      <Paragraph>
                        {index + 1}. {category}
                      </Paragraph>
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
                    {jokes && jokes.length > 0 ? (
                      jokes
                        .filter((item, index) => {
                          if (category === "Any") {
                            return index < 2;
                          }
                          return item.category === category;
                        })
                        .map((jok) => (
                          <Square key={jok.id} borderWidth={1}>
                            <Paragraph>{jok.joke}</Paragraph>
                          </Square>
                        ))
                    ) : (
                      <Paragraph>Loading jokes...</Paragraph>
                    )}
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
