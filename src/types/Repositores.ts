interface Repository {
  id: number;
  url: string;
  name: string;
  pushedAt: Date;
  stargazerCount: number;
}

interface Edges {
  cursor: string;
  node: Repository
}

export type { Repository, Edges };
