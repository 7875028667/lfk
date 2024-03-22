import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageData, postMethod, storeData } from '../../utils/helper'
import HeaderScreen from './HeaderScreen';


function ProfileListing({ navigation }: any) {
  // const [loading, setloading] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getStoredData();
  }, []);

  const getStoredData = async () => {
    try {
      const storedData = await getStorageData();
      setUserDetails(storedData)
      // console.log("logout stored-data", storedData)
    }
    catch (error) {
      console.log('Error retrieving images:', error);
    }
  };

  const LogOut = async () => {
    try {
      const api: any = await postMethod(`auth/logout`);
      if (api.status === 200) {
        await AsyncStorage.removeItem('user_data');
        navigation.navigate("LoginScreen")
      } else {
        console.log(api.data.message)
      }
    }
    catch (e) {
      console.log("catche", e)
    }
  }


  return (
    <>
    <HeaderScreen />
    <View style={styles.body}>
      <View style={styles.container_0}>
        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.container}>
            <Icon name="person" size={30} color="black" />
            <Text style={styles.text}>Profile</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ProfileAddress')}>
          <View style={styles.container}>
            <Icon name="location" size={30} color="black" />
            <Text style={styles.text}>Address</Text>
          </View>
        </Pressable>
        <View style={styles.container}>
          <Icon name="cart" size={30} color="black" />
          <Text style={styles.text}>Wishlist</Text>
        </View>
        <Pressable>
          <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
            <View style={styles.container}>
              <Icon name="receipt" size={20} color="black" />
              <Text style={styles.text}>Order History</Text>
            </View>
          </TouchableOpacity>
        </Pressable>
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Voucher')}>
          <Icon name="pricetags-sharp" size={20} color="black" />
          <Text style={styles.text}>Coupons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => LogOut()}
        // disabled={loading}
        >
          <View style={styles.container}>
            <Icon name="log-out" size={20} color="black" />
            <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

export default ProfileListing;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: height * 0.05,
    fontFamily: 'Poppins-Black',
    backgroundColor: 'white',
    overflowX: 'hidden',
  },

  container_0: {
    width: width * 1,
    height: width * 1.3,
    marginBottom: height * 0.2,
    zIndex: -4,
    position: 'relative',
  },

  container: {
    width: width * 1,
    height: width * 0.15,
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: width * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    zIndex: -4,
    position: 'relative',
  },

  email_img: {
    width: width * 0.05,
    height: width * 0.05,
  },

  add_img: {
    width: width * 0.04,
    height: width * 0.06,
    zIndex: -4,
    position: 'relative',
  },

  login_img: {
    width: width * 0.03,
    height: width * 0.02,
  },

  login1_img: {
    width: width * 0.03,
    height: width * 0.05,
    marginLeft: width * -0.07,
  },

  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: width * 0.04,
    zIndex: -4,
    position: 'relative',
    color:'black'
  },
});
