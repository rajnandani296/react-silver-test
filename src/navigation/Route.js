'use strict';
//  Define All Route here
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import AddCategory from '../containers/AddCategory';
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
      initialRouteName="AddCategory">
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
