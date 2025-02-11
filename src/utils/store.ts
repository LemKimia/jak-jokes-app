import { create } from "zustand";
import { Jokes, JokesCategoryAliases } from "./type";

type JokesStore = {
  jokes: Jokes[];
  setJokes: (joke: Jokes) => void;
};

const useJokesStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (joke) => set((state) => ({ jokes: [...state.jokes, joke] })),
}));

export default useJokesStore;
