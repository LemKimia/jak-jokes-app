import { useCallback, useEffect, useState } from "react";
import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";
import { Jokes } from "../utils/type";
import api from "../utils/api";

const Index = () => {
  const [jokes, setJokes] = useState<Jokes[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isFetchingJokesCategory, jokesCategory, jokesCategoryFetched } =
    apiQuery.fetchJokesCategory();

  const cleanJokesCategory = jokesCategory
    ? jokesCategory.slice(0, 5)
    : ["Any"];
  const { allJokesData } = apiQuery.fetchAllJokes(cleanJokesCategory);

  const getJokesByCategory = useCallback(
    (category: string) => {
      if (!allJokesData || allJokesData.length === 0) return [];

      let seenJokes = new Set<number>();

      return allJokesData
        .filter((item, index) =>
          category === "Any" ? index < 2 : item.category === category
        )
        .filter((joke) => {
          if (seenJokes.has(joke.id)) return false;
          seenJokes.add(joke.id);
          return true;
        });
    },
    [allJokesData]
  );

  const handleFetchMoreJokes = useCallback(
    async (category: string) => {
      setIsFetching(true);
      setError(null);

       try {
         const response = await api.getJokes(category);
         setJokes((prevJokes) => [...prevJokes, ...response]); 
       } catch (err) {
         setError("Failed to fetch jokes.");
       } finally {
         setIsFetching(false);
       }
    },
    []
  );

  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      getJokesByCategory={getJokesByCategory}
      jokesCategory={cleanJokesCategory}
      jokes={jokes}
      handleFetchMoreJokes={handleFetchMoreJokes}
    />
  );
};

export default Index;
