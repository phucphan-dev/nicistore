import { useEffect, useState } from 'react';
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

  useDidMount(async () => {
    const token = getAccessToken();
    await dispatch(getProductCategoriesAction()).unwrap();
    if (token) {
      await dispatch(getProfileAction()).unwrap()
        .then(() => dispatch(getCartDetailAction()))
        .finally(() => setLoading(false));
    } else {
      const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
      console.log({ cartLocal });

      dispatch(loadCartLocal(cartLocal ? JSON.parse(cartLocal) : []));
      setLoading(false);
    }
  });
  return loading;
};

export default useInitialRender;
