import { describe, expect, it, mock } from "../deps.test.ts";
import { createObservable } from "./create-observable.js";

describe("Observer pattern", () => {
  it("works", () => {
    const observable = createObservable();
    const callback = mock.fn();
    observable.register(callback);

    observable.notify();

    expect(callback).toHaveBeenCalled();
  });

  it("works with multiple callbacks", () => {
    const observable = createObservable();
    const callback = mock.fn();
    const callback2 = mock.fn();
    observable.register(callback);
    observable.register(callback2);

    observable.notify();

    expect(callback).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });
});
