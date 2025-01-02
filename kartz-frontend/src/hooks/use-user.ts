import { useAppSelector } from 'src/store';
import { IUserDetails } from 'src/types/user';

export const useUser = () => {
  const { userLogged, auth } = useAppSelector((state) => state.app);

  const userDetails: IUserDetails = auth?.data;

  // console.log('auth : ', auth)

  return {
    ...userDetails,
    userLogged,
    loading: auth?.loading,
  };
};