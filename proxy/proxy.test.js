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
    it('calls proxy handler when accessing value from proxy', () => {
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

    it('does not call proxy handler when property is not accessed', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ a: 1 }, proxyHandler);

        expect(fakeGet).not.toHaveBeenCalled();
    });

    it('gives the value of the original object from the proxy', () => {
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
