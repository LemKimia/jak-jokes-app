import { useCallback } from "react";
import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";

const Index = () => {
  const { isFetchingJokesCategory, jokesCategory, jokesCategoryFetched } =
    apiQuery.fetchJokesCategory();
  const { jokes } = apiQuery.fetchJokes("Any");

  const cleanJokesCategory = jokesCategory
    ? jokesCategory.slice(0, 5)
    : ["Any"];
  const { jokesData } = apiQuery.fetchAllJokes(cleanJokesCategory);

  const getJokesByCategory = useCallback(
    (category: string) => {
      if (!jokesData || jokesData.length === 0) return [];

      let seenJokes = new Set<number>();

      return jokesData
        .filter((item, index) =>
          category === "Any" ? index < 2 : item.category === category
        )
        .filter((joke) => {
          if (seenJokes.has(joke.id)) return false;
          seenJokes.add(joke.id);
          return true;
        });
    },
    [jokesData]
  );

  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      getJokesByCategory={getJokesByCategory}
      jokesCategory={cleanJokesCategory}
      jokes={jokesData}
    />
  );
};

export default Index;
