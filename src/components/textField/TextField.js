import React, {PureComponent} from 'react';

import {TextInput, View, Text, Image} from 'react-native';
import Styles from './Style';
import PropTypes from 'prop-types';
import styles from './Style';
import Colors from '../../constants/Colors';

export default class TextField extends PureComponent {
  state = {
    backgroundColor: Colors.WHITE,
  };
  onFocus() {
    this.setState({
      backgroundColor: 'green',
    });
  }

  onBlur() {
    this.setState({
      backgroundColor: '#ededed',
    });
  }
  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  render() {
    return (
      <View style={this.props.inputContainerStyle}>
        <View style={this.props.viewMain}>
          <TextInput
            editable={this.props.editable}
            secureTextEntry={this.props.secureTextEntry}
            placeholder={this.props.placeholder}
            placeholderTextColor={Colors.TEXT_COLOR}
            keyboardType={
              this.props.keyboardType ? this.props.keyboardType : 'default'
            }
            autoCorrect={false}
            style={this.props.inputStyle}
            value={this.props.value}
            onChangeText={this.props.onChange}
            multiline={this.props.multiline}
            maxLength={this.props.maxLength}
            blurOnSubmit={this.props.blurOnSubmit}
            autoCapitalize={this.props.autoCapitalize}
            returnKeyType={this.props.returnKeyType}
            onBlur={() => this.onBlur()}
            onFocus={() => this.onFocus()}
            ref={'input'}
            onSubmitEditing={this.props.onSubmitEditing}
            autoFocus={this.props.autoFocus}
          />

          {this.props.rightImageSource ? (
            <View style={this.props.rightViewStyle}>
              <Image
                style={{width: 15, height: 15}}
                source={this.props.rightImageSource}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
        {!this.props.hideError ? (
          <Text style={[this.props.errorStyle, styles.errorStyleRequired]}>
            {this.props.errorText}
          </Text>
        ) : null}
      </View>
    );
  }
}

TextField.propTypes = {
  inputContainerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  noteStyle: PropTypes.object,
  optionalStyle: PropTypes.object,
  errorText: PropTypes.string,
  errorStyle: PropTypes.object,
  label: PropTypes.string,
  isMandatory: PropTypes.bool,
  viewMain: PropTypes.any,
  enableLeftView: PropTypes.bool,
  leftImageStyle: PropTypes.object,
  leftImageSource: PropTypes.any,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  inputStyle: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,

  leftViewStyle: PropTypes.object,
  enableRightView: PropTypes.bool,
  rightViewStyle: PropTypes.object,
  rightImageStyle: PropTypes.object,
  rightImageSource: PropTypes.any,
  maxLength: PropTypes.number,
  blurOnSubmit: PropTypes.any,
  onSubmitEditing: PropTypes.func,
  autoFocus: PropTypes.bool,
};

TextField.defaultProps = {
  inputContainerStyle: Styles.inputContainerStyle,
  labelStyle: Styles.labelStyle,
  optionalStyle: Styles.optionalStyle,
  noteStyle: Styles.noteStyle,
  errorText: '',
  errorStyle: Styles.errorStyle,
  label: '',
  isMandatory: false,
  viewMain: Styles.viewMain,
  enableLeftView: false,
  leftViewStyle: Styles.leftViewStyle,
  leftImageStyle: Styles.leftViewStyle,
  leftTextStyle: Styles.leftTextStyle,
  leftImageSource: '',
  editable: true,
  secureTextEntry: false,
  placeholder: '',
  keyboardType: '',
  inputStyle: Styles.inputStyle,
  value: '',
  onChange: () => {},
  multiline: false,
  enableRightView: false,
  rightViewStyle: Styles.rightViewStyle,
  rightImageStyle: Styles.rightImageStyle,
  rightImageSource: '',
  maxLength: null,
  onSubmitEditing: () => {},
  autoFocus: false,
};
