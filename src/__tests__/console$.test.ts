import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { console$, style, _ } from "../console$";

describe("console$", () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should handle simple string input", () => {
    console$("test message");
    expect(consoleLogSpy).toHaveBeenCalledWith("%ctest message", "");
  });

  it("should apply styles correctly", () => {
    console$(style({ color: "red" })`test message`);
    expect(consoleLogSpy).toHaveBeenCalledWith("%ctest message", "color:red");
  });

  it("should handle multiple style parts", () => {
    console$([
      { text: "red ", style: { color: "red" } },
      { text: "blue", style: { color: "blue" } },
    ]);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "%cred %cblue",
      "color:red",
      "color:blue"
    );
  });
});

describe("style function", () => {
  it("should create styled text", () => {
    const result = style({ color: "red" })`test`;
    expect(result).toEqual({
      text: "test",
      style: { color: "red" },
      parts: [{ text: "test", style: { color: "red" } }],
    });
  });

  it("should handle interpolation", () => {
    const value = "world";
    const result = style({ color: "red" })`hello ${value}`;
    expect(result.text).toBe("hello world");
  });
});

describe("_ function", () => {
  it("should combine multiple styles", () => {
    const redBold = _(
      style({ color: "red" }),
      style({ fontWeight: "bold" })
    )`test`;

    expect(redBold.style).toEqual({
      color: "red",
      fontWeight: "bold",
    });
  });
});
