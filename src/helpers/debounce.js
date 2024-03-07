export const debounce = (fn, timeout = 100) => {
  let timer;
  return function (event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, timeout, event);
  };
};
