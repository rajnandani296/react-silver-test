'use strict';
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Constants from '../constants/Constants';
import {FontSize} from '../constants/Font';
import Images from '../constants/Images';
import {getWidth, handleCartNavigation} from '../utils/Util';

export default function Toolbar(props) {
  useEffect(() => {}, []);

  let renderNavigationUI = navigationName => {
    if (navigationName == Constants.RIGHT_MENU) {
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
                source={Images.ic_back_arrow}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={Styles.leftBlackText}>
              {props.leftTextName}
            </Text>
          </View>

          <View style={Styles.homeRightView}>
            <View style={{flex: 1}} />
            {props.showSearch ? (
              <TouchableOpacity
                activeOpacity={Constants.TOUCH_OPACITY}
                style={Styles.helpNsupportTap}
                onPress={() => props.onPressSearch()}>
                <Image
                  resizeMode="contain"
                  style={{height: 28, width: 28}}
                  source={Images.ic_search}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              activeOpacity={Constants.TOUCH_OPACITY}
              style={Styles.helpNsupportTap}
              onPress={() => props.onPressNotification()}>
              <Image
                resizeMode="contain"
                style={Styles.iconHelpNsupport}
                source={Images.ic_notification}
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
                  source={Images.ic_shopping}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={Constants.TOUCH_OPACITY}
          style={Styles.defaultTouchBack}
          onPress={() => props.goToBack()}>
          <Image
            style={{
              height: 16,
              width: 16,
              tintColor: props.backgroundColor ? Colors.white : Colors.black,
            }}
            source={props && props.crossImage}
          />
        </TouchableOpacity>
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
  mainContainerStyle: {
    justifyContent: 'center',
    // height: 72,
    zIndex: 0,
  },
  defaultTouchBack: {
    paddingHorizontal: 20,
    height: 60,
    width: 95,
    justifyContent: 'center',
  },
  touchBack: {
    paddingLeft: 20,
    height: 60,
    justifyContent: 'center',
  },
  touchRight: {
    paddingRight: 20,
    height: 60,
    justifyContent: 'center',
  },
  notificationTap: {
    alignItems: 'center',
    paddingRight: 20,
    height: 60,
    justifyContent: 'center',
  },
  iconNotification: {
    height: 24,
    width: 22,
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
  },
  leftText: {
    fontSize: FontSize.contextText,
    marginLeft: 10,
  },
  leftBlackText: {
    fontSize: FontSize.contextText,
    marginLeft: 10,
  },
  leftTextTitle: {
    fontSize: FontSize.contextText,
  },
  selectText: {
    fontSize: FontSize.contextText,
    borderBottomWidth: 1,
  },
  badgeCountContainerNotification: {
    position: 'absolute',
    height: 16,
    width: 18,
    borderRadius: 8,
    right: 1,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countNotificationText: {
    fontSize: 8,
  },
  homeLeftView: {
    flex: 5,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftTouch: {
    backgroundColor: 'transparent',
  },
  homeRightView: {
    flex: 6,
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
  wishlistTap: {
    padding: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  wishlistText: {
    marginLeft: 5,
    fontSize: 8,
  },
});
