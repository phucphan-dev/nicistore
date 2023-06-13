import { useEffect } from 'react';
import ReactGA4 from 'react-ga4';
import { useLocation } from 'react-router-dom';

import { ANALYTICS } from 'utils/constants';

const useGaTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      ReactGA4.initialize(ANALYTICS.GA4);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    ReactGA4.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
};

export default useGaTracker;
