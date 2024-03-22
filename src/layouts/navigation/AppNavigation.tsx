import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAcountScreen from '../screens/CreateAcountScreen';
import SplashScreen from '../screens/SplashScreen';
import ForgotPassword from '../screens/ForgotPassword';
import EnterOtp from '../screens/EnterOtp';
import HomeScreen from '../screens/HomeScreen';
import HeaderScreen from '../screens/HeaderScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetails from '../screens/ProductDetails';
import CartScreen from '../screens/CartScreen';
import Checkout from '../screens/Checkout';
import ProfileListing from '../screens/ProfileListing';
import ProfileAddress from '../screens/ProfileAddress';
import ProfileUpdateAddress from '../screens/ProfileUpdateAddress';
// import ProfileCategory from '../screens/ProfileCategory';
import ProfileCategory from '../screens/ProfileCategory';
import OrderHistory from '../screens/OrderHistory';
import Voucher from '../screens/Voucher';
import CouponRedeem from '../screens/CouponRedeem';
import ProductVoucher from '../screens/ProductVoucher';
// import DrawerContent from './DrawerContent';
import DrawerNavigator from './DrawerNavigator ';
// import DrawerNavigator from '../navigation/DrawerNavigator ';
import CategoryList from '../screens/CategoryList';
import {LoginScreen} from '../screens/LoginScreen';
import ProfileEdit from '../screens/ProfileEdit';
import EditAddress from '../screens/EditAddress';
import Test from '../screens/Test';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { getStorageData } from '../../utils/helper';

import NewProfileEdit from '../screens/NewProfileEdit';
import SignUp from '../screens/SignUp';
import SelectAddress from '../screens/SelectAddress';
import Create from '../screens/Create';
import TodayDealScreen from '../screens/TodayDealScreen';
import FlashDealScreen from '../screens/FlashDealScreen';
import FeaturedProductScreen from '../screens/FeaturedProductScreen';
import PopularProductScreen from '../screens/PopularProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {


  const [auth, setAuth] = useState('')
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserData()
  }, [])
  const getUserData = async () => {
    try {
      const getData = await getStorageData();
       console.log("getData", getData)
      if (getData) 
      setAuth(getData.access_token)
      setLoad(false);
    } catch (error) {
      console.log('Initiate data error');
      setLoad(false);
    }
  }

  return (

    load === false ? (
    <Stack.Navigator
      initialRouteName={auth !== '' ? "DrawerNavigator" : "LoginScreen"} screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateAcountScreen" component={CreateAcountScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="TodayDealScreen" component={TodayDealScreen} />
      <Stack.Screen name="FlashDealScreen" component={FlashDealScreen} />
      <Stack.Screen name="FeaturedProductScreen" component={FeaturedProductScreen} />
      <Stack.Screen name="PopularProductScreen" component={PopularProductScreen} />
      <Stack.Screen name="HeaderScreen" component={HeaderScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="CartStackScreen" component={CartScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="ProfileListing" component={ProfileListing} />
      <Stack.Screen name="ProfileAddress" component={ProfileAddress} />
      <Stack.Screen name="ProfileUpdateAddress" component={ProfileUpdateAddress}/>
      <Stack.Screen name="ProfileCategory" component={ProfileCategory} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="Voucher" component={Voucher} />
      <Stack.Screen name="CouponRedeem" component={CouponRedeem} />
      <Stack.Screen name="ProductVoucher" component={ProductVoucher} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SelectAddress" component={SelectAddress} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
    )
    : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
        <ActivityIndicator size="large" color={'white'} />
      </View>
    )
  );
};

export default AppNavigation;
