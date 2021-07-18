'use strict';
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {FontSize} from '../constants/Font';
import Images from '../constants/Images';
import Constants from '../constants/Constants';
import Colors from '../constants/Colors';

export default function MediaSelectionAlertDialog(props) {
  let [isSelectedItem, setSelectedListItem] = useState();
  let [data, setData] = useState(props.dataArray);

  useEffect(() => {
    setData(props.dataArray);
  }, [props.dataArray]);

  const onSelectMedia = index => {
    setSelectedListItem(index);
    setTimeout(() => {
      props.onDateSelected(index);
      setSelectedListItem('');
    }, 500);
  };

  const _renderCheckboxItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelectMedia(item.id);
        }}
        activeOpacity={Constants.TOUCH_OPACITY}
        style={Style.touchableStyle}>
        <Text style={Style.listText}>{item.category_name}</Text>
      </TouchableOpacity>
    );
  };

  let renderAlertUI = () => {
    return (
      <View style={Style.containerColumn}>
        <View style={Style.checkBoxView}>
          <View style={Style.titleView}>
            <Text allowFontScaling={false} style={Style.titleCheckText}>
              {props.title}
            </Text>
          </View>
          <FlatList
            data={data}
            extraData={isSelectedItem}
            renderItem={_renderCheckboxItem}
            keyExtractor={(item, index) => `item_${index}`}
            bounces={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={false}
            disableVirtualization={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            scrollEventThrottle={1}
            initialNumToRender={10}
            removeClippedSubviews={false}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <Modal
        visible={props.isModalVisible}
        transparent={true}
        style={Style.modalStyle}
        onRequestClose={props.dismiss}
        animationType={'slide'}>
        <TouchableWithoutFeedback onPress={props.dismiss}>
          {renderAlertUI()}
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const Style = StyleSheet.create({
  modalStyle: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  containerColumn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  checkBoxView: {
    backgroundColor: Colors.WHITE,
    width: '75%',
    maxHeight: '75%',
  },
  titleView: {
    backgroundColor: Colors.BUTTON_COLOR,
    height: 60,
    justifyContent: 'center',
  },
  titleCheckText: {
    color: Colors.WHITE,
    fontSize: FontSize.h4,
    paddingHorizontal: 20,
  },
  touchableStyle: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: Colors.lightGrayBorder,
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  mediaImage: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  listText: {
    color: Colors.listItem,
    flex: 1,
  },
  selectIcon: {
    width: 20,
    height: 20,
  },
});
