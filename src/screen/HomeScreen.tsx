import {
  Text,
  Accordion,
  Paragraph,
  Square,
  Button,
  H3,
  Dialog,
  Spinner,
} from "tamagui";
import { useState } from "react";
import { ChevronDown } from "@tamagui/lucide-icons";
import { FlatList, RefreshControl } from "react-native";

import { Jokes } from "../utils/type";

type HomeScreenProps = {
  fetchCount: {
    [key: string]: number;
  };
  fetchingJokes: boolean;
  jokesCategory: string[];
  isScreenLoading: boolean;
  handleRefresh: () => void;
  handleFetchMoreJokes: (category: string) => void;
  getJokesByCategory: (category: string) => Jokes[];
  moveJokesCategoryToTop: (category: string) => void;
};

const HomeScreen = ({
  fetchCount,
  fetchingJokes,
  handleRefresh,
  jokesCategory,
  isScreenLoading,
  getJokesByCategory,
  handleFetchMoreJokes,
  moveJokesCategoryToTop,
}: HomeScreenProps) => {
  return (
    <FlatList
      data={jokesCategory}
      keyExtractor={(item) => `joke-category-${item}`}
      style={{ flex: 1, marginTop: 10 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isScreenLoading}
          onRefresh={handleRefresh}
        />
      }
      ListEmptyComponent={
        isScreenLoading ? (
          <Text>Finding better jokes ...</Text>
        ) : (
          <Paragraph>No joke categories available. Try refreshing !</Paragraph>
        )
      }
      ListHeaderComponent={isScreenLoading ? null : <H3>Jak-Jokes App</H3>}
      ListHeaderComponentStyle={{
        width: "100%",
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      renderItem={({ item, index }) => {
        const jokesList = getJokesByCategory(item);
        return (
          <JokesAccordion
            key={`joke-category-${item}`}
            handleFetchMoreJokes={handleFetchMoreJokes}
            index={index}
            item={item}
            fetchCount={fetchCount}
            jokesList={jokesList}
            fetchingJokes={fetchingJokes}
            moveJokesCategoryToTop={moveJokesCategoryToTop}
          />
        );
      }}
    />
  );
};

type JokesAccordionProps = {
  item: string;
  index: number;
  fetchCount: {
    [key: string]: number;
  };
  jokesList: Jokes[];
  fetchingJokes: boolean;
  handleFetchMoreJokes: (category: string) => void;
  moveJokesCategoryToTop: (category: string) => void;
};

const JokesAccordion = ({
  item,
  index,
  jokesList,
  fetchCount,
  fetchingJokes,
  handleFetchMoreJokes,
  moveJokesCategoryToTop,
}: JokesAccordionProps) => {
  const [selectedJoke, setSelectedJoke] = useState<string | null>(null);
  return (
    <>
      <Accordion
        marginVertical={5}
        borderWidth={1}
        borderRadius="$8"
        overflow="hidden"
        width="$20"
        type="multiple"
      >
        <Accordion.Item key={`category-${item}-${index}`} value={item}>
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }: { open: boolean }) => (
              <>
                <Paragraph>
                  {index + 1}. {item}
                </Paragraph>

                <Square
                  flexDirection="row"
                  animation="quick"
                  rotate={open ? "180deg" : "0deg"}
                >
                  <Button
                    rotate={open ? "180deg" : "0deg"}
                    size="$2"
                    onPress={() => moveJokesCategoryToTop(item)}
                    backgroundColor="#f2300c"
                  >
                    <Text color="white" fontSize="$1">
                      {open ? "Move!" : "Move?"}
                    </Text>
                  </Button>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="medium">
            <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
              {jokesList.length > 0 ? (
                jokesList.map((jok) => (
                  <Square
                    key={`joke-${jok.id}`}
                    marginVertical={5}
                    paddingVertical={5}
                  >
                    <Button size="$5" onPress={() => setSelectedJoke(jok.joke)}>
                      <Paragraph numberOfLines={2} ellipsizeMode="tail">
                        {jok.joke}
                      </Paragraph>
                    </Button>
                  </Square>
                ))
              ) : (
                <Square marginVertical={5} padded>
                  <Text>Loading jokes...</Text>
                </Square>
              )}

              {fetchCount[item] < 2 && (
                <Button
                  backgroundColor="#f2300c"
                  onPress={() => handleFetchMoreJokes(item)}
                  disabled={fetchingJokes}
                  icon={fetchingJokes ? <Spinner /> : undefined}
                >
                  <Text color="white">
                    {!fetchingJokes && "Get more jokes"}
                  </Text>
                </Button>
              )}
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
      <JokesDialog joke={selectedJoke} onClose={() => setSelectedJoke(null)} />
    </>
  );
};

type JokesDialogProps = {
  joke: string | null;
  onClose: () => void;
};

const JokesDialog = ({ joke, onClose }: JokesDialogProps) => {
  return (
    <Dialog modal open={!!joke} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          key={`overlay-${joke}`}
          backgroundColor="$shadow6"
          animation="slow"
        />
        <Dialog.Content
          key={`content-${joke}`}
          bordered
          elevate
          animation="quicker"
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          maxWidth={300}
        >
          <Square>
            <Paragraph>{joke}</Paragraph>
          </Square>
          <Dialog.Close asChild>
            <Button onPress={onClose}>Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default HomeScreen;
