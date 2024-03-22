/* eslint-disable prettier/prettier */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  //   TouchableOpacity,
  // Button,
  Pressable,
} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IonIcon from 'react-native-vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';

const EnterOtp = () => {
  return (
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.code_1}>
            <Text style={styles.enter}>Enter</Text>
            <Text style={styles.red}>OTP</Text>
          </View>
          <View>
            <Text style={styles.itemText}>An 4 digit code has been sent to  your demo****@mail.com account please check</Text>
          </View>
          <View style={styles.inputText}>
            <Text style={styles.circle} />
            <Text style={styles.circle} />
            <Text style={styles.circle} />
            <Text style={styles.circle} />
          </View>
          <View style={styles.code}>
          <Text style={styles.password}>Didn’t recieve code? </Text>
          <Text style={styles.resend}>Resend</Text>
        </View>
      </View>
      </View>
      <View style={styles.btnContainerOne} >
        <Pressable >
          <Text style={styles.signText}>Sign In</Text>
        </Pressable>
        </View>
    </View>
  );
};

export default EnterOtp;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingTop: 320,
  },

  mainContainer: {
    width: windowWidth * 1,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: windowWidth * -0.3,
    marginBottom: windowWidth * -0.1,
  },

  itemText: {
    width: windowWidth * 0.7,
    height: 35,
    fontWeight: '400',
    fontFamily: 'Poppins_Medium',
    fontSize: 15,
    color: '#4F4A4A',
    marginBottom: 32,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  inputText: {
    width: windowWidth * 1,
    height: windowHeight * 0.08,
    fontFamily: 'Poppins_SemiBold',
    color: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,

  },

  circle: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    boxShadow: '0 9 9 rgba(0, 0, 0, 0.3)',
  },

  code_1: {
    width: windowWidth * 1,
    height: windowHeight * 0.01,
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    fontWeight: '900',
    fontSize: 5,
    gap: 0.5,
    fontFamily: 'Poppins_600SemiBold',
  },

  code: {
    height: windowHeight * 0.06,
    fontFamily: 'Poppins_Bold',
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },

  enter:{
    width: windowWidth * 0.15,
    height: windowHeight * 0.06,
    fontSize: 22,
    fontWeight: '900',
    fontFamily: 'Poppins_ExtraBold',
  },

  red: {
    height: windowHeight * 0.06,
    fontSize: 22,
    fontWeight: '900',
    color: 'red',
    fontFamily: 'Poppins_ExtraBold',
  },

  inputContainer: {
    width: '100%',
    marginBottom: windowHeight * 0.01,
    height: windowHeight * 0.12,
  },

  resend: {
    color: 'red',
    fontWeight: '700',
    fontFamily: 'Poppins_SemiBold',
    fontSize: 17,
  },

  password: {
    fontWeight: '700',
    color:' #515151',
    fontFamily: 'Poppins_SemiBold',
    fontSize: 17,
  },

  btnContainerOne: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 0.04,
    fontWeight: '900',
    // position: 'absolute',
    backgroundColor: 'red',
    marginTop: windowWidth * 0.9,
    borderRadius: windowWidth * 0.28,
  },

  signText: {
    color: 'white',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins-Bold',
  },

});


