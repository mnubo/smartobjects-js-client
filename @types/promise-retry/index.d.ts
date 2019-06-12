// Type definitions for promise-retry
// Project: https://github.com/IndigoUnited/node-promise-retry

declare function promiseRetry(
  fn: (retry: promiseRetry.Retry, attempt: number) => Promise<any>,
  opts?: promiseRetry.RetryOptions
): Promise<any>;

declare namespace promiseRetry {
  export interface RetryOptions {
    retries?: number;
    factor?: number;
    minTimeout?: number;
    maxTimeout?: number;
    randomize?: boolean;
  }

  export type Retry = () => Promise<any>;
}

declare module 'promise-retry' {
  export = promiseRetry;
}
