export function createProxy(initialVariable, proxyHandler) {
    const copy = {...initialVariable};
    return Object.keys(initialVariable)
        .reduce((proxy, key) => Object.defineProperty(proxy, key, {
            get: () => {
                proxyHandler().get();
                return copy[key];
            },
            set: (newValue) => {
                proxyHandler().set(newValue);
                copy[key] = newValue;
            },
            enumerable: true
        }), {});
}
