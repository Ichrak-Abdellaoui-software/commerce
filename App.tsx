import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './src/navigators/RootNavigator';

import {Provider} from 'react-redux';
import {store} from './src/redux';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </NavigationContainer>
    </View>

    // <AppNavigator />s
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 