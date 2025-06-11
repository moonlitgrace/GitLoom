export interface Repo {
  id: number;
  name: string;
  private: boolean;
  updated_at: string;
  html_url: string;
}

// ===== function params ======

export interface FetchReposParams {
  accessToken: string | undefined;
  username: string | undefined;
  query: string;
}

export interface ImportRepoParams extends Omit<FetchReposParams, 'query'> {
  repo: Repo['name'];
}
