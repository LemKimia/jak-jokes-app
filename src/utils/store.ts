import { create } from "zustand";
import { Jokes } from "./type";

type JokesStore = {
  jokes: Jokes[];
  setJokes: (joke: Jokes[]) => void;
  jokesCategory: string[];
  setJokesCategory: (category: string[]) => void;
  moveCategoryToTop: (category: string) => void;
  clearJokes: () => void;
  clearJokesCategory: () => void;
};

const useJokesStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (joke) => set({ jokes: joke }),
  jokesCategory: [],
  setJokesCategory: (category) => set({ jokesCategory: category }),
  moveCategoryToTop: (category: string) =>
    set((state) => {
      const updatedList = state.jokesCategory.filter(
        (item) => item !== category
      );
      return { jokesCategory: [category, ...updatedList] };
    }),
  clearJokes: () => set({ jokes: [] }),
  clearJokesCategory: () => set({ jokesCategory: [] }),
}));

export default useJokesStore;
