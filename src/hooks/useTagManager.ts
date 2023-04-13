import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { ANALYTICS } from 'utils/constants';

const useTagManager = () => {
  useEffect(() => {
    setTimeout(() => {
      TagManager.initialize({
        gtmId: ANALYTICS.GTM,
      });
    }, 2000);
  }, []);
};

export default useTagManager;
