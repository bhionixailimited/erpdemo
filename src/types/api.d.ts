export type APIOptsType = {
  path: string;
  body?: any;
  method?: RequestInit["method"];
  headers?: {
    [key: string]: string;
  };
  options?: RequestInit;
  token?: string;
  isImage?: boolean;
};

export type APIReturnType = {
  data: any;
  status: number;
  message: string;
  error: any;
  ACCESS_TOKEN?: any;
  res: any;
};

export type APIFunction = (APIOpts: APIOptsType) => Promise<APIReturnType>;
