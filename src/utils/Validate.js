import Constants from '../constants/Constants';
import Validation from '../constants/Validation';

export function isNull(value) {
  if (value && value != null && value != 'null') {
    return value;
  } else {
    return '';
  }
}

export function isEmpty(value) {
  return value == null || value == '' || value == undefined;
}

export function isValidEmail(text) {
  return Constants.EMAIL_REGEX.test(text.trim());
}

export function isValidNumber(text) {
  return Constants.NUMBER_REGEX.test(text.trim());
}

export function isValidMobile(text) {
  return Constants.MOBILE_REGEX.test(text.trim());
}

export function isValidPercentage(text) {
  return Constants.NUMBER_OR_DECIMAL_REGEX.test(text);
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

export function isNumber(value) {
  var res = value.charAt(0);
  var res1 = Number.isInteger(parseInt(res));
  return res1;
}

export function isValidEmployeeID(value) {
  if (value.charAt(0) == 'D') {
    if (value.charAt(1) == 'R') {
      if (value.charAt(2) == 'I') {
        var res = value.split('DRI');
        if (Constants.CHARACTER_OR_NUMBER_REGEX.test(res[1])) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//=======1.String
//2.Minimum 8 chars,
//3.Maximum 10 chars,
//4.character, one lowercase and one uppercase character(This information should be shown to user in tooltips

export function isValidPassword(text) {
  return Constants.PASSWORD_REGEX.test(text);
}

export function isValidName(text) {
  return Constants.SIGNUP_NAME_REGEX.test(text.trim());
}
export function isValidStateRegex(text) {
  return Constants.STATE_REGEX.test(text.trim());
}

export function isValidFullName(text) {
  return Constants.FULLNAME_REGEX.test(text.trim());
}

export function isSubjectLength(text) {
  var TextLength = text.length.toString();
  if (TextLength > Constants.SUBJECT_MAX_LENGTH) {
    return false;
  } else {
    return true;
  }
}

export function isMessageLength(text) {
  var TextLength = text.length.toString();
  if (TextLength > Constants.MESSAGE_MAX_LENGTH) {
    return false;
  } else {
    return true;
  }
}

export function isValidPinCode(text) {
  return Constants.PIN_CODE_REGEX.test(text.trim());
}
export function isValidAddress(text) {
  return Constants.ADDRESS_REGEX.test(text.trim());
}

export function isUserName(text) {
  if (text === '') {
    let isValid = Validation.validName;
    let user = text;
    return [isValid, user];
  } else if (!isValidName(text)) {
    let isValid = Validation.validNameFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isUserFullName(text) {
  if (text === '') {
    let isValid = Validation.validName;
    let user = text;
    return [isValid, user];
  } else if (!isValidFullName(text)) {
    let isValid = Validation.validNameFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isValidState(text) {
  if (text === '') {
    let isValid = Validation.validState;
    let user = text;
    return [isValid, user];
  } else if (!isValidStateRegex(text)) {
    let isValid = Validation.validStateFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isValidLocality(text) {
  if (text === '') {
    let isValid = Validation.validCity;
    let user = text;
    return [isValid, user];
  } else if (!isValidName(text)) {
    let isValid = Validation.validLocalityFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isValidCity(text) {
  if (text === '') {
    let isValid = Validation.validCity;
    let user = text;
    return [isValid, user];
  } else if (!isValidStateRegex(text)) {
    let isValid = Validation.validCityFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isUserNumber(text) {
  if (text === '') {
    let isValid = Validation.validEmailMobile;
    let user = text;
    return [isValid, user];
  } else if (isNumber(text) && !isValidMobile(text)) {
    let isValid = Validation.validMobileFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isUserEmail(text) {
  if (text === '') {
    let isValid = Validation.validEmail;
    let user = text;
    return [isValid, user];
  } else if (!isValidEmail(text)) {
    let isValid = Validation.validEmailFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}

export function isUserEmailNumber(text) {
  if (text === '') {
    let isValid = Validation.validEmailMobileEmail;
    let user = text;
    return [isValid, user];
  } else if (isNumber(text) && !isValidMobile(text)) {
    let isValid = Validation.validMobileFormat;
    let user = text;
    return [isValid, user];
  } else if (!isNumber(text) && !isValidEmail(text)) {
    let isValid = Validation.validEmailFormat;
    let user = text;
    return [isValid, user];
  } else {
    let isValid = '';
    let user = text;
    return [isValid, user];
  }
}
export function isUserPassword(text) {
  if (text.replace(/\s/g, '') === '') {
    let isPassword = Validation.validPassword;
    let password = text;
    return [isPassword, password];
  } else if (!isValidPassword(text)) {
    let isPassword = Validation.validPasswordDetail;
    let password = text.replace(/\s/g, '');
    return [isPassword, password];
  } else if (isValidPassword(text)) {
    let isPassword = '';
    let password = text.replace(/\s/g, '');
    return [isPassword, password];
  }
}

export function isUserCnfPassword(value, password) {
  if (value == '') {
    let isCnfPassword = Validation.validConfirmPassword;
    let cnfPassword = value;
    return [isCnfPassword, cnfPassword];
  } else if (password != value) {
    let isCnfPassword = Validation.validConfirmPasswordLength;
    let cnfPassword = value.replace(/\s/g, '');
    return [isCnfPassword, cnfPassword];
  } else if (password == value) {
    let isCnfPassword = '';
    let cnfPassword = value.replace(/\s/g, '');
    return [isCnfPassword, cnfPassword];
  }
}

export function isOTPPassword(text) {
  if (text.replace(/\s/g, '') === '') {
    let isPassword = Validation.validOneTimePwd;
    let password = text;
    return [isPassword, password];
  } else if (text.length != 4) {
    let isPassword = Validation.validOneTimeLength;
    let password = text.replace(/\s/g, '');
    return [isPassword, password];
  } else {
    let isPassword = '';
    let password = text.replace(/\s/g, '');
    return [isPassword, password];
  }
}
