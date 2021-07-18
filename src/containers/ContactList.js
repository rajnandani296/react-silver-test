import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Toolbar from '../components/Toolbar';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import {Strings} from '../constants/Strings';
import NavigationService from '../navigation/NavigationService';

var db = openDatabase({name: 'UserDatabase.db'});

const ContactList = ({navigation, route}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const getUserList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];

        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  };
  const onPressEdit = inputUserId => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);

            route.params.onUserDetail(res);
            NavigationService.goBack();
          } else {
            alert(Strings.somethingWentWrong);
          }
        },
      );
    });
  };
  const onDelete = inputUserId => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            getUserList();
          } else {
            alert(Strings.somethingWentWrong);
          }
        },
      );
    });
  };
  const onPressDelete = inputUserId => {
    Alert.alert(
      'Alert',
      'Are you sure you want to delte contact?',
      [
        {
          text: 'Ok',
          onPress: () => onDelete(inputUserId),
        },
      ],
      {cancelable: false},
    );
  };
  const toggleDrawer = () => {
    //Props to open/close the drawer

    navigation.toggleDrawer();
  };
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.LIGHT_GREEN,
        }}
      />
    );
  };

  let listItemView = ({item, index}) => {
    return (
      <View
        key={item.user_id}
        style={{
          backgroundColor: 'white',
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={
                item.imagem
                  ? {
                      uri: item.imagem,
                    }
                  : Images.profile
              }
              style={{
                height: 45,
                width: 45,
                borderRadius: 45 / 2,
                borderColor: Colors.LIGHT_GREEN,
                borderWidth: 2,
              }}
            />
          </View>
          <Text
            style={{
              paddingHorizontal: 10,
            }}>{`${item.user_first_name} ${item.user_last_name}`}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressEdit(item.user_id)}>
          <Image style={{width: 20, height: 20}} source={Images.edit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDelete(item.user_id)}>
          <Image style={{width: 20, height: 20}} source={Images.delete} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Toolbar
          goToBack={toggleDrawer}
          showSearch={true}
          leftTextName={Strings.contactList}
        />
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            extraData={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={listItemView}
            bounces={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={false}
            disableVirtualization={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactList;
