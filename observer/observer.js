export function createObservable() {
    const callbacks = [];
    return {
        register(callback) {
            callbacks.push(callback)
        },
        notify() {
            callbacks.forEach(cb => cb())
        }
    };
}
