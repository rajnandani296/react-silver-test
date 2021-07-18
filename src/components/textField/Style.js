import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Metrics from '../../constants/Metrics';
import {FontSize} from '../../constants/Font';
const styles = StyleSheet.create({
  viewMain: {
    height: Metrics.buttonHeight,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREEN,
    borderRadius: 5,
    color: Colors.TEXT_COLOR,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  errorStyle: {
    fontSize: 10,
    paddingTop: 2,
    height: 14,
    paddingStart: 17,
    color: Colors.red,
  },
  errorStyleRequired: {
    textAlign: 'left',
  },
  leftImage: {
    width: 25,
    height: 25,
    // resizeMode: "center",
    alignSelf: 'center',
  },
  leftViewStyle: {
    width: 30,
    height: 25,
    // resizeMode: "center",
    justifyContent: 'center',
  },
  leftTextStyle: {
    // resizeMode: "center",
    alignSelf: 'center',
    color: Colors.TEXT_COLOR,
    fontSize: FontSize.t1,
    marginHorizontal: 5,
  },
  rightViewStyle: {
    width: Metrics.buttonHeight / 1.5,
    height: Metrics.buttonHeight,
    // resizeMode: "center",
    justifyContent: 'center',
  },
  rightImageStyle: {
    width: 25,
    height: 25,
    // resizeMode: "center",
    alignSelf: 'center',
  },
  inputStyle: {
    height: Metrics.buttonHeight,
    paddingHorizontal: 16,
    fontSize: FontSize.t1,
    color: Colors.TEXT_COLOR,
    flex: 1,
  },
  labelStyle: {
    fontSize: FontSize.t1,
    color: Colors.TEXT_COLOR,
    marginBottom: 10,
  },
  optionalStyle: {
    fontSize: FontSize.t1,
    color: Colors.TEXT_COLOR,
    marginBottom: 10,
    marginLeft: 5,
  },

  inputContainerStyle: {
    marginVertical: 5,
  },
  mandatoryImage: {
    height: 6,
    width: 6,
  },
});
export default styles;
