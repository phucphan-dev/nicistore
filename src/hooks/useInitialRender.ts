import useDidMount from './useDidMount';

import { getAccessToken } from 'services/common/storage';
import { getProfileAction } from 'store/authenticate';
import { useAppDispatch } from 'store/hooks';

const useInitialRender = () => {
  const dispatch = useAppDispatch();

  useDidMount(async () => {
    const token = getAccessToken();
    if (token) {
      dispatch(getProfileAction());
    }
  });
};

export default useInitialRender;
