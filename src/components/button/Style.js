import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

import {FontSize} from '../../constants/Font';
import Metrics from '../../constants/Metrics';

const styles = StyleSheet.create({
  buttonStyle: {
    height: Metrics.buttonHeight,
    width: '45%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  indicatorView: {
    height: 10,
    width: 10,
  },
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: FontSize.h6,
    marginHorizontal: 15,
    // alignContent: "center",
  },
  imgTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
