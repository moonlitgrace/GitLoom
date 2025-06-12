import {
  CreateContentParams,
  FetchReposParams,
  ImportRepoConfigParams,
  Repo,
} from '@/types/github';

export async function fetchRepos({
  accessToken,
  username,
  query,
}: FetchReposParams): Promise<Repo[]> {
  const url = `https://api.github.com/search/repositories?q=${query}+user:${username}&sort=updated&per_page=5`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
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
  const url = `https://api.github.com/repos/${username}/${repo}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.ok;
}

export async function importRepoConfig({
  accessToken,
  username,
  repo,
}: ImportRepoConfigParams): Promise<unknown | null> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/.gitloom/config.json`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status === 404) {
    return null;
  }

  const data = await res.json();
  return data;
}

export async function createContent({
  accessToken,
  username,
  repo,
  path,
  content,
  message,
}: CreateContentParams): Promise<boolean> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const base64Content = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message,
      content: base64Content,
    }),
  });

  return res.ok;
}
