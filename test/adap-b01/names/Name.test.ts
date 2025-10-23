import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Initialization edge cases", () => {
  it("should create a Name with empty component list", () => {
    const n = new Name([]);
    expect(n.getNoComponents()).toBe(0);
    expect(n.asString()).toBe("");
  });

  it("should throw if constructed with non-array", () => {
    // @ts-expect-error - simulate wrong type
    expect(() => new Name("oss.cs.de")).toThrow();
  });

  it("should use custom delimiter if provided", () => {
    const n = new Name(["a", "b", "c"], "/");
    expect(n.asString()).toBe("a/b/c");
  });
});

describe("Getter and Setter behavior", () => {
  it("should return correct component by index", () => {
    const n = new Name(["a", "b", "c"]);
    expect(n.getComponent(1)).toBe("b");
  });

  it("should throw on invalid get index", () => {
    const n = new Name(["a", "b"]);
    expect(() => n.getComponent(5)).toThrow();
  });

  it("should set component correctly", () => {
    const n = new Name(["a", "b", "c"]);
    n.setComponent(1, "x");
    expect(n.asString()).toBe("a.x.c");
  });

  it("should throw on invalid set index", () => {
    const n = new Name(["a", "b"]);
    expect(() => n.setComponent(2, "x")).toThrow();
  });
});

describe("Insert, append, and remove tests", () => {
  it("should insert at start", () => {
    const n = new Name(["b", "c"]);
    n.insert(0, "a");
    expect(n.asString()).toBe("a.b.c");
  });

  it("should insert at end", () => {
    const n = new Name(["a", "b"]);
    n.insert(2, "c");
    expect(n.asString()).toBe("a.b.c");
  });

  it("should throw on invalid insert index", () => {
    const n = new Name(["a"]);
    expect(() => n.insert(-1, "b")).toThrow();
    expect(() => n.insert(5, "b")).toThrow();
  });

  it("should append correctly", () => {
    const n = new Name(["a", "b"]);
    n.append("c");
    expect(n.asString()).toBe("a.b.c");
  });

  it("should remove component", () => {
    const n = new Name(["a", "b", "c"]);
    n.remove(1);
    expect(n.asString()).toBe("a.c");
  });

  it("should throw on invalid remove index", () => {
    const n = new Name(["a"]);
    expect(() => n.remove(2)).toThrow();
  });
});

describe("Escaping behavior", () => {
  it("should escape delimiter correctly in asDataString", () => {
    const n = new Name(["a.b", "c"]);
    expect(n.asDataString()).toBe("a\\.b.c");
  });

  it("should escape escape character itself", () => {
    const n = new Name(["a\\b", "c"]);
    expect(n.asDataString()).toBe("a\\\\b.c");
  });

  it("should handle multiple special chars", () => {
    const n = new Name(["a.b\\c", "d"]);
    expect(n.asDataString()).toBe("a\\.b\\\\c.d");
  });
});

describe("Empty and special component behavior", () => {
  it("should handle empty string components", () => {
    const n = new Name(["", "b", ""]);
    expect(n.asString()).toBe(".b.");
    expect(n.getNoComponents()).toBe(3);
  });

  it("should handle only escape character", () => {
    const n = new Name(["\\"]);
    expect(n.asDataString()).toBe("\\\\");
  });
});

describe("Delimiter variations", () => {
  it("should allow displaying with a different delimiter", () => {
    const n = new Name(["a", "b", "c"]);
    expect(n.asString("/")).toBe("a/b/c");
  });

  it("should not modify internal delimiter when using custom asString", () => {
    const n = new Name(["a", "b"], "#");
    n.asString(".");
    expect(n.asString()).toBe("a#b"); 
  });
});
