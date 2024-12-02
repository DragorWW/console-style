export interface StylePart {
  text: string;
  style: Record<string, string>;
}

export interface StyledResult {
  text: string;
  style: Record<string, string>;
  parts: StylePart[];
}

export type ConsoleInput = string | StyledResult | StylePart[] | StylePart;
export type StyleFunction = (
  strings: string[] | TemplateStringsArray,
  ...values: unknown[]
) => StyledResult;
