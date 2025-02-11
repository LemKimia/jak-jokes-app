import { useEffect } from "react";
import apiQuery from "../utils/query";
import useJokesStore from "../utils/store";
import HomeScreen from "../screen/HomeScreen";

const Index = () => {
  const setJokes = useJokesStore((state) => state.setJokes);
  const { isFetchingJokes, errorFetching, jokes, jokesFetched } =
    apiQuery.fetchJokes();

  useEffect(() => {
    if (jokes && jokesFetched) {
      setJokes(jokes);
    }
  }, [jokes, jokesFetched]);
  return <HomeScreen isFetchingJokes={isFetchingJokes} jokes={jokes} />;
};

export default Index;
