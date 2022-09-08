import {describe, expect, it, mock} from "../deps.test.ts";

function createObservable() {
    const callbacks = [];
    return {
        register(callback) { callbacks.push(callback) },
        notify() { callbacks.forEach(cb => cb()) }
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

    it('allows registering multiple callback', () => {
        const observable = createObservable();
        const fakeCallback = mock.fn();
        observable.register(fakeCallback);
        const fakeCallback2 = mock.fn();
        observable.register(fakeCallback2);

        observable.notify()

        expect(fakeCallback).toHaveBeenCalled();
        expect(fakeCallback2).toHaveBeenCalled();
    });
});
