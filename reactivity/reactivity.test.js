import { describe, expect, it } from "../deps.test.ts";
import { createEffect, createReactiveVariable } from "./reactivity.js";

describe("Vue reactivity", () => {
  it("applies effect when created", () => {
    const a = createReactiveVariable({ value: 1 });
    const b = createReactiveVariable({ value: 2 });
    const result = createReactiveVariable({ value: 0 });

    createEffect(() => result.value = a.value + b.value);

    expect(result.value).toBe(3);
  });

  it("applies effect when dependent value changes", () => {
    const a = createReactiveVariable({ value: 1 });
    const b = createReactiveVariable({ value: 2 });
    const result = createReactiveVariable({ value: 0 });
    createEffect(() => result.value = a.value + b.value);

    a.value = 5;

    expect(result.value).toBe(7);
  });

  it("applies effect each time a dependent value changes", () => {
    const a = createReactiveVariable({ value: 1 });
    const b = createReactiveVariable({ value: 2 });
    const result = createReactiveVariable({ value: 0 });
    createEffect(() => result.value = a.value + b.value);

    a.value = 5;
    b.value = 5;

    expect(result.value).toBe(10);
  });

  it("triggers multiple effect in cascade", () => {
    const a = createReactiveVariable({ value: 1 });
    const b = createReactiveVariable({ value: 2 });
    const result = createReactiveVariable({ value: 0 });
    const result2 = createReactiveVariable({ value: 0 });
    createEffect(() => result.value = a.value + b.value);
    createEffect(() => result2.value = result.value);

    a.value = 5;

    expect(result2.value).toBe(7);
  });
});
