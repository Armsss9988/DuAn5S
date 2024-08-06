/* eslint-disable */

import { useContext } from 'react';
import { NativeBaseProvider, View } from 'native-base';

import { theme, config } from '../utils/custom-theme';

import { AuthContext } from './services/AuthProvider';
import Login from '@/app';
import Home from '@/app/5S/home';

const AppNav = () => {
  const { token, isLoading } = useContext(AuthContext);
  return (
    <View>
      {token ? <Login /> : <Home />}
      </View>
  );
};

export default AppNav;
