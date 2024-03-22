/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage} from '../../reduxFolder/action';
import { language } from '../../reduxFolder/langauge';

const HeaderScreen = ({ navigation }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lengPage, setLengPage] = useState(false);


  const options = ['ENGLISH', 'CHINESE'];

  const dispatch = useDispatch();
  const cartValue = useSelector((state:any) => state.reducer);
  // const itemValue=useState((state:any)=> state.popreducer)


  const handlePickerOpen = () => {
      setIsPickerOpen(true);
    setLengPage(!lengPage);

  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsPickerOpen(false);
   console.log(selectedOption)
    if (cartValue === 'ENGLISH' && selectedOption==='ENGLISH') {
      dispatch(changeLanguage('ENGLISH'));

    }
    else {
      dispatch(changeLanguage('CHINESE'));

    }
    dispatch(changeLanguage(option));

  };

  // const openDrawer = () => {
  //   navigation.openDrawer();
  //   // console.log('komal')
  // };

  return (
    <View>
          <Pressable onPress={() => setIsPickerOpen(false)}>
            <View style={styles.public}>
              <TouchableOpacity onPress={handlePickerOpen}>
                <IonIcon name="public" size={26} color={'red'} />
              </TouchableOpacity>
              {isPickerOpen && (
                <View style={styles.pickerContainer}>
                  {options.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={styles.optionContainer}
                      onPress={() => handleOptionSelect(option)}>
                      <Text
                        style={
                          option === selectedOption
                            ? styles.selectedOptionText
                            : styles.optionText
                        }>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        </View>
  );
};

export default HeaderScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  selectedOptionText: {
    color: 'red',
  },

  optionText: {
    color: 'black',
  },

  pickerContainer: {
    width: 35,
    height: 30,
    position: 'absolute',
    top: -20,
    backgroundColor: 'white',
    marginLeft: 25,
    marginTop: 10,
  },
  optionContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    color: 'black',
  },

  mid: {
    width: windowWidth * 1.5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'center',
    gap: 90,
    backgroundColor: 'white',
    marginTop: -5,
    zIndex: 999,
  },

  midCol: {
    height: windowWidth * 0.3,
    width: windowWidth * 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    gap: 86,
    marginLeft: 5,
    backgroundColor: 'white',
  },

  world: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    gap: 8,
  },

  img_2: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.14,
    position: 'relative',
  },

  img_3: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },

  public: {
    width: 30,
    flexDirection: 'row',
    marginLeft: -15,
  },

  openPage: {
    width: windowWidth * 0.56,
    height: windowWidth * 8,
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 5,
    marginTop: -25,
    position: 'absolute',
    backgroundColor: '#F1F1F1',
    zIndex: 999,
  },

  CrossImg: {
    marginLeft: windowWidth * -0.05,
    height: windowWidth * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: windowWidth * 0.1,
    gap: windowWidth * 0.07,
    marginBottom: windowWidth * 0.05,
  },

  logo: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.14,
    // marginLeft: 95,
    // marginRight: 95,
  },

  closeIcon: {
    display: 'none',
  },

  closePage: {
    display: 'none',
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth * 0.56,
    alignItems: 'center',
    gap: windowWidth * 0.05,
    // marginTop:width *0.05,
    marginBottom: windowWidth * 0.03,
    color: 'black',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },

  one: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    position: 'relative',
    marginBottom: windowWidth * 0.01,
  },

  textOne: {
    fontSize: windowWidth * 0.04,
    fontWeight: '900',
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },

  textOne_0: {
    fontSize: windowWidth * 0.04,
    fontWeight: '900',
    fontFamily: 'Poppins_800Bold',
    color: 'red',
  },

  img_4: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },

  text: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    fontFamily: 'Poppins_Bold',
    color: 'black',
  },

  sortList: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.57,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: -5,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: -55,
  },

  textContent: {
    width: windowWidth * 0.92,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Poppins_Medium',
    fontSize: windowWidth * 0.04,
    color: '#515151',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    textAlign: 'center',
    padding: windowWidth * 0.05,
    marginBottom: windowWidth * 0.02,
  },

  title: {
    fontFamily: 'Poppins_Bold',
    fontSize: 15,
    fontWeight: '800',
    /* identical to box height */
    color: 'black',
    lineHeight: 20,
  },

  value: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.05,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // justifyContent:'space-around',
    fontSize: windowWidth * 0.04,
    color: '#515151',
    paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.05,
    gap: windowWidth * 0.8,
    marginBottom: windowWidth * 0.05,
  },

  valueText: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    fontWeight: '700',
    fontFamily: 'Poppins_Light',
    fontSize: windowWidth * 0.05,
    color: 'black',
  },
});

