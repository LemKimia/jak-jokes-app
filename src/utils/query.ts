import { useQuery } from "@tanstack/react-query";
import api from "./api";

const apiQuery = {
  fetchJokes() {
    const {
      data: jokes,
      isFetching: isFetchingJokes,
      isSuccess: jokesFetched,
      error: errorFetching,
    } = useQuery({
      queryFn: api.getJokes,
      queryKey: ["jokes"],
    });
    return { jokes, isFetchingJokes, errorFetching, jokesFetched };
  },
};
export default apiQuery;
