import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { ANALYTICS } from 'utils/constants';

const useTagManager = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      TagManager.initialize({
        gtmId: ANALYTICS.GTM,
      });
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
};

export default useTagManager;
