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

interface Edges {
  cursor: string;
  node: Repository
}

export type { Repository, Edges };
