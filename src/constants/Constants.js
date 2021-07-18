/**
 * Decalre all the constant keys and thier values here for using in throughout the app.
 */

import {Platform} from 'react-native';

export default Constants = {
  DEV: true,
  IS_LOG: true,
  NETWORK_CHECK: true,
  TOUCH_RADIUS: 20,
  TOUCH_OPACITY: 0.5,
  TOUCH_DURATION: 500,
  MALE: 'male',
  FEMALE: 'female',
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  MOBILE_REGEX: /^[0-9]\d{9}$|^[1-9]\d{5,15}$/,
  NUMBER_OR_DECIMAL_REGEX: /^(\d*\.)?\d+$/,
  NUMBER_REGEX: /^\d+$/,
  CHARACTER_OR_NUMBER_REGEX: /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{4,7}$/,

  NAME_REGEX: /[a-z]{1,50}$/,
  SIGNUP_NAME_REGEX: /[a-zA-z]{1,50}$/,
  FULLNAME_REGEX: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
  // PASSWORD_REGEX: /^(?=.*[a-zA-Z0-9])(?=.*[_$@.])[a-zA-Z0-9_$@.]{8,10}$/,
  // PASSWORD_REGEX: /^(?=.*[a-z])\S{8,10}$/,

  PASSWORD_REGEX: /^[ A-Za-z0-9_@./#&+-]{8,10}$/,

  PIN_CODE_REGEX: /^[1-9][0-9]{5}$/,
  ADDRESS_REGEX: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  STATE_REGEX: /^[a-zA-Z\s,.-]{2,}$/,

  DATE_FORMAT_APP: 'DD MMM,YYYY',
  TIME_FORMAT_APP: 'HH:MM A',
  SUBJECT_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 1000,
  USER_NAME_REGEX: /^(?!.*[ ]{2,})[\w@][-@,#,$\w]{2,25}$/,
  ALPHA_NUMERIC_SPECIAL_CHAR_REGEX: /^[ A-Za-z0-9_@./#&]*$/,
  ALPHA_NUMERIC: /^[ A-Za-z0-9]*$/,
  ALPHABATE: /^[a-zA-Z ]*$/,
  DESCRIPTION:
    /^[ a-zA-Z\r\n-_.$#@][><?@+'`~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w\s+]*$/,
  MONTH_DAY_YEAR_FORMAT: 'MM-D-Y',
  DATE_TIME_YESTERDAY_FORMAT: 'DD MMM, hh:mm A',
  SERVER_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  HOUR_FORMAT: 'hh:mm A',
  DATE_TIME_OLDER_FORMAT: 'DD MMM, YYYY hh:mm A',
  DATE_FORMAT: 'YYYY-MM-DD',
  RIGHT_MENU: 'RIGHT_MENU',
};

export const Validations = {
  validEmail: 'Email is required.',
  validMobileFormat: 'Please enter a valid mobile number',
  validEmailMobile: 'Please enter mobile number/employee Id',
  validEmailFormat: 'Enter valid email.',
};

export const appVersion = '1.0';

export const MediaTypes = {
  Camera: 0,
  Gallery: 1,
};

export const MediaArray = [
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
