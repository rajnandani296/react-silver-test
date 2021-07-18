import React, {memo} from 'react';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

import {
  Image,
  Pressable,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
function RoundShape(props) {
  const {
    style,
    size,
    showEditIcon,
    onPress,
    disabled,
    editIcon,
    source,
    editIconStyle,
    editIconViewStyle,
  } = props;
  const container = {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderColor: Colors.LIGHT_GREEN,
  };

  const Wrapper = editIcon ? TouchableWithoutFeedback : View;
  return (
    <Wrapper style={{alignSelf: 'center'}} onPress={onPress}>
      <Image {...props} source={source} π style={[container, style]}></Image>
    </Wrapper>
  );
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return prevProps.source === nextProps.source;
}
export default React.memo(RoundShape, areEqual);
RoundShape.defaultProps = {
  source:
    'http://play-vidz.codiantprod.com/public/themes/uploads/customer/default-user.png',
  height: 80,
  width: 80,
  borderRadius: 40,
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: Colors.appThemeColor,
  marginTop: 20,
  editIcon: true,
  isImageRadius: true,
};

RoundShape.propTypes = {
  source: PropTypes.string,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  editIconUrl: PropTypes.any,
  editIcon: PropTypes.bool,
};
