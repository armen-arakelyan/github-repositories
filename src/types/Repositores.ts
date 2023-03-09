interface Repository {
  id: number;
  url: string;
  name: string;
  pushedAt: Date;
  stargazerCount: number;
}

export type { Repository };
