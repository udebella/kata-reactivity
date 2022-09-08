export function createProxy(initialVariable, proxyHandler) {
    const copy = {...initialVariable};
    return Object.keys(initialVariable)
        .reduce((proxy, key) => {
            const toto = proxyHandler();
            return Object.defineProperty(proxy, key, {
                get: () => {
                    toto.get();
                    return copy[key];
                },
                set: (newValue) => {
                    toto.set(newValue);
                    copy[key] = newValue;
                },
                enumerable: true
            });
        }, {});
}
