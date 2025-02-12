import axios from "axios";
import { Jokes, jokesCategoryResponse, JokesResponse } from "./type";

const api = {
  async getJokesCategory(): Promise<string[]> {
    const url = "https://v2.jokeapi.dev/categories";
    try {
      const response = await axios.get<jokesCategoryResponse>(url);
      if (!response.data || !Array.isArray(response.data.categories)) {
        console.warn("Invalid category response", response.data);
        return [];
      }
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching jokes", error);
      return [];
    }
  },
  async getJokes(category: string): Promise<Jokes[]> {
    const url = `https://v2.jokeapi.dev/joke/${category}?type=single&amount=2`;
    try {
      const response = await axios.get<JokesResponse>(url);
      if (!response.data) {
        console.warn("Empty response for jokes:", response);
        return [];
      }
      if (!Array.isArray(response.data.jokes)) {
        console.warn("Unexpected jokes data format", response.data);
        return [];
      }
      return response.data.jokes;
    } catch (error) {
      console.error("Error fetching jokes", error);
      return [];
    }
  },
};

export default api;
