interface Repository {
  id: number;
  url: string;
  name: string;
  pushedAt: Date;
  stargazerCount: number;
  owner: {
    login: string
  }
}

export type { Repository };
