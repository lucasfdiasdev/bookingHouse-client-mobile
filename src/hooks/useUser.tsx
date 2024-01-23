import { useContext } from 'react';
import { useQueryClient } from 'react-query';
import * as SecureStore from 'expo-secure-store';

import { User } from "../types/user";
import { AuthContext } from '../context/context';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // const login = (user: User) => {
  //   let stringUser = JSON.stringify(user);
  //   setUser(user);
  //   SecureStore.setItemAsync("user", stringUser);
  //   queryClient.removeQueries();
  // };
};