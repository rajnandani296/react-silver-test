import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import NavigationService from '../navigation/NavigationService';

const routes = [
  {
    id: 6,
    label: 'Add Category',
    routeName: 'AddCategory',
  },
  {
    id: 1,
    label: 'Add Contact',
    routeName: 'HomeScreen',
  },
  {
    id: 2,
    label: 'Contact List',
    routeName: 'ContactList',
  },
];

const MARGIN_LEFT = 18;

const DrawerContent = props => {
  const renderItem = ({item}) => {
    const {label} = item;
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item)}
        style={styles.listItem}>
        <Text selectable={false} style={styles.label}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const onItemPress = item => {
    NavigationService.navigate(item.routeName);
  };
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: Colors.LIGHT_GREEN,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={listViewItemSeparator}
      />
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bgImage: {
    height: 200,
    width: '100%',
  },
  listItem: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    color: Colors.WHITE,
    marginLeft: MARGIN_LEFT,
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: MARGIN_LEFT,
    tintColor: '#7d7d7d',
  },
  logOut: {},
  list: {
    paddingBottom: 25,
  },
});
