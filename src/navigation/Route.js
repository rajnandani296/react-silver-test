'use strict';
//  Define All Route here
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../containers/Home';
import {navigationRef} from '../navigation/NavigationService';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer ref={navigationRef} initialRouteName="Home">
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
