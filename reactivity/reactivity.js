import { createObservable } from "../observer/create-observable.js";
import { createProxy } from "../proxy/create-proxy.js";

export const globalEffects = [];

function createReactiveHandler(object, prop) {
  const observable = createObservable();
  return {
    get: () => {
      globalEffects.forEach(observable.register);
      return object[prop];
    },
    set: (value) => {
      object[prop] = value;
      observable.notify();
    },
  };
}

export function createEffect(effect) {
  globalEffects.push(effect);
  effect();
  globalEffects.pop();
}

export const createReactiveVariable = (variable) =>
  createProxy(variable, createReactiveHandler);
