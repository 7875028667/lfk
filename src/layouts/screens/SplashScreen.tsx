/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  // Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  // Pressable,
} from 'react-native';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View style={styles.body}>
       <ImageBackground
          source={require('../../../assets/img/background-img.png')}
          resizeMode="cover"
          style={styles.img}
        >
          <View style={styles.top}>
            <Image source={require('../../../assets/img/top-round.png')} style={styles.img_1} />
          </View>
          <View style={styles.mid}>
          <TouchableOpacity >
            <Image source={require('../../../assets/img/Logo.png')} style={styles.img_2} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Image source={require('../../../assets/img/bottom-round.png')} style={styles.img_0} />
           </View>
        </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingBottom: 5,
    // paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.05,
  },

   img: {
        height: 1000,
        width: windowWidth * 1,
        zIndex: -1,
      },

  top: {
        display: 'flex',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: windowHeight * 0.55,
        width: windowWidth * 0.2,
      },

      img_1: {
        height: windowHeight * 0.4,
        width: windowWidth * 0.5,
        zIndex: 5,
      },

      img_0: {
        width: 160,
        height: 160,
      },

      mid:{
        height: windowHeight * 0.3,
        width: windowWidth * 0.5,
        PaddingLeft:windowWidth * 0.5,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems:'center',
      },

      img_2: {
        width:  windowWidth * 0.7,
        height:  windowWidth * 0.25,

      },

      bottom: {
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: windowHeight * 0.4,
        width: windowWidth * 0.6,
      },


});


