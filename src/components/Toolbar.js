'use strict';
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';

import Constants from '../constants/Constants';
import {FontSize} from '../constants/Font';
import Images from '../constants/Images';
import {getWidth, handleCartNavigation} from '../utils/Util';

export default function Toolbar(props) {
  useEffect(() => {}, []);

  let renderNavigationUI = navigationName => {
    if (navigationName == Constants.HOME_TOOL) {
      return (
        <View style={[Styles.rowAlign, {justifyContent: 'space-between'}]}>
          <View style={Styles.homeLeftView}>
            <TouchableOpacity
              activeOpacity={Constants.TOUCH_OPACITY}
              style={Styles.touchBack}
              hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
              onPress={() => props.goToBack()}>
              <Image
                style={[Styles.backIcon, {tintColor: 'black'}]}
                source={Images.menu512}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={Styles.leftBlackText}>
              {props.leftTextName}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[Styles.rowAlign]}>
          <View style={Styles.homeLeftView}>
            <TouchableOpacity
              activeOpacity={Constants.TOUCH_OPACITY}
              style={Styles.touchBack}
              hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
              onPress={() => props.goToBack()}>
              <Image
                style={[Styles.backIcon, {tintColor: 'black'}]}
                source={Images.menu512}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={Styles.leftBlackText}>
              {props.leftTextName}
            </Text>
          </View>
          {props.showSearch ? (
            <View style={Styles.homeRightView}>
              <View style={{flex: 1}} />

              <TouchableOpacity
                activeOpacity={Constants.TOUCH_OPACITY}
                style={Styles.helpNsupportTap}
                onPress={() => props.onPressSearch()}>
                <Image
                  resizeMode="contain"
                  style={{height: 28, width: 28}}
                  source={Images.filter}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={Constants.TOUCH_OPACITY}
                style={Styles.notificationTap}
                onPress={handleCartNavigation}>
                <View style={Styles.shoppingContainer}>
                  <Image
                    resizeMode="contain"
                    style={Styles.shoppingIcon}
                    source={Images.search}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
    }
  };

  return <View>{renderNavigationUI(props.navigationName)}</View>;
}

Toolbar.defaultProps = {
  goToBack: () => null,
  onPressNotification: () => null,
  onPressHelpNsupport: () => null,
  onPressShoppingCart: () => null,
  onPressWishList: () => null,
  onPressSearch: () => null,
};

const Styles = StyleSheet.create({
  touchBack: {
    paddingLeft: 20,
    height: 60,
    justifyContent: 'center',
  },

  notificationTap: {
    alignItems: 'center',
    paddingRight: 20,
    height: 60,
    justifyContent: 'center',
  },

  helpNsupportTap: {
    height: 60,
    width: getWidth(9.66),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHelpNsupport: {
    height: 22,
    width: 22,
  },
  backIcon: {
    width: 25,
    height: 15,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BUTTON_COLOR,
  },

  leftBlackText: {
    fontSize: FontSize.h6,
    color: Colors.WHITE,
    flex: 1,
    textAlign: 'center',
  },

  homeLeftView: {
    flex: 2,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },

  homeRightView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  shoppingIcon: {
    height: 18,
    width: 16,
    marginRight: 5,
  },
  shoppingContainer: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 5,
  },
});
