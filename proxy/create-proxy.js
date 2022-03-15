export function createProxy(object, handlerBuilder) {
  return Object.keys(object).reduce((proxy, key) => {
    Object.defineProperty(proxy, key, handlerBuilder(object, key));
    return proxy;
  }, {});
}
