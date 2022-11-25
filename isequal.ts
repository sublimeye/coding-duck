import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

// very naive implementation that won't work for a lot of built in objects e.g. Map, Blob, etc
function isObject(a: any): a is Record<string, unknown> {
  return a && (typeof a === "object") && !Array.isArray(a);
}

// symbol? blob? map? ...
function isEqual(a: unknown, b: unknown): boolean {
  const shallow = Object.is(a, b);

  if (shallow) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (const ka in a) {
      if (!isEqual(a[ka], b[ka])) return false;
    }
    return true;
  } else if (isObject(a) && isObject(b)) {
    if (!isEqual(Object.keys(a).sort(), Object.keys(b).sort())) return false;
    return Object.keys(a).every((key) => isEqual(a[key], b[key]));
  }

  return false;
}

Deno.test("isequal", () => {
  assertEquals(isEqual(true, true), true, "compare boolean");
  assertEquals(isEqual(false, true), false, "compare boolean");
  assertEquals(isEqual("oka", "oka"), true, "compare string");
  assertEquals(isEqual("oka", "okas"), false, "compare string");
  assertEquals(isEqual([5, 10], [5, 10]), true, "compare array");
  assertEquals(isEqual([5, 10], [5, 15]), false, "compare array");
  assertEquals(isEqual([], []), true, "compare array");
  assertEquals(isEqual(new Map(), new Map()), true, "maps");
  const [m1, m2] = [new Map(), new Map()];
  m1.set(10, "ok");
  m2.set(10, "ok");
  assertEquals(isEqual(new Map(), new Map()), true, "maps");
  assertEquals(isEqual(m1, m2), true, "maps");
  // m2.set(15, "no");
  // assertEquals(isEqual(m1, m2), false, "different maps");
  const a = { a: { b: { c: true } } };
  assertEquals(
    isEqual(a, a),
    true,
    "object 1",
  );
  assertEquals(
    isEqual({ a: { b: { c: true } } }, { a: { b: { c: true } } }),
    true,
    "object 2",
  );
  assertEquals(
    isEqual({ x: "ok", a: 1 }, { a: 1, x: "ok" }),
    true,
    "object 3",
  );
  assertEquals(isEqual(NaN, NaN), true, "NaN");
  const fn = () => {};
  assertEquals(isEqual(fn, fn), true, "fn reference");
});
