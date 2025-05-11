import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialIcons';
import {HomeContainer} from '../components/HomeContainer';
import FavoriteScreen from '../screens/FavoriteScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type TabsStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'favorite' : 'favorite-outline';
          }

          return <Icons name={iconName} size={size} color={color} />;
        },
      })}>
      <TabsStack.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />

      <TabsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />

      <TabsStack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name="favorite" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};
export default TabsNavigator;

const Example = () => {
  return <View />;
};
