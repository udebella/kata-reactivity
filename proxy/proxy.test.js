import {describe, expect, it, mock} from "../deps.test.ts";

function createProxy(param, proxyHandler) {
    return Object.keys(param)
        .reduce((proxy, key) => Object.defineProperty(proxy, key, {
            get: () => {
                proxyHandler().get();
                return param[key];
            },
            set: () => {
                proxyHandler().set();
            },
            enumerable: true
        }), {});
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

    it('calls proxy handler when accessing value from proxy 2', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ b: 1 }, proxyHandler);

        console.log(proxy.b);

        expect(fakeGet).toHaveBeenCalled();
    });

    it('calls proxy handler when accessing value from proxy 3', () => {
        const fakeGet = mock.fn();
        function proxyHandler() {
            return {
                get: fakeGet
            }
        }
        const proxy = createProxy({ b: 1 }, proxyHandler);

        expect(proxy).toEqual({ b: 1 });
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

    describe('set', () => {
        it('calls proxy handler when accessing value from proxy', () => {
            const fakeSet = mock.fn();
            function proxyHandler() {
                return {
                    set: fakeSet
                }
            }
            const proxy = createProxy({ a: 1 }, proxyHandler);

            proxy.a = 21;

            expect(fakeSet).toHaveBeenCalled();
        });
    });
});
