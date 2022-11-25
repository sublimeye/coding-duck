import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function isObject(o: any): boolean {
  return o && typeof o === "object" && !Array.isArray(o);
}

function deepclone(a: any, b: any): Record<string, unknown> {
  if (!isObject(a) || !isObject(b)) return b;

  return Object.keys(b).reduce((merge, right) => ({
    ...merge,
    [right]: deepclone(merge[right], b[right]),
  }), { ...a });
}

Deno.test("deep clone", () => {
  const fn = deepclone;
  assertEquals(fn({ a: 10 }, { b: 10 }), { a: 10, b: 10 });
  assertEquals(fn({ a: 10 }, { a: 15 }), { a: 15 });
  assertEquals(fn({ a: { b: { c: "x" } } }, { a: { b: { d: "y" } } }), {
    a: { b: { c: "x", d: "y" } },
  });
  // assertEquals(fn(10, 20), 20)
  const a = { aa: 1, o: { cha: 50 }, z: 1 };
  const b = { bb: 1, z: { zz: 20 }, o: { bc: { bcc: 2 } } };
  assertEquals(fn(a, b), {
    aa: 1,
    o: {
      cha: 50,
      bc: {
        bcc: 2,
      },
    },
    bb: 1,
    z: {
      zz: 20,
    },
  });

  const target = { a: 1 };
  const source = { b: { c: 2 } };
  const targetCopy = JSON.parse(JSON.stringify(target));
  const sourceCopy = JSON.parse(JSON.stringify(source));
  const merged = fn(target, source);
  assertEquals(merged, { a: 1, b: { c: 2 } });
  assertEquals(target, targetCopy);
  assertEquals(source, sourceCopy);
});
