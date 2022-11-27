// the api
// const debouncedScroll = debounce(onScroll, 500)

function debounce(fn: (a: any) => any, delay: number) {
  let timeout: number;
  return (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
let d = debounce((word, is) => console.log(word, is), 1000);
document.addEventListener("click", () => d("click", "clack"));

function throttle(fn, delay) {
  let timeout;
  return (...args) => {
    if (timeout) return;

    fn(...args);
    timeout = setTimeout(() => {
      timeout = undefined;
    }, delay);
  };
}

let d = throttle(() => console.log("move"), 1000);
document.addEventListener("mousemove", d);
