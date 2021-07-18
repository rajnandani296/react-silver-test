'use strict';
import React, {useState, useEffect} from 'react';
import {
  Animated,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import Ripple from '../../common/Ripple';
import Constants from '../../constants/Constants';
import Colors from '../../constants/Colors';

import {FontSize} from '../../constants/Font';
import Metrics from '../../constants/Metrics';
export default function Button(props) {
  return (
    <Animated.View>
      {/* Save and Continue button  */}

      <Ripple
        disabled={props.disabled}
        rippleSize={400}
        rippleFades={true}
        rippleColor={Colors.silverGray}
        rippleOpacity={Constants.TOUCH_OPACITY}
        rippleDuration={Constants.TOUCH_DURATION}
        rippleContainerBorderRadius={Constants.TOUCH_RADIUS}
        onPress={() => props.onPress()}
        style={[Styles.buttonStyle, props.buttonStyle]}>
        <View style={Styles.imgTxtView}>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[Styles.buttonTextStyle, props.buttonTextStyle]}>
            {props.buttonText}
          </Text>
          {props.showRightImage ? (
            <Image
              style={[Styles.imageStyleRight, props.imageStyle]}
              resizeMode={'contain'}
              source={props && props.rightImage}
            />
          ) : null}
        </View>
      </Ripple>
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  buttonStyle: {
    height: Metrics.buttonHeight,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.BUTTON_COLOR,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  imageStyleLeft: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  imageStyleRight: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  indicatorView: {
    height: 10,
    width: 10,
    marginLeft: 15,
  },
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonTextStyle: {
    // flex: 1,
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: FontSize.h6,
    // fontFamily: FontType.boldFont,
    // alignContent: "center",
  },
  imgTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
