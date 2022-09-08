import {describe, expect, it, mock} from "../deps.test.ts";
import {createProxy} from "./proxy.js";

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

    it('does not add properties on proxyfied objects', () => {
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
        it('calls proxy handler when modifying value on proxy', () => {
            const fakeSet = mock.fn();
            function proxyHandler() {
                return {
                    set: fakeSet
                }
            }
            const proxy = createProxy({ a: 1 }, proxyHandler);

            proxy.a = 21;

            expect(fakeSet).toHaveBeenCalledWith(21);
        })

        it('updates proxy value when modifying property', () => {
            const fakeSet = mock.fn();
            function proxyHandler() {
                return {
                    get: mock.fn(),
                    set: fakeSet
                }
            }
            const proxy = createProxy({ a: 1 }, proxyHandler);

            proxy.a = 21;

            expect(proxy).toEqual({ a: 21 });
        });

        it('does not update initial value when proxy is modified', () => {
            const fakeSet = mock.fn();
            function proxyHandler() {
                return {
                    get: mock.fn(),
                    set: fakeSet
                }
            }
            const param = { a: 1 };
            const proxy = createProxy(param, proxyHandler);

            proxy.a = 21;

            expect(param).toEqual({ a: 1 });
        });
    });
});
