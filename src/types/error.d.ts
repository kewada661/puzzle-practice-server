declare global {
  interface Error {
    status: number;
  }

  interface ErrorConstructor {
    new (message?: string, status?: number): Error;
    (message?: string, status?: number): Error;
  }
}

export {};