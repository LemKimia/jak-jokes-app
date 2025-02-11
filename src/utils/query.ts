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
      queryKey: ["jokes"],
    });
    return { jokesCategory, isFetchingJokesCategory, jokesCategoryFetched, errorFetchingCategory };
  },
};
export default apiQuery;
