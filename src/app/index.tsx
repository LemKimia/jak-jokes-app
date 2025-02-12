import { useCallback, useEffect, useMemo, useState } from "react";
import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";
import { Jokes } from "../utils/type";
import api from "../utils/api";
import useJokesStore from "../utils/store";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [jokes, setJokes] = useState<Record<string, Jokes[]>>({});

  const { isFetchingJokesCategory, fetchJokesCategory } =
    apiQuery.fetchJokesCategory();

  const jokesData = useJokesStore((state) => state.jokes);
  const jokesCategory = useJokesStore((state) => state.jokesCategory);
  const clearJokes = useJokesStore((state) => state.clearJokes);
  const clearJokesCategory = useJokesStore((state) => state.clearJokesCategory);

  // Limit categories to first 5 or default to "Any"
  const cleanJokesCategory = jokesCategory?.slice(0, 5) || [];

  const { isLoading } = apiQuery.fetchAllJokes(cleanJokesCategory);

  const isScreenLoading = isLoading || isFetchingJokesCategory || refreshing;

  const memoizedJokesCategory = useMemo(
    () => cleanJokesCategory,
    [cleanJokesCategory]
  );

  // Remove duplicate jokes using useMemo for optimization
  const uniqueAllJokesData = useMemo(() => {
    if (!jokesData || jokesData.length === 0) return [];

    const seen = new Set();
    return jokesData.filter((joke) => {
      if (seen.has(joke.id)) return false;
      seen.add(joke.id);
      return true;
    });
  }, [jokesData]);

  // Effect to update the state with fetched jokes
  useEffect(() => {
    if (!jokesData || jokesData.length === 0) return;

    setJokes((prevJokes) => {
      const newJokesMap = { ...prevJokes };
      let hasNewJokes = false;

      uniqueAllJokesData.forEach((joke) => {
        if (!newJokesMap[joke.category]) {
          newJokesMap[joke.category] = [];
        }

        // Check if joke already exists in category
        const alreadyExists = newJokesMap[joke.category].some(
          (j: Jokes) => j.id === joke.id
        );

        // If joke is new, add it to the category
        if (!alreadyExists) {
          newJokesMap[joke.category] = [...newJokesMap[joke.category], joke];
          hasNewJokes = true;
        }
      });

      return hasNewJokes ? newJokesMap : prevJokes;
    });
  }, [uniqueAllJokesData]);

  // Function to fetch more jokes of a specific category
  const handleFetchMoreJokes = useCallback(async (category: string) => {
    try {
      const response = await api.getJokes(category);

      // Update jokes state while ensuring no duplicates
      setJokes((prevJokes) => ({
        ...prevJokes,
        [category]: [
          ...(prevJokes[category] || []),
          ...response.filter(
            (joke) => !prevJokes[category]?.some((j) => j.id === joke.id)
          ),
        ],
      }));
    } catch (err) {
      console.error("Error fetching more jokes:", err);
    }
  }, []);

  const getJokesByCategory = (category: string) => {
    return jokes[category] || [];
  };

  const handleRefresh = () => {
    setRefreshing(true);
    clearJokes();
    clearJokesCategory();
    setJokes({});

    setTimeout(() => {
      fetchJokesCategory();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <HomeScreen
      isScreenLoading={isScreenLoading}
      getJokesByCategory={getJokesByCategory}
      jokesCategory={memoizedJokesCategory}
      handleFetchMoreJokes={handleFetchMoreJokes}
      handleRefresh={handleRefresh}
    />
  );
};

export default Index;
