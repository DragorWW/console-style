import { ConsoleInput, StylePart, StyledResult, StyleFunction } from "./types";

const CONSOLE_STYLE_PREFIX = "%c" as const;

export function console$(
  strings: TemplateStringsArray | ConsoleInput,
  ...values: unknown[]
): void {
  if (Array.isArray(strings) && "raw" in strings) {
    const parts: StylePart[] = [];
    strings.forEach((str, i) => {
      if (str) parts.push({ text: String(str), style: {} });
      if (i < values.length) {
        const value = values[i];
        if (value && typeof value === "object" && "parts" in value) {
          parts.push(...(value as StyledResult).parts);
        } else if (value && typeof value === "object" && "text" in value) {
          parts.push(value as StylePart);
        } else if (value !== undefined) {
          parts.push({ text: String(value), style: {} });
        }
      }
    });
    console$({ parts } as ConsoleInput);
    return;
  }

  const parts: StylePart[] =
    typeof strings === "string"
      ? [{ text: strings, style: {} }]
      : "parts" in strings
        ? strings.parts
        : Array.isArray(strings)
          ? (strings as StylePart[])
          : [strings as StylePart];

  const [output, ...styles] = parts.reduce<[string, ...string[]]>(
    ([out, ...styles], part) => [
      out + CONSOLE_STYLE_PREFIX + part.text,
      ...styles,
      Object.entries(part.style || {})
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
    const combinedStyle = styles.reduce(
      (acc, fn) => ({ ...acc, ...fn([""]).style }),
      {}
    );

    return {
      ...result,
      style: combinedStyle,
      parts: result.parts.map((part) => ({
        ...part,
        style: { ...combinedStyle },
      })),
    };
  };
}
