import axios from "axios";

const api = {
  async getJokesCategory() {
    const url = "https://v2.jokeapi.dev/categories";
    try {
      const response = await axios.get(url);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching jokes", error);
    }
  },
  async getJokes(category: string) {
    const url = `https://v2.jokeapi.dev/joke/${category}?type=single&amount=2`;
    try {
      const response = await axios.get(url);
      return response.data.jokes;
    } catch (error) {
      console.error("Error fetching jokes", error);
    }
  }
};

export default api;
