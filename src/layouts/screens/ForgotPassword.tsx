/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  // TouchableOpacity,
  // Image,
  // TouchableOpacity,
  Pressable,
} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

const ForgotPassword = () => {
  return (
    <View style={styles.body}>
      <View style={styles.title}>
        <Text style={styles.text}>Forgot</Text>
        <Text style={styles.line}>Password?</Text>
      </View>
      <View>
        <Text style={styles.titleText}>Enter your email that you used to register your account,
          so we can send you a link to reset password</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            label="Email"
            // value={text}
            // onChangeText={text => setText(text)}
            underlineColor="white"
            left={<TextInput.Icon icon="email" style={styles.email} />}
          />
        </View>
        <View style={styles.btnContainer_1} >
          <Pressable >
            <Text style={styles.signText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingBottom: 5,
    paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.05,
  },


  title: {
    // width: '100%',
    height: 32,
    alignItems: 'center',
    fontFamily: 'Poppins_900ExtraBold',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 36,
    color: '#000000',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },

  text: {
    fontFamily: 'Poppins_Light',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 36,
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },

  line: {
    fontFamily: 'Poppins_900ExtraBold',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 36,
    color: 'red',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },

  titleText: {
    fontFamily: 'Poppins_Regular',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 26,
    color: 'gray',
    marginBottom: windowHeight * 0.05,
  },

  mainContainer: {
    width: windowWidth * 0.92,
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
  },

  inputContainer: {
    width: '100%',
    height: windowHeight * 0.15,
    marginBottom: windowHeight * 0.05,
    position: 'relative',
  },

  inputText: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.08,
    // fontWeight: 700,
    backgroundColor: '#E3E3E3',
    color: '#515151',
    fontFamily: 'Poppins-ExtraBold',
    borderBottomColor: '#E3E3E3',
    // outlinewindowWidth: 0,
    borderTopEndRadius: windowWidth * 0.04,
    borderTopLeftRadius: windowWidth * 0.04,
    borderRadius: windowWidth * 0.04,
  },

  email: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.07,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginLeft: -0.1,
  },

  box: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    top: windowHeight * 0.06,
    borderRadius: 12,
    backgroundColor: '#DBDBDB',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.03,
    zIndex: 999,
  },

  btnContainer_1: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 0.04,
    fontWeight: '900',
    position: 'absolute',
    backgroundColor: 'red',
    marginTop: windowWidth * 0.6,
    borderRadius: windowWidth * 0.28,
  },

  signText:{
   color:'white',
   fontSize: windowWidth * 0.05,
   fontFamily: 'Poppins-Bold',
  },

});


