import axios from "axios";

const api = {
  async getJokesCategory() {
    const url = "https://v2.jokeapi.dev/categories";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching jokes", error);
    }
  },
};

export default api;
