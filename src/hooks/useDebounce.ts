import { useRef, useEffect } from 'react';

const useDebounce = (callback: Function, timeout: number, deps: Array<string>): void => {
  const timeoutId = useRef<number | null>();

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(callback, timeout);

    return (): void => { if (timeoutId.current) { clearTimeout(timeoutId.current); } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
export default useDebounce;
