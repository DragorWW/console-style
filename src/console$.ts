import { ConsoleInput, StylePart, StyledResult, StyleFunction } from "./types";

const CONSOLE_STYLE_PREFIX = "%c" as const;

export function console$(input: ConsoleInput): void {
  const parts: StylePart[] =
    typeof input === "string"
      ? [style({})`${input}`].flatMap((r: StyledResult) => r.parts)
      : "parts" in input
        ? input.parts
        : Array.isArray(input)
          ? input
          : [input];

  const [output, ...styles] = parts.reduce<[string, ...string[]]>(
    ([out, ...styles], part) => [
      out + CONSOLE_STYLE_PREFIX + part.text,
      ...styles,
      Object.entries(part.style)
        .map(
          ([k, v]) =>
            `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`
        )
        .join(";") || "",
    ],
    [""]
  );

  console.log(output, ...styles);
}

export function style(baseStyles: Record<string, string> = {}) {
  return (
    strings: TemplateStringsArray | string[],
    ...values: unknown[]
  ): StyledResult => {
    if (!Array.isArray(strings))
      return { text: "", style: baseStyles, parts: [] };

    const parts = strings.reduce<StylePart[]>((acc, str, i) => {
      if (str) acc.push({ text: str, style: baseStyles });

      const value = values[i];
      if (value && typeof value === "object" && "text" in value) {
        acc.push(value as StylePart);
      } else if (value !== undefined) {
        acc.push({ text: String(value), style: baseStyles });
      }

      return acc;
    }, []);

    return {
      text: parts.map((p) => p.text).join(""),
      style: baseStyles,
      parts,
    };
  };
}

export function _(...styles: StyleFunction[]) {
  return (
    strings: TemplateStringsArray | string[],
    ...values: unknown[]
  ): StyledResult => {
    const stringsArray =
      Array.isArray(strings) && "raw" in strings
        ? Array.from(strings)
        : strings;
    const result = styles[0](stringsArray, ...values);

    return {
      ...result,
      style: styles.reduce(
        (acc, fn) => ({ ...acc, ...fn([""]).style }),
        result.style
      ),
    };
  };
}
