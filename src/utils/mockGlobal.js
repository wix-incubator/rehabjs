export const mockGlobal = (key, implementation) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(global, key);

  Object.defineProperty(global, key, {
    get: () => implementation,
    set: () => {
      console.error(`[rehabjs] Attempt to reassign mocked global['${key}']`);
    },
    enumerable: true,
    configurable: true,
  });

  afterAll(() => {
    if (originalDescriptor) {
      Object.defineProperty(global, key, originalDescriptor);
    } else {
      delete global[key];
    }
  });
};
