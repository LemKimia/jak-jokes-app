import { useQuery } from "@tanstack/react-query";
import api from "./api";

const apiQuery = {
  fetchJokesCategory() {
    const {
      data: jokesCategory,
      isFetching: isFetchingJokesCategory ,
      isSuccess: jokesCategoryFetched,
      error: errorFetchingCategory,
    } = useQuery({
      queryFn: api.getJokesCategory,
      queryKey: ["jokesCategory"],
    });
    return { jokesCategory, isFetchingJokesCategory, jokesCategoryFetched, errorFetchingCategory };
  },
  fetchJokes(category: string) {
    const {
      data: jokes,
      isFetching: isFetchingJokes,
      isSuccess: jokesFetched,
      error: errorFetchingJokes,
      refetch: fetchJokes
    } = useQuery({
      queryFn: () => api.getJokes(category),
      queryKey: ["jokes", category],
    });
    return { jokes, isFetchingJokes, jokesFetched, errorFetchingJokes, fetchJokes };
  }
};
export default apiQuery;
