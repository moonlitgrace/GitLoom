import { Config } from './types/config';

export const LOCAL_STORAGE_KEYS = {
  LAST_USED_REPO: 'gitloom:last-used-repo',
} as const;

export const CONFIG_PATH = '.gitloom/config.json';

export const DEFAULT_CONFIG = {
  $schema: 'https://cdn.jsdelivr.net/npm/@gitloom/config@1.0.1/schema.json',
  __v: '1.0.0',
  contentTypes: {},
} satisfies Config;
