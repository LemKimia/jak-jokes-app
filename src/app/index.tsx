import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";

const Index = () => {
  const {
    errorFetchingCategory,
    isFetchingJokesCategory,
    jokesCategory,
    jokesCategoryFetched,
  } = apiQuery.fetchJokesCategory();
  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      jokesCategory={jokesCategory}
    />
  );
};

export default Index;
