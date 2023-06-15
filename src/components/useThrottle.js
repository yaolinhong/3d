export function useThrottle(func, delay) {
  let timeoutId;
  let lastExecutedTimestamp = 0;
  
  return function() {
    const context = this;
    const args = arguments;
    const currentTimestamp = Date.now();
    
    if (currentTimestamp - lastExecutedTimestamp > delay) {
      func.apply(context, args);
      lastExecutedTimestamp = currentTimestamp;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
        lastExecutedTimestamp = Date.now();
      }, delay - (currentTimestamp - lastExecutedTimestamp));
    }
  }
}