import {describe, expect, it, mock} from "../deps.test.ts";

function createObservable() {
    let cb = undefined;
    return {
        register(callback) { cb = callback },
        notify() { cb() }
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

    it('does not call registered callback when observable does not notify', () => {
        const observable = createObservable();
        const fakeCallback = mock.fn();
        observable.register(fakeCallback);

        expect(fakeCallback).not.toHaveBeenCalled();
    });
});
