export const createObservable = () => {
  const callbacks = [];
  return {
    register: (cb) => callbacks.push(cb),
    notify: () => callbacks.forEach((cb) => cb()),
  };
};
