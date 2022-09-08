import {describe, expect, it, mock} from "../deps.test.ts";

function createProxy(param, proxyHandler) {
    return {
        get a() {
            return proxyHandler().get()
        }
    };
}

describe('proxy', () => {
    it('works', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ a: 1 }, proxyHandler);

        console.log(proxy.a);

        expect(fakeGet).toHaveBeenCalled();
    });

    it('works 2', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ a: 1 }, proxyHandler);

        expect(fakeGet).not.toHaveBeenCalled();
    });
});
