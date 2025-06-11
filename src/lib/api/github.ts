import { FetchReposParams, ImportRepoParams, Repo } from '@/types/github';

export async function fetchRepos({
  accessToken,
  username,
  query,
}: FetchReposParams): Promise<Repo[]> {
  const url = `https://api.github.com/search/repositories?q=${query}+user:${username}&sort=updated&per_page=5`;
  const res = await fetch(url, {
    headers: {
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

export async function importRepo({
  accessToken,
  username,
  repo,
}: ImportRepoParams): Promise<unknown | null> {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/.gitloom/config.json`;
  const res = await fetch(url, {
    headers: {
      Accept: 'pplication/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status === 404) {
    // there is no config file
    console.log('.gitloom/config.json not found.');
    return null;
  }

  const data = await res.json();
  console.log(data);
  return data;
}
