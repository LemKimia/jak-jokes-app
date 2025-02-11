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

  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      jokesCategory={cleanJokesCategory}
      jokes={jokesData}
    />
  );
};

export default Index;
