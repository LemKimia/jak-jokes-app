import { useQueries, useQuery } from "@tanstack/react-query";

import api from "./api";
import { Jokes } from "./type";

const apiQuery = {
  fetchJokesCategory() {
    const {
      data: jokesCategory = [],
      isFetching: isFetchingJokesCategory,
      isSuccess: jokesCategoryFetched,
      error: errorFetchingCategory,
      refetch: fetchJokesCategory,
    } = useQuery({
      queryFn: api.getJokesCategory,
      queryKey: ["jokesCategory"],
    });
    return {
      jokesCategory,
      isFetchingJokesCategory,
      jokesCategoryFetched,
      errorFetchingCategory,
      fetchJokesCategory,
    };
  },
  fetchAllJokes(cleanJokesCategory: string[]) {
    const jokesQueries = useQueries({
      queries: cleanJokesCategory.map((category) => ({
        queryKey: ["jokesQuery", category],
        queryFn: () => api.getJokes(category),
        enabled: !!category,
      })),
    });

    const allJokesData: Jokes[] = jokesQueries.flatMap(
      (query) => query.data ?? []
    );
    const isLoading = jokesQueries.some((query) => query.isLoading);

    return { allJokesData, isLoading };
  },
};
export default apiQuery;
