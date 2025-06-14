export interface Repo {
  id: number;
  name: string;
  private: boolean;
  updated_at: string;
  html_url: string;
}

// ===== function params ======

export interface GetReposParams {
  accessToken: string | undefined;
  username: string | undefined;
  query: string;
}

export interface GetRepoConfigParams extends Omit<GetReposParams, 'query'> {
  repo: Repo['name'];
}

export interface CreateContentParams extends GetRepoConfigParams {
  path: string;
  message: string;
  content: unknown;
}
