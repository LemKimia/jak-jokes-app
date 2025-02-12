import { useCallback, useEffect, useMemo, useState } from "react";
import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";
import { Jokes } from "../utils/type";
import api from "../utils/api";

const Index = () => {
  const [jokes, setJokes] = useState<Record<string, Jokes[]>>({});

  const { isFetchingJokesCategory, jokesCategory } =
    apiQuery.fetchJokesCategory();

  // Limit categories to first 5 or default to "Any"
  const cleanJokesCategory = jokesCategory?.slice(0, 5) || ["Any"];

  const { allJokesData, isLoading } =
    apiQuery.fetchAllJokes(cleanJokesCategory);

  const memoizedJokesCategory = useMemo(
    () => cleanJokesCategory,
    [cleanJokesCategory]
  );

  // Remove duplicate jokes using useMemo for optimization
  const uniqueAllJokesData = useMemo(() => {
    if (!allJokesData || allJokesData.length === 0) return [];

    const seen = new Set();
    return allJokesData.filter((joke) => {
      if (seen.has(joke.id)) return false;
      seen.add(joke.id);
      return true;
    });
  }, [allJokesData]);

  // Effect to update the state with fetched jokes
  useEffect(() => {
    if (!allJokesData || allJokesData.length === 0) return;

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

  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory || isLoading}
      getJokesByCategory={getJokesByCategory}
      jokesCategory={memoizedJokesCategory}
      handleFetchMoreJokes={handleFetchMoreJokes}
    />
  );
};

export default Index;
