import {
  ScrollView,
  Text,
  YStack,
  Accordion,
  Paragraph,
  Square,
  Button,
  Spinner,
} from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Jokes } from "../utils/type";
import { FlatList } from "react-native";

type HomeScreenProps = {
  jokes: Record<string, Jokes[]>;
  jokesCategory: string[];
  handleFetchMoreJokes: (category: string) => void;
  isFetchingJokesCategory: boolean;
  getJokesByCategory: (category: string) => Jokes[];
};

const HomeScreen = ({
  jokes,
  jokesCategory,
  isFetchingJokesCategory,
  getJokesByCategory,
  handleFetchMoreJokes,
}: HomeScreenProps) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <FlatList
      data={jokesCategory}
      keyExtractor={(item, index) => `joke-category-${item}`}
      style={{ width: "100%" }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
        paddingTop: 10,
      }}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      ListEmptyComponent={
        isFetchingJokesCategory ? (
          <Spinner size="large" />
        ) : (
          <Text>No joke categories available.</Text>
        )
      }
      renderItem={({ item, index }) => {
        const jokesList = getJokesByCategory(item);
        return (
          <JokesAccordion
            handleFetchMoreJokes={handleFetchMoreJokes}
            index={index}
            item={item}
            jokesList={jokesList}
          />
        );
      }}
    />
  );
};

type JokesAccordionProps = {
  item: string;
  index: number;
  jokesList: Jokes[];
  handleFetchMoreJokes: (category: string) => void;
};

const JokesAccordion = ({
  index,
  item,
  jokesList,
  handleFetchMoreJokes,
}: JokesAccordionProps) => {
  return (
    <Accordion overflow="hidden" width="$20" type="multiple">
      <Accordion.Item key={index} value={item}>
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open }: { open: boolean }) => (
            <>
              <Paragraph>
                {index + 1}. {item}
              </Paragraph>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            {jokesList.length > 0 ? (
              jokesList.map((jok) => (
                <Square key={jok.id} borderWidth={1}>
                  <Paragraph>{jok.joke}</Paragraph>
                </Square>
              ))
            ) : (
              <Text>Loading jokes...</Text>
            )}

            <Button onPress={() => handleFetchMoreJokes(item)}>
              <Text>Get more jokes</Text>
            </Button>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
};

export default HomeScreen;
