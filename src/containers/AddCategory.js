// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Button from '../components/button/Button';
import TextField from '../components/textField/TextField';

import {Strings} from '../constants/Strings';
import NavigationService from '../navigation/NavigationService';
import {isUserName} from './../utils/Validate';

import Validation from '../constants/Validation';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
var db = openDatabase({name: 'UserDatabase.db'});

const AddCategory = ({props, navigation}) => {
  let [categoryName, setCategoryName] = useState('');
  let [isCategoryName, setIsCategoryName] = useState('');
  let [flatListItems, setFlatListItems] = useState([]);
  let [inputUserId, setInputUserId] = useState('');

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_category'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_category', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_category(category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_name VARCHAR(20))',
              [],
            );
          }
        },
      );
      Alert.alert('SQLite Database and Table Successfully Created...');
    });
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_category', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  };

  const onUserDetail = data => {
    setCategoryName(data.category_name);

    setInputUserId(data.category_id);
  };

  const onChangeCategoryName = text => {
    let [isValid, categoryName] = isUserName(text);
    setCategoryName(categoryName);
    setIsCategoryName(isValid);
  };

  const updateCategory = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_category set category_name=? where category_id=?',
        [categoryName, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setCategoryName('');
            setInputUserId('');
            getCategoryList();
          } else alert('Updation Failed');
        },
      );
    });
  };
  const addCategory = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_category (category_name) VALUES (?)',
        [categoryName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setCategoryName('');
            getCategoryList();
          } else alert('Registration Failed');
        },
      );
    });
  };
  const onPressEdit = inputUserId => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_category where category_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            setCategoryName(res.category_name);
            setInputUserId(res.category_id);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };
  const onDelete = inputUserId => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_category where category_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => getCategoryList(),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
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
  const onPressAddCategory = () => {
    if (categoryName === '' || isCategoryName !== '') {
      setIsCategoryName(
        categoryName === '' ? Validation.validName : isCategoryName,
      );
    } else {
      if (inputUserId) {
        updateCategory();
      } else {
        addCategory();
      }
    }
  };
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.DARK_CREAM,
        }}
      />
    );
  };
  let listItemView = ({item, index}) => {
    return (
      <View
        key={item.category_id}
        style={{
          backgroundColor: Colors.CREAM,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
            }}>{`${item.category_name}`}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressEdit(item.category_id)}>
          <Image style={{width: 20, height: 20}} source={Images.edit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDelete(item.category_id)}>
          <Image style={{width: 20, height: 20}} source={Images.delete} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: 20}}>
          <TextField
            placeholder={Strings.addCategory}
            value={categoryName}
            keyboardType={'name-phone-pad'}
            onChange={onChangeCategoryName}
            returnKeyType={'next'}
            maxLength={50}
            errorText={isCategoryName}
            // errorStyle={Styles.errorStyle}
            isMandatory={true}
            autoCapitalize="none"
          />

          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              flexDirection: 'row',
            }}>
            <Button onPress={onPressAddCategory} buttonText={Strings.save} />
          </View>
          <View style={{marginTop: 60}}>
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
      </View>
    </SafeAreaView>
  );
};

export default AddCategory;
