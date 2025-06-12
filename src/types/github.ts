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

export interface CheckRepoParams extends Omit<FetchReposParams, 'query'> {
  repo: Repo['name'];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ImportRepoConfigParams extends CheckRepoParams {}

export interface CreateContentParams extends ImportRepoConfigParams {
  path: string;
  message: string;
  content: unknown;
}
