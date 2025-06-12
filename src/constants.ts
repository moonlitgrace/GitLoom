export const LOCAL_STORAGE_KEYS = {
  LAST_USED_REPO: 'gitloom:last-used-repo',
} as const;

export const CONFIG_PATH = '.gitloom/config.json';
export const DEFAULT_CONFIG = {
  version: '1.0.0',
  contents: [],
};
