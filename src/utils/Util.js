import ImagePicker from 'react-native-image-crop-picker';
import Constants from '../constants/Constants';

import Metrics from '../constants/Metrics';

export function getWidth(perValue) {
  var width = (Metrics.screenWidth * perValue) / 100;
  return width;
}

export function getHeight(perValue) {
  var height = (Metrics.screenHeight * perValue) / 100;
  return height;
}

export function isNull(value) {
  if (value && value != null && value != 'null') {
    return value;
  } else {
    return '';
  }
}

export function isNumber(value) {
  var res = value.charAt(0);
  var res1 = Number.isInteger(parseInt(res));
  return res1;
}

export function isEmpty(value) {
  return value == null || value == '' || value == undefined;
}

export function isValidEmail(text) {
  return Constants.EMAIL_REGEX.test(text);
}

export function isValidNumber(text) {
  return Constants.NUMBER_REGEX.test(text);
}

export function isValidMobile(text) {
  return Constants.MOBILE_REGEX.test(text);
}

export function capitalize(text) {
  var uppercaseFirstLetter = '';
  if (text) {
    uppercaseFirstLetter =
      String(text).charAt(0).toUpperCase() + String(text).slice(1);
  }
  return uppercaseFirstLetter;
}

export function isArray(input) {
  return (
    input instanceof Array ||
    Object.prototype.toString.call(input) === '[object Array]'
  );
}

export function isObject(input) {
  return (
    input != null && Object.prototype.toString.call(input) === '[object Object]'
  );
}
export function capital_letter(str) {
  if (str) {
    str = str.split(' ');

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  } else {
    return '';
  }
}
export function printConsole(TAG = 'TAG', param = 'param') {
  if (Constants.DEV) {
    console.log(TAG, param);
  }
}
export function pickSingle(cropit, circular = false, mediaType) {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      mediaType: 'photo',
    }).then(
      image => {
        printConsole('received image', image);
        image ? resolve(image) : reject('error');
      },
      error => printConsole(error),
    );
  });
}
export function pickSingleWithCamera(cropping, mediaType = 'photo') {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    }).then(
      image => {
        printConsole('received image', image);
        image ? resolve(image) : reject('error');
      },
      error => printConsole(error),
    );
  });
}
