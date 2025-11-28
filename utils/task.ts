export const microtask = (fn: () => void) => {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(fn);
    } else {
        Promise.resolve().then(fn);
    }
};
