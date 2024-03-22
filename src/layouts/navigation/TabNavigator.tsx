/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ProductVoucher from '../screens/ProductVoucher';
import CartScreen from '../screens/CartScreen';
import ProfileListing from '../screens/ProfileListing';

const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'red' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: { marginBottom: 5, display: 'none' },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen name="ProductVoucher"
        component={ProductVoucher}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="search" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen name="CartScreen" component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="cart" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen name="ProfileListing" component={ProfileListing}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="person" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
