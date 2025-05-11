import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import TabsNavigator, {TabsStackParamList} from './TabsNavigator';
import FavoriteScreen from '../screens/FavoriteScreen';
import {CartProvider} from '../components/CartProvider';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Welcome from '../screens/welcome';
import OrderConfirmation from '../components/OrderConfirmation';
export type StackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: {
    id: string;
  };
};
const Stack = createNativeStackNavigator<StackParamList>();
const RootNavigator = () => {
  return (
    <CartProvider>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabsStack"
          component={TabsNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen} // Assurez-vous d'importer correctement SignUpScreen
          options={{title: 'Inscription'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Détails du produit'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmation}
          options={{
            tabBarLabel: 'Confirmation',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="done" color={color} size={size} />
            ),
          }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
};
export default RootNavigator;
