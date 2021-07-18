import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const deviceWidth = width < height ? width : height;
const deviceHeight = width < height ? height : width;

export const Metrics = {
  screenWidth: Dimensions.get('window').width, //screen width
  screenHeight: Dimensions.get('window').height, //screen height
  //Margin
  baseMargin: deviceWidth / 30,
  doubleBaseMargin: deviceWidth / 15,
  tripleBaseMargin: deviceWidth / 2,
  smallMargin: deviceWidth / 60,
  baseSeparatorMargin: 20,

  //Padding
  // basePadding: 30,
  basePadding: deviceWidth / 30,
  doubleBasePadding: deviceWidth / 15,
  smallPadding: deviceWidth / 60,
  baseCurvePadding: 27,
  orderBaseCurvePadding: 40,

  buttonHeight: 40, //Button height
  inputHeight: 50, // Input height
  marginTop: 55,
  buttonBorderRadius: 6,

  paddingTop:
    Platform.OS === 'ios' ? (width === 896 ? 44 : height === 812 ? 40 : 20) : 0,
  headerHeight:
    Platform.OS === 'ios'
      ? Dimensions.get('window').height === 896
        ? 50
        : 64
      : 56,
  paddingBottom: Platform.OS === 'ios' ? 0 : 25,

  negativeMarginTop: -deviceWidth / 6,
  HEADER_HEIGHT:
    Platform.OS === 'ios'
      ? Dimensions.get('window').height === 896
        ? 88
        : 64
      : 56,
};

export default Metrics;

export {width, height};
