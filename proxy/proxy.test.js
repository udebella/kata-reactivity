import {describe, expect, it, mock} from "../deps.test.ts";

function createProxy(param, proxyHandler) {
    proxyHandler().get();
    return {... param};
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
});
