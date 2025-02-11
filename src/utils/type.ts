export type JokesCategoryAliases = {
  alias: string;
  resolved: string;
};


export type Jokes = {
  category: string;
  joke: string;
  type: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};
