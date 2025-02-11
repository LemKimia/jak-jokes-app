import apiQuery from "../utils/query";
import HomeScreen from "../screen/HomeScreen";
import { useQueries } from "@tanstack/react-query";
import api from "../utils/api";

const Index = () => {
  const { isFetchingJokesCategory, jokesCategory } =
    apiQuery.fetchJokesCategory();
  const { jokes } = apiQuery.fetchJokes("any");
  const cleanJokesCategory = jokesCategory.slice(0, 5)

  const jokesQueries = useQueries({
    queries: (cleanJokesCategory ?? ["any"]).map((category: string) => ({
      queryKey: ["jokesQuery", category],
      queryFn: () => api.getJokes(category),
    })),
  });
  const jokesData = jokesQueries.map((query) => query.data || []);
  const isLoading = jokesQueries.some((query) => query.isLoading);

  return (
    <HomeScreen
      isFetchingJokesCategory={isFetchingJokesCategory}
      jokesCategory={jokesCategory}

    />
  );
};

export default Index;
