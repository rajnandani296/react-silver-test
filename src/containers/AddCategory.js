// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Button from '../components/button/Button';
import TextField from '../components/textField/TextField';
import {Validations} from '../constants/Constants';
import {Strings} from '../constants/Strings';
import NavigationService from '../navigation/NavigationService';
import {isUserName} from './../utils/Validate';

var db = openDatabase({name: 'UserDatabase.db'});

const AddCategory = ({props, navigation}) => {
  let [categoryName, setCategoryName] = useState('');
  let [isCategoryName, setIsCategoryName] = useState('');

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
              'CREATE TABLE IF NOT EXISTS table_category(category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_name VARCHAR(20)',
              [],
            );
          }
        },
      );
      Alert.alert('SQLite Database and Table Successfully Created...');
    });
  }, []);

  const onUserDetail = data => {
    setCategoryName(data.category_name);

    setInputUserId(data.category_id);
  };

  const onChangeTextFirstName = text => {
    let [isValid, categoryName] = isUserName(text);
    alert(isValid);
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
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () =>
                    NavigationService.navigate('ContactList', {
                      onUserDetail: onUserDetail,
                    }),
                },
              ],
              {cancelable: false},
            );
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
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () =>
                    NavigationService.navigate('ContactList', {
                      onUserDetail: onUserDetail,
                    }),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };
  const onPressAddCategory = () => {
    if (categoryName === '' || isCategoryName !== '') {
      setIsCategoryName(
        categoryName === '' ? Validations.validName : isCategoryName,
      );
    } else {
      if (inputUserId) {
        updateCategory();
      } else {
        addCategory();
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: 20}}>
          <TextField
            placeholder={Strings.categoryName}
            value={categoryName}
            keyboardType={'name-phone-pad'}
            onChange={onChangeTextFirstName}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCategory;
