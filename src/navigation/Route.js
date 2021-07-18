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
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../containers/DrawerContent';
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="AddCategory" component={AddCategory} />
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ContactList" component={ContactList} />
    </Drawer.Navigator>
  );
};
const Route = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      initialRouteName="AddCategory">
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
