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
  Keyboard,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Button from '../components/button/Button';
import TextField from '../components/textField/TextField';

import {Strings} from '../constants/Strings';
import NavigationService from '../navigation/NavigationService';
import {isCategoryNameValid} from './../utils/Validate';
import Toolbar from '../components/Toolbar';
import Validation from '../constants/Validation';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
import Constants from '../constants/Constants';
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
              'CREATE TABLE IF NOT EXISTS table_category(id INTEGER PRIMARY KEY AUTOINCREMENT, category_name VARCHAR(20))',
              [],
            );
          }
        },
      );
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

    setInputUserId(data.id);
  };

  const onChangeCategoryName = text => {
    let [isValid, categoryName] = isCategoryNameValid(text);
    setCategoryName(categoryName);
    setIsCategoryName(isValid);
  };

  const updateCategory = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_category set category_name=? where id=?',
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
          } else alert(Strings.somethingWentWrong);
        },
      );
    });
  };
  const onPressEdit = inputUserId => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_category where id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            setCategoryName(res.category_name);
            setInputUserId(res.id);
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
        'DELETE FROM  table_category where id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setInputUserId('');
            getCategoryList();
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
      'Are you sure you want to delete category?',
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
    Keyboard.dismiss();
    if (categoryName === '' || isCategoryName !== '') {
      setIsCategoryName(
        categoryName === '' ? Validation.validCategoryName : isCategoryName,
      );
    } else {
      if (inputUserId) {
        updateCategory();
      } else {
        addCategory();
      }
    }
  };
  const goBack = () => {
    NavigationService.goBack();
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
          backgroundColor: Colors.DARK_CREAM,
        }}
      />
    );
  };
  let listItemView = ({item, index}) => {
    return (
      <View
        key={item.id}
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
        <TouchableOpacity onPress={() => onPressEdit(item.id)}>
          <Image style={{width: 20, height: 20}} source={Images.edit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDelete(item.id)}>
          <Image style={{width: 20, height: 20}} source={Images.delete} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Toolbar
        navigationName={Constants.HOME_TOOL}
        goToBack={toggleDrawer}
        leftTextName={Strings.createAndStoreCategory}
      />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: 20}}>
          <TextField
            placeholder={Strings.addCategory}
            value={categoryName}
            keyboardType={'name-phone-pad'}
            onChange={onChangeCategoryName}
            returnKeyType={'done'}
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
