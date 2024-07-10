export type Prettify<T extends Record<string, any>> = { [key in keyof T]: T[key] };
