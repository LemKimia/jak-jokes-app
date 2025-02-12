import { create } from "zustand";
import { Jokes, JokesCategoryAliases } from "./type";

type JokesStore = {
  jokes: Jokes[];
  setJokes: (joke: Jokes[]) => void;
  jokesCategory: string[];
  setJokesCategory: (category: string[]) => void;
  clearJokes: () => void;
  clearJokesCategory: () => void;
};

const useJokesStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (joke) => set({ jokes: joke }),
  jokesCategory: [],
  setJokesCategory: (category) => set({ jokesCategory: category }),
  clearJokes: () => set({ jokes: [] }),
  clearJokesCategory: () => set({ jokesCategory: [] }),
}));

export default useJokesStore;
