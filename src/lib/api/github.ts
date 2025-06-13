import { CONFIG_PATH } from '@/constants';
import {
  CheckRepoParams,
  CreateContentParams,
  FetchReposParams,
  ImportRepoConfigParams,
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

  // 404 case is handled separately
  if (!res.ok && res.status !== 404) {
    throw new Error(`GitHub API failed with: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches list of repos of the authenticated user from github.
 * Response is sorted by updated date and has per_page of 5.
 */
export async function fetchRepos({
  accessToken,
  username,
  query,
}: FetchReposParams): Promise<Repo[]> {
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
 * Checks wheather the repo if accessible or not.
 * Retruns a promise which resolves to a boolean value.
 */
export async function checkRepo({
  accessToken,
  username,
  repo,
}: CheckRepoParams): Promise<boolean> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}`;

  try {
    const res = await fetch(url, {
      headers: createAuthHeaders(accessToken),
    });

    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Imports the configuration file from the selected repo.
 * Retruns a Promise which resolves to the configuration or null (if not found any).
 */
export async function importRepoConfig({
  accessToken,
  username,
  repo,
}: ImportRepoConfigParams): Promise<unknown | null> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${CONFIG_PATH}`;

  try {
    const data = await fetchGitHub(url, accessToken);
    return data;
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
