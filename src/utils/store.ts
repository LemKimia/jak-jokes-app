import { create } from "zustand";
import api from "./api";
import { Jokes, JokesCategoryAliases } from "./type";

type JokesStore = {
  jokes: Jokes[];
  setJokes: (joke: Jokes) => void;
  jokesCategories: JokesCategoryAliases;
  setJokesCategories: (categories: JokesCategoryAliases) => void;
};

const useJokesStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (joke) => set((state) => ({ jokes: [...state.jokes, joke] })),
  jokesCategories: { alias: "", resolved: "" },
  setJokesCategories: (categories) =>
    set(() => ({ jokesCategories: categories })),
}));

export default useJokesStore;
