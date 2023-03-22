import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useDidMount from './useDidMount';

import { getAccessToken } from 'services/common/storage';
import { getProfileAction } from 'store/authenticate';
import { useAppDispatch } from 'store/hooks';
import { scrollToTop } from 'utils/functions';

const useInitialRender = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, [location]);

  useDidMount(async () => {
    const token = getAccessToken();
    if (token) {
      setLoading(true);
      await dispatch(getProfileAction()).unwrap().finally(() => setLoading(false));
      setLoading(false);
    }
  });
  return loading;
};

export default useInitialRender;
