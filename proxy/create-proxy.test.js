import { describe, expect, it, mock } from "../deps.test.ts";
import { createProxy } from "./create-proxy.js";

const createHandler = (object, prop) => ({
  get: () => object[prop],
  set: (value) => object[prop] = value,
});

describe("Proxy", () => {
  ["a", "b"].forEach((prop) => {
    describe(prop, () => {
      it(`returns same value`, () => {
        const proxy = createProxy({ [prop]: 1 }, createHandler);

        const value = proxy[prop];

        expect(value).toBe(1);
      });

      it("calls proxy function when getting the value", () => {
        const fakeGet = mock.fn();
        const proxy = createProxy({ [prop]: 1 }, () => ({
          get: fakeGet,
        }));

        proxy[prop];

        expect(fakeGet).toHaveBeenCalled();
      });

      it("calls proxy function when setting the value", () => {
        const fakeSet = mock.fn();
        const proxy = createProxy({ [prop]: 1 }, () => ({
          set: fakeSet,
        }));

        proxy[prop] = 5;

        expect(fakeSet).toHaveBeenCalled();
      });

      it("returns updated value", () => {
        const proxy = createProxy({ [prop]: 1 }, createHandler);

        proxy[prop] = 5;

        expect(proxy[prop]).toBe(5);
      });
    });
  });
});
