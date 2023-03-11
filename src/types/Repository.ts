interface RepositoryInfo {
    name: string;
    owner: {
        login: string;
        avatarUrl: string;
    }
    pushedAt: Date | null;
    shortDescriptionHTML: string;
    stargazerCount: number;
    languages: []
}

export type { RepositoryInfo };