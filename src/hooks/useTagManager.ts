import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { ANALYTICS } from 'utils/constants';

const useTagManager = () => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: ANALYTICS.GTM,
    });
  }, []);
};

export default useTagManager;
