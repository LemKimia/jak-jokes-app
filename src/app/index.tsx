import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";
import { useQueries } from "@tanstack/react-query";
import api from "../utils/api";
import { Jokes } from "../utils/type";

const Index = () => {
  const { isFetchingJokesCategory, jokesCategory } =
    apiQuery.fetchJokesCategory();
  const { jokes } = apiQuery.fetchJokes("any");
  const cleanJokesCategory = jokesCategory.slice(0, 5);
  const { jokesData } = apiQuery.fetchAllJokes(cleanJokesCategory);


  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      jokesCategory={jokesCategory}
      jokes={jokesData}
    />
  );
};

export default Index;
