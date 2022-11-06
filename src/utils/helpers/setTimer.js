export const setTimer = (callback, delay) => {
  return setInterval(() => {
    callback();
    console.log('refreshing');
  }, delay);
};
