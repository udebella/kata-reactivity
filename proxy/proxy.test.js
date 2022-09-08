import {describe, expect, it, mock} from "../deps.test.ts";

function createProxy(param, proxyHandler) {
    return {
        get a() {
            proxyHandler().get();
            return param.a;
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

    it('works 3', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ a: 1 }, proxyHandler);

        expect(proxy.a).toBe(1);
    });
});
