'use strict';
//  Define All Route here
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import ContactList from '../containers/ContactList';
import HomeScreen from '../containers/Home';
import NavigationService, {
  navigationRef,
} from '../navigation/NavigationService';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      initialRouteName="Home">
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ContactList" component={ContactList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
