import {describe, expect, it, mock} from "./deps.test.ts";
import {createProxy} from "./proxy/proxy.js";
import {createObservable} from "./observer/observer.js";

function createReactiveVariable(variable) {
    return createProxy(variable, () => {
        const observable = createObservable();
        return {
            get: () => {
                globalEffect.forEach((effect) => observable.register(effect));
            },
            set: () => {
                observable.notify()
            }
        };
    });
}

const globalEffect = [];
function createEffect(effect) {
    globalEffect.push(effect);
    effect();
    globalEffect.pop();
}

describe('reactivity', () => {
    it('works', () => {
        const variableReactive = createReactiveVariable({value: 1});
        const fakeEffect = mock.fn();
        createEffect(() => fakeEffect(variableReactive.value));

        variableReactive.value = 4;

        expect(fakeEffect).toHaveBeenCalled();
    });
});
