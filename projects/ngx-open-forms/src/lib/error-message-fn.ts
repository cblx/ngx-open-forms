export type ErrorMessageFn = (errorData?: any) => string;
export type ErrorMessages = { [key: string]: ErrorMessageFn | string };