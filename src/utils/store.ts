import { create } from "zustand";
import { Jokes, JokesCategoryAliases } from "./type";

type JokesStore = {
  jokes: Jokes[];
  setJokes: (joke: Jokes) => void;
  jokesCategory: string[];
  setJokesCategory: (category: string[]) => void;
  clearJokes: () => void;
  clearJokesCategory: () => void;
};

const useJokesStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (joke) => set((state) => ({ jokes: [...state.jokes, joke] })),
  jokesCategory: [],
  setJokesCategory: (category) => set((state) => ({ jokesCategory: category })),
  clearJokes: () => set({ jokes: [] }),
  clearJokesCategory: () => set({ jokesCategory: [] }),
}));

export default useJokesStore;
