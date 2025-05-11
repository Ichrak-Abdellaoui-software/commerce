import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

//import header
import Header from '../components/Header';

import {HomeContainer} from '../components/HomeContainer';

const Homescreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header
        title="Home"
        headerIcon="menu-sharp"
        onPressMenu={() => navigation.toggleDrawer()}
        onPressCart={() => navigation.navigate('Cart')}
      />
      <HomeContainer />
      <StoreContainer />
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
