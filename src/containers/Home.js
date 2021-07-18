// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Button from '../components/button/Button';
import MediaSelectionAlertDialog from '../components/MediaSelectionAlertDialog';
import RoundShapeImage from '../components/RoundShapeImage';
import TextField from '../components/textField/TextField';
import Images from '../constants/Images';
import {Strings} from '../constants/Strings';
import Validation from '../constants/Validation';
import {pickSingle, pickSingleWithCamera} from '../utils/Util';
import {isUserEmail, isUserName, isUserNumber} from './../utils/Validate';

var db = openDatabase({name: 'UserDatabase.db'});
const mediaArray = [
  {
    name: 'Camera',
    id: 0,
    checked: false,
  },
  {
    name: 'Gallery',
    id: 1,
    checked: false,
  },
];
const HomeScreen = ({navigation}) => {
  let [email, setEmail] = useState(__DEV__ ? 'customer@gmail.com' : '');
  let [isEmail, setIsEmail] = useState('');
  let [firstName, setFirstName] = useState(__DEV__ ? 'John' : '');
  let [isFirstName, setIsFirstName] = useState('');
  let [lastName, setLastName] = useState(__DEV__ ? 'Billings' : '');
  let [isLastName, setIsLastName] = useState('');
  let [mobile, setMobile] = useState(__DEV__ ? '9988774455' : '');
  let [isMobile, setIsMobile] = useState('');
  let [isDialogVisible, setDialogVisible] = useState(false);

  let [imageUrl, setImageUrl] = useState('');
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
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);
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

  const onCloseDialog = () => {
    setDialogVisible(false);
  };
  const _imagePicker = name => {
    if (name == '1') {
      pickSingle(true).then(image => {
        if (image) {
          if (image.mime && image.mime == 'image/gif') {
            alert(Validation.validImage);
          } else {
            setImageUrl(image.path);
          }
        }
      });
    } else if (name == '0') {
      pickSingleWithCamera(true).then(image => {
        if (image) {
          setImageUrl(image.path);
        }
      });
    } else if (name === 'Cancel') {
      setImageUrl('');
    }
  };
  const _renderEditProfile = () => {
    return (
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
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
            returnKeyType={'next'}

            // editable={isSocialSignUpType && email ? false : true}
          />
          <Button
            onPress={() => {
              alert(2);
            }}
            buttonText={Strings.save}
          />
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
    </SafeAreaView>
  );
};

export default HomeScreen;
