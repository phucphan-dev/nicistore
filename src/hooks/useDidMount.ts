import { useEffect } from 'react';

const useDidMount = (callback: () => void): void => {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDidMount;
