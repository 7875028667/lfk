import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, SafeAreaView, Text, ScrollView, TouchableOpacity, } from 'react-native';
import HeaderScreen from './HeaderScreen';

const CouponRedeem = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <View style={styles.body} >
        <ImageBackground source={require('../../../assets/img/coupon.png')} style={styles.img}>
          <View style={styles.centerView}>
            <Text style={styles.detailText}>Here's the code
              for your $50 gift card
            </Text>
            <Text style={styles.code}>LFK565656</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>REDEEM IT</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default CouponRedeem;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
  },
  img: {
    height: windowHeight * 1,
    width: windowWidth * 1,
  },
  centerView: {
    backgroundColor: 'white',
    position: 'absolute',
    top: windowWidth * 0.6,
    width: windowWidth * 0.7,
    height: windowWidth * 0.51,
    alignSelf: 'center',
    alignItems: 'center',

  },
  detailText: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    width: windowWidth * 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  code: {
    color: 'red',
    fontSize: windowWidth * 0.045,
    fontFamily: 'Poppins-Bold',
    marginVertical: 20,

  },
  btn: {
    backgroundColor: '#F26722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius:50,
  },
  btnText: {
    color: 'white',
    fontSize: windowWidth * 0.035,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing:2,
  },
});


