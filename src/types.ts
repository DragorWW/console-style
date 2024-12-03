export interface StylePart {
  text: string;
  style: Record<string, string>;
}

export interface StyledResult {
  text: string;
  style: Record<string, string>;
  parts: StylePart[];
}

export type StyleFunction = (
  strings: TemplateStringsArray | string[],
  ...values: unknown[]
) => StyledResult;

export type ConsoleInput =
  | string
  | StylePart
  | StylePart[]
  | StyledResult
  | { parts: StylePart[] };
