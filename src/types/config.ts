export interface Config {
  $schema: string;
  __v: string;
  contentTypes: {
    [key: string]: {
      path: string;
      extension: string;
    };
  };
}
