// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Button from '../components/button/Button';
import MediaSelectionAlertDialog from '../components/MediaSelectionAlertDialog';
import RoundShapeImage from '../components/RoundShapeImage';
import TextField from '../components/textField/TextField';
import Toolbar from '../components/Toolbar';
import Images from '../constants/Images';
import {Strings} from '../constants/Strings';
import Validation from '../constants/Validation';
import NavigationService from '../navigation/NavigationService';
import {pickSingle, pickSingleWithCamera} from '../utils/Util';
import {
  isCategoryName,
  isUserEmail,
  isUserName,
  isUserNumber,
} from './../utils/Validate';

var db = openDatabase({name: 'UserDatabase.db'});
const mediaArray = [
  {
    category_name: 'Camera',
    id: 1,
    checked: false,
  },
  {
    category_name: 'Gallery',
    id: 2,
    checked: false,
  },
];
const HomeScreen = ({props, navigation}) => {
  let [email, setEmail] = useState('');
  let [isEmail, setIsEmail] = useState('');
  let [firstName, setFirstName] = useState('');
  let [isFirstName, setIsFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [isLastName, setIsLastName] = useState('');
  let [mobile, setMobile] = useState('');
  let [isMobile, setIsMobile] = useState('');
  let [isCategory, setIsCategory] = useState('');
  let [isDialogVisible, setDialogVisible] = useState(false);
  let [isCategoryDialogVisible, setCategoryDialogVisible] = useState(false);

  let [inputUserId, setInputUserId] = useState('');
  let [imageUrl, setImageUrl] = useState('');
  let [category, setCategory] = useState('');
  let [flatListItems, setFlatListItems] = useState([]);
  const mEmailRef = useRef();
  const mFirstnameRef = useRef();
  const mLastNameRef = useRef();
  const mMobileNumberRef = useRef();
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_first_name VARCHAR(100), user_last_name VARCHAR(100), user_contact INT(10), user_address VARCHAR(255),imagem BLOB,user_cat VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategoryList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const onUserDetail = data => {
    setEmail(data.user_address);
    setFirstName(data.user_first_name);
    setLastName(data.user_last_name);
    setMobile(`${data.user_contact}`);

    setImageUrl(data.imagem);
    setInputUserId(data.user_id);
  };
  const onChangeTextEmail = text => {
    let [isValid, email] = isUserEmail(text);
    setEmail(email);
    setIsEmail(isValid);
  };
  const onChangeTextFirstName = text => {
    let [isValid, firstName] = isUserName(text);
    setFirstName(firstName);
    setIsFirstName(isValid);
  };
  const onChangeTextLastName = text => {
    let [isValid, lastName] = isUserName(text);
    setLastName(lastName);
    setIsLastName(isValid);
  };
  const onChangeTextMobileNumber = text => {
    let [isValid, mobile] = isUserNumber(text.replace(/[^0-9]+/g, ''));
    setMobile(mobile);
    setIsMobile(isValid);
  };
  const _onPressEditProfile = () => {
    setDialogVisible(true);
  };
  const onSelectedMedia = index => {
    setDialogVisible(false);
    _imagePicker(index);
  };
  const onSelectedCategorySelected = index => {
    setCategoryDialogVisible(false);
    flatListItems.map(item => {
      if (item.id == index) {
        setCategory(item.category_name);
        setIsCategory('');
      }
    });
  };
  const onCategoryCloseDialog = () => {
    setCategoryDialogVisible(false);
  };
  const onCloseDialog = () => {
    setDialogVisible(false);
  };
  const _imagePicker = name => {
    if (name == '2') {
      pickSingle(true).then(image => {
        if (image) {
          if (image.mime && image.mime == 'image/gif') {
            alert(Validation.validImage);
          } else {
            setImageUrl(image.path);
          }
        }
      });
    } else if (name == '1') {
      pickSingleWithCamera(true).then(image => {
        if (image) {
          setImageUrl(image.path);
        }
      });
    } else if (name === 'Cancel') {
      setImageUrl('');
    }
  };
  const updateContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_first_name=?, user_last_name=?,user_contact=? , user_address=?,imagem=?,user_cat=? where user_id=?',
        [firstName, lastName, mobile, email, imageUrl, category, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    resetContact();

                    NavigationService.navigate('ContactList', {
                      onUserDetail: onUserDetail,
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };
  const resetContact = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setMobile(``);
    setCategory('');
    setImageUrl('');
    setInputUserId('');
  };
  const getCategoryList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_category', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        if (temp && temp.length > 0) {
          setFlatListItems(temp);
        } else {
          Alert.alert(
            'Alert',
            'Please Add category first',
            [
              {
                text: 'Ok',
                onPress: () => {
                  NavigationService.navigate('AddCategory');
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    });
  };
  const addContact = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_first_name,user_last_name, user_contact, user_address,imagem,user_cat) VALUES (?,?,?,?,?,?)',
        [firstName, lastName, mobile, email, imageUrl, category],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    resetContact();
                    NavigationService.navigate('ContactList', {
                      onUserDetail: onUserDetail,
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };
  const onPressAddContact = () => {
    Keyboard.dismiss();
    if (
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      mobile === '' ||
      isEmail !== '' ||
      isFirstName !== '' ||
      isLastName !== '' ||
      isMobile !== '' ||
      category == ''
    ) {
      setIsCategory(Validations.validCategory);
      setIsEmail(email === '' ? Validations.validEmail : isEmail);
      setIsFirstName(firstName === '' ? Validations.validName : isFirstName);
      setIsLastName(lastName === '' ? Validations.validName : isLastName);
      setIsMobile(mobile === '' ? Validations.validMobileNumber : isMobile);
    } else if (imageUrl == '') {
      alert('Please select profile image');
    } else {
      if (inputUserId) {
        updateContact();
      } else {
        addContact();
      }
    }
  };
  const toggleDrawer = () => {
    //Props to open/close the drawer

    navigation.toggleDrawer();
  };

  const _renderEditProfile = () => {
    return (
      <View style={{marginBottom: 30}}>
        <RoundShapeImage
          size={80}
          onPress={_onPressEditProfile}
          editIcon={true}
          source={
            imageUrl
              ? {
                  uri: imageUrl,
                }
              : Images.profile
          }
          defaultSource={Images.profile}
        />
      </View>
    );
  };
  const handleCategoryClick = () => {
    setCategoryDialogVisible(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Toolbar goToBack={toggleDrawer} leftTextName={Strings.addContact} />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: 20}}>
          {_renderEditProfile()}
          <TextField
            ref={mFirstnameRef}
            placeholder={Strings.firstName}
            value={firstName}
            keyboardType={'name-phone-pad'}
            onChange={onChangeTextFirstName}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              mLastNameRef.current.focus();
            }}
            maxLength={50}
            errorText={isFirstName}
            // errorStyle={Styles.errorStyle}
            isMandatory={true}
            autoCapitalize="none"
          />
          <TextField
            ref={mLastNameRef}
            placeholder={Strings.lastName}
            value={lastName}
            errorText={isLastName}
            keyboardType={'name-phone-pad'}
            onChange={onChangeTextLastName}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              mMobileNumberRef.current.focus();
            }}
            maxLength={50}
          />
          <TextField
            ref={mMobileNumberRef}
            placeholder={Strings.mobileNum}
            value={mobile}
            errorText={isMobile}
            keyboardType={'numeric'}
            onChange={onChangeTextMobileNumber}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              mEmailRef.current.focus();
            }}
            maxLength={10}
            countryCode={true}
          />
          <TextField
            ref={mEmailRef}
            placeholder={Strings.emailAdd}
            value={email}
            errorText={isEmail}
            autoCapitalize="none"
            keyboardType={'name-phone-pad'}
            onChange={onChangeTextEmail}
            returnKeyType={'done'}

            // editable={isSocialSignUpType && email ? false : true}
          />
          <TouchableOpacity onPress={handleCategoryClick}>
            <TextField
              ref={mEmailRef}
              placeholder={Strings.category}
              value={category}
              errorText={isCategory}
              autoCapitalize="none"
              keyboardType={'name-phone-pad'}
              returnKeyType={'done'}
              editable={false}
              rightImageSource={Images.downarrow}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              flexDirection: 'row',
            }}>
            <Button onPress={onPressAddContact} buttonText={Strings.save} />
          </View>
        </View>
      </View>
      <MediaSelectionAlertDialog
        isModalVisible={isDialogVisible}
        title={Strings.select}
        dataArray={mediaArray}
        onDateSelected={onSelectedMedia}
        buttonOneText={Strings.okay}
        dismiss={onCloseDialog}
      />
      <MediaSelectionAlertDialog
        isModalVisible={isCategoryDialogVisible}
        title={Strings.selectCategory}
        dataArray={flatListItems}
        onDateSelected={onSelectedCategorySelected}
        buttonOneText={Strings.okay}
        dismiss={onCategoryCloseDialog}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
