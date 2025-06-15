// ===== variable types ======

export interface Repo {
  id: number;
  name: string;
  private: boolean;
  updated_at: string;
  html_url: string;
}

export interface Content {
  name: string;
  path: string;
  type: 'file' | 'dir';
  lastCommit: LastCommit;
}

export interface LastCommit {
  message: string;
  date: string;
  sha: string;
}

// ===== function params ======

interface BaseGithubParams {
  accessToken: string | undefined;
  username: string | undefined;
}

// for repo-specific operations
interface RepoOperationParams extends BaseGithubParams {
  repo: Repo['name'];
}

// for content-specific related operations
interface ContentOperationParams extends RepoOperationParams {
  path: string;
}

export interface GetReposParams extends BaseGithubParams {
  query: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetRepoConfigParams extends RepoOperationParams {}

export interface CreateContentParams extends ContentOperationParams {
  message: string;
  content: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetFolderContents extends ContentOperationParams {}
