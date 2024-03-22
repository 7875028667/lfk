import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { Svg, Path } from 'react-native-svg';

import React from 'react';



const CustomDrawer = ({ props }: any) => {

  const navigation = useNavigation();



  const navigateToScreen = (screenName: any) => () => {

    navigation.navigate(screenName);

  };



  return (

    <View style={{ flex: 1, marginTop: -4 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.column}>
              <Image
                source={require('../../../assets/img/Logo.png')}
                style={styles.logo}
              />
            </View>
          </View>
        </View>
        <View style={styles.drawerView}>

          <DrawerItem
            icon={() => <IonIcon name="home-outline" size={20} color="black" />}
            label={() => <Text style={styles.RouteName}>Home</Text>}
            onPress={navigateToScreen('DrawerHome')}
          />

        </View>

        <View style={styles.drawerView}>

          <DrawerItem
            icon={() => (
              <IonIcon
                name="information-circle-outline"
                size={20}
                color="black"
              />
            )}
            label={() => <Text style={styles.RouteName}>About</Text>}
            onPress={navigateToScreen('AboutName')}
          />
        </View>
        <View style={styles.drawerView}>
          <DrawerItem
            icon={() => (
              <Svg width={16} height={16} viewBox="0 0 16 16">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9843 13.4988C15.9929 13.5387 15.998 13.5791 15.9995 13.62L16 13.6459V14.4306C16 15.2974 14.3882 16 12.4 16C10.4317 16 8.83227 15.3113 8.80048 14.4566L8.8 14.4306V13.6459L8.80048 13.62C8.802 13.5792 8.80707 13.5389 8.81556 13.499C9.03606 13.6615 9.30448 13.8114 9.6155 13.9398C10.3415 14.2393 11.3203 14.4306 12.4 14.4306C13.5225 14.4306 14.5359 14.2236 15.2705 13.9033C15.5451 13.7836 15.7841 13.6465 15.9843 13.4988ZM7.2 0L14.4 3.92349L14.4 6.8191C13.8103 6.6706 13.1281 6.58362 12.4 6.58362C11.3035 6.58362 10.3111 6.78134 9.57897 7.10051C8.57647 7.53754 8.06611 8.20591 8.00159 8.8823L7.99977 8.90279L8.00434 15.2556L7.2 15.694L0 11.7705V3.92349L7.2 0ZM15.9843 11.1447C15.9929 11.1846 15.998 11.2251 15.9995 11.2659L16 11.2918V12.0765C16 12.9433 14.3882 13.6459 12.4 13.6459C10.4317 13.6459 8.83227 12.9572 8.80048 12.1025L8.8 12.0765V11.2918L8.80048 11.2659C8.802 11.2251 8.80707 11.1848 8.81556 11.1449C9.03606 11.3074 9.30448 11.4573 9.6155 11.5857C10.3415 11.8852 11.3203 12.0765 12.4 12.0765C13.5225 12.0765 14.5359 11.8695 15.2705 11.5492C15.5451 11.4295 15.7841 11.2924 15.9843 11.1447ZM4.79996 7.32374L4.8 12.6424L6.4 13.5144V8.1956L4.79996 7.32374ZM1.6 5.58001V10.8986L3.19999 11.7705V6.45188L1.6 5.58001ZM12.4 7.36832C14.3683 7.36832 15.9677 8.05698 15.9995 8.91176L16 8.93771V9.72241C16 10.5892 14.3882 11.2918 12.4 11.2918C10.4317 11.2918 8.83227 10.6031 8.80048 9.74837L8.8 9.72241V8.93771L8.80533 8.85161C8.90787 8.0249 10.478 7.36832 12.4 7.36832ZM10.3497 3.46012L5.64045 6.03807L7.2 6.88791L11.92 4.31584L10.3497 3.46012ZM7.2 1.74377L2.48 4.31584L4.04231 5.1672L8.75149 2.58925L7.2 1.74377Z"
                  fill="black"
                />
              </Svg>
            )}
            label={() => <Text style={styles.RouteName1}>All Products</Text>}
            onPress={navigateToScreen('ProductName')}
          />
        </View>



        <View style={styles.drawerView}>
          <DrawerItem
            icon={() => (
              <Svg width={16} height={16} viewBox="0 0 16 16">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9843 13.4988C15.9929 13.5387 15.998 13.5791 15.9995 13.62L16 13.6459V14.4306C16 15.2974 14.3882 16 12.4 16C10.4317 16 8.83227 15.3113 8.80048 14.4566L8.8 14.4306V13.6459L8.80048 13.62C8.802 13.5792 8.80707 13.5389 8.81556 13.499C9.03606 13.6615 9.30448 13.8114 9.6155 13.9398C10.3415 14.2393 11.3203 14.4306 12.4 14.4306C13.5225 14.4306 14.5359 14.2236 15.2705 13.9033C15.5451 13.7836 15.7841 13.6465 15.9843 13.4988ZM7.2 0L14.4 3.92349L14.4 6.8191C13.8103 6.6706 13.1281 6.58362 12.4 6.58362C11.3035 6.58362 10.3111 6.78134 9.57897 7.10051C8.57647 7.53754 8.06611 8.20591 8.00159 8.8823L7.99977 8.90279L8.00434 15.2556L7.2 15.694L0 11.7705V3.92349L7.2 0ZM15.9843 11.1447C15.9929 11.1846 15.998 11.2251 15.9995 11.2659L16 11.2918V12.0765C16 12.9433 14.3882 13.6459 12.4 13.6459C10.4317 13.6459 8.83227 12.9572 8.80048 12.1025L8.8 12.0765V11.2918L8.80048 11.2659C8.802 11.2251 8.80707 11.1848 8.81556 11.1449C9.03606 11.3074 9.30448 11.4573 9.6155 11.5857C10.3415 11.8852 11.3203 12.0765 12.4 12.0765C13.5225 12.0765 14.5359 11.8695 15.2705 11.5492C15.5451 11.4295 15.7841 11.2924 15.9843 11.1447ZM4.79996 7.32374L4.8 12.6424L6.4 13.5144V8.1956L4.79996 7.32374ZM1.6 5.58001V10.8986L3.19999 11.7705V6.45188L1.6 5.58001ZM12.4 7.36832C14.3683 7.36832 15.9677 8.05698 15.9995 8.91176L16 8.93771V9.72241C16 10.5892 14.3882 11.2918 12.4 11.2918C10.4317 11.2918 8.83227 10.6031 8.80048 9.74837L8.8 9.72241V8.93771L8.80533 8.85161C8.90787 8.0249 10.478 7.36832 12.4 7.36832ZM10.3497 3.46012L5.64045 6.03807L7.2 6.88791L11.92 4.31584L10.3497 3.46012ZM7.2 1.74377L2.48 4.31584L4.04231 5.1672L8.75149 2.58925L7.2 1.74377Z"
                  fill="black"
                />
              </Svg>
            )}
            label={() => <Text style={styles.RouteName}>Boto Juice</Text>}
            onPress={navigateToScreen('ProductName')}
          />
        </View>

        <View style={styles.drawerView}>
          <DrawerItem
            icon={() => (
              <IonIcon
                name="information-circle-outline"
                size={20}
                color="black"
              />
            )}
            label={() => <Text style={styles.RouteName}>Privacy Policy</Text>}
            onPress={navigateToScreen('Policy')}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );

};

export default CustomDrawer;



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

  drawerContent: {
    height: 80,
    marginBottom:20
  },



  text: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },

  RouteName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },



  RouteName1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'black',
    // marginLeft: -20,
  },



  cover: {
    paddingLeft: 30,
    marginTop: 50,
  },

  icon: {
    height: 20,
    width: 20,
  },



  tinyLogo: {
    marginLeft: 20,
    marginTop: 55,
    height: 100,
    width: 100,
  },



  logo: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    marginLeft: 50,
  },



  column: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 45,

  },
  drawerView:{
      // height: 57,
      // marginTop: -5,
      // marginBottom: -6,
      borderBottomColor: '#D9D9D9',
      borderBottomWidth: 2,
      paddingLeft: 5,
      justifyContent: 'flex-end',
    }
});

