import { CONFIG_PATH } from '@/constants';
import { Config } from '@/types/config';
import {
  Content,
  CreateContentParams,
  GetFolderContents,
  GetRepoConfigParams,
  GetReposParams,
  LastCommit,
  Repo,
} from '@/types/github';

// constants
const GITHUB_API_BASE = 'https://api.github.com';
const COMMON_HEADERS = {
  Accept: 'application/vnd.github+json',
};

/**
 * Creates Authorization header and other COMMON_HEADERS with provided accessToken.
 * @param accessToken Token to generate Authorization header.
 */
function createAuthHeaders(accessToken: string | undefined): Record<string, string> {
  return {
    ...COMMON_HEADERS,
    Authorization: `Bearer ${accessToken}`,
  };
}

/**
 * Handles common fetch operations with error handling
 * @param url Github API url to fetch.
 * @param accessToken Token for creating auth headers.
 * @param options Optional request init options.
 */
async function fetchGitHub<T>(
  url: string,
  accessToken: string | undefined,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...createAuthHeaders(accessToken),
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`GitHub API failed with: ${res.statusText}`);
  return res.json();
}

/**
 * Fetches list of repos of the authenticated user from github.
 * Response is sorted by updated date and has per_page of 5.
 */
export async function getRepos({ accessToken, username, query }: GetReposParams): Promise<Repo[]> {
  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.set('q', `${query}+user:${username}`);
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('per_page', '5');

  const data = await fetchGitHub<{ items: Repo[] }>(
    decodeURIComponent(url.toString()),
    accessToken,
  );

  return data.items.map((repo: Repo) => ({
    id: repo.id,
    name: repo.name,
    private: repo.private,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
  }));
}

/**
 * Imports the configuration file from the selected repo.
 * Retruns a Promise which resolves to the configuration or null (if not found any).
 */
export async function getRepoConfig({
  accessToken,
  username,
  repo,
}: GetRepoConfigParams): Promise<Config | null> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${CONFIG_PATH}`;

  try {
    const data: { content: string } = await fetchGitHub(url, accessToken);
    const decodedContent = atob(data.content);
    return JSON.parse(decodedContent);
  } catch {
    return null;
  }
}

/**
 * Creates a file with content in the selected repo.
 * Retruns a Promise which resolves to a boolean value to indicate wheather the content is created or not.
 */
export async function createContent({
  accessToken,
  username,
  repo,
  path,
  content,
  message,
}: CreateContentParams): Promise<boolean> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${path}`;
  const base64Content = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: createAuthHeaders(accessToken),
      body: JSON.stringify({
        message,
        content: base64Content,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function getFolderContents({
  accessToken,
  username,
  repo,
  path,
}: GetFolderContents): Promise<Content[]> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${path}`;

  const data = await fetchGitHub(url, accessToken);
  // NOTE: define proper types
  return data as Content[];
}

export async function getLastCommit({
  accessToken,
  username,
  repo,
  path,
}: GetFolderContents): Promise<LastCommit> {
  const url = new URL(`${GITHUB_API_BASE}/repos/${username}/${repo}/commits`);
  url.searchParams.set('path', path);
  url.searchParams.set('per_page', '1');

  const data = await fetchGitHub<unknown>(decodeURIComponent(url.toString()), accessToken);
  // @ts-expect-error: TODO: add real GitHub types
  const commit = data[0];
  return {
    message: commit.commit.message,
    date: commit.commit.committer.date,
    sha: commit.sha,
  };
}
