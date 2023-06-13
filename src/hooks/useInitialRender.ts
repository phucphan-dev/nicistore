import { useEffect, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { useLocation } from 'react-router-dom';

import useDidMount from './useDidMount';
import useGaTracker from './useGaTracker';
import useTagManager from './useTagManager';

import { getAccessToken } from 'services/common/storage';
import { getProfileAction } from 'store/authenticate';
import { getCartDetailAction, loadCartLocal } from 'store/cart';
import { useAppDispatch } from 'store/hooks';
import { getProductCategoriesAction } from 'store/product';
import { LOCALSTORAGE } from 'utils/constants';
import { scrollToTop } from 'utils/functions';

const useInitialRender = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useGaTracker();
  useTagManager();
  useEffect(() => {
    scrollToTop();
  }, [location]);

  const initAnalytic = () => {
    ReactPixel.init('991387831870191', undefined, {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: false, // enable logs
    });
    ReactPixel.pageView();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      initAnalytic();
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  useDidMount(async () => {
    const token = getAccessToken();
    await dispatch(getProductCategoriesAction()).unwrap();
    if (token) {
      await dispatch(getProfileAction()).unwrap()
        .then(() => dispatch(getCartDetailAction()))
        .finally(() => setLoading(false));
    } else {
      const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);

      dispatch(loadCartLocal(cartLocal ? JSON.parse(cartLocal) : []));
      setLoading(false);
    }
  });
  return loading;
};

export default useInitialRender;
