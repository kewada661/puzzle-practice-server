import { StatusError as CustomError } from "../utils/handleError.ts";

declare global {
  interface Error {
    message?: string;
    status?: number;
  }

  declare var Error: ErrorConstructor;

  type StatusError = CustomError;

  var StatusError: typeof CustomError;
}

export {};