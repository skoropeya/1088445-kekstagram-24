const debounce = (callback, immediateCallback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    immediateCallback.apply(this, rest);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce};
