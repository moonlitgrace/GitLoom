import { CONFIG_PATH } from '@/constants';
import {
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
async function fetchGithub<T>(
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
    throw new Error(`Github API failed with: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchRepos({
  accessToken,
  username,
  query,
}: FetchReposParams): Promise<Repo[]> {
  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.set('q', `${query}+user:${username}`);
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('per_page', '5');

  const data = await fetchGithub<{ items: Repo[] }>(url.toString(), accessToken);

  return data.items.map((repo: Repo) => ({
    id: repo.id,
    name: repo.name,
    private: repo.private,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
  }));
}

export async function checkRepo({
  accessToken,
  username,
  repo,
}: ImportRepoConfigParams): Promise<boolean> {
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

export async function importRepoConfig({
  accessToken,
  username,
  repo,
}: ImportRepoConfigParams): Promise<unknown | null> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${CONFIG_PATH}`;

  try {
    const data = await fetchGithub(url, accessToken);
    return data;
  } catch {
    return null;
  }
}

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
