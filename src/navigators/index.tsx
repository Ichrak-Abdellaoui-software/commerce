import React from 'react';
import {useAuth} from '../hooks/useAuth';
import RootNavigator from './RootNavigator';
import TabsNavigator from './TabsNavigator';

export default function RootNavigation() {
  const {user} = useAuth();

  return user ? <RootNavigation /> : <TabsNavigator />;
}
