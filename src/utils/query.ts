import { useQuery } from "@tanstack/react-query";
import api from "./api";

const apiQuery = {
  fetchJokes() {
    const {
      data: jokes,
      isPending: isFetchingJokes,
      error: errorFetching,
    } = useQuery({
      queryFn: api.getJokes,
      queryKey: ["jokes"],
    });
    return { jokes, isFetchingJokes, errorFetching };
  },
};
export default apiQuery;
