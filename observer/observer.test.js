import {describe, expect, it, mock} from "../deps.test.ts";

function createObservable() {
    return {
        register(callback) { callback() },
        notify() {}
    };
}

describe('observer', () => {
    it('calls registered callback when observable notifies', () => {
        const observable = createObservable();
        const fakeCallback = mock.fn();
        observable.register(fakeCallback);

        observable.notify()

        expect(fakeCallback).toHaveBeenCalled();
    });
});
