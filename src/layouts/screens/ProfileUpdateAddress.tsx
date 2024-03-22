/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Dimensions,
  // Image,
  // TouchableOpacity,
  Dimensions,
  Pressable,
  // Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropShadow from 'react-native-drop-shadow';
import HeaderScreen from './HeaderScreen';
// import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../reduxFolder/action';
import { language } from '../../reduxFolder/langauge';
// import { Profile } from '../../reduxFolder/LanguageFolder/ProfileCategory';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
function ProfileUpdateAddress({ navigation }: any) {
  const cartValue = useSelector((state) => state.reducer);
  const route = useRoute();


  // const id = route.params?.id;
  // const apiUrl = 'http://ykpt.braincave.work/api/v2/address/update';

  // const token = useSelector((state) => state.authReducer.token);
  // const authHeader = `Bearer  ${token}`;

  // const [formData, setFormData] = useState({
  //   name: id.name,
  //   email: id.email,
  //   phone: id.phone,
  //   address: id.address,
  //   postal_code: id.postal_code,
  //   unit_no: id.unit_no,
  // });

  // const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  // const resetNavigation = useNavigation();

  // const onSubmit = async () => {
  //   console.log(id.id, 'lal');
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       apiUrl,
  //       {
  //         address_id: id.id,
  //         ...formData,
  //       },
  //       {
  //         headers: {
  //           Authorization: authHeader,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       console.log(response.data, 'priya');
  //       resetNavigation.reset({
  //         index: 0,
  //         routes: [{ name: 'ProfileAddressList' }],
  //       });
  //     } else {
  //       setErrorMessage('Failed to update the address.');
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setErrorMessage(error.response.data.error || 'An error occurred.');
  //     } else {
  //       setErrorMessage('An error occurred.');
  //     }
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  //   console.log(errorMessage);
  // };

  // const handleChange = async (field: string, value: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  //   console.log(formData);

  //   if (field === 'postal_code') {
      // try {
      //   const response = await axios.get(
      //     `https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y`
      //   );

      //   if (response.data && response.data.results.length > 0) {
      //     const address = response.data.results[0].ADDRESS;
      //     setFormData((prevData) => ({
      //       ...prevData,
      //       address: address,
      //     }));
      //   } else {
      //     console.log('Postal code not found.');
      //   }
      // } catch (error) {
      //   console.log('Error fetching address:', error.message);
      // }
  //   }
  // };
  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderScreen />
        <View style={styles.body} >
          <View style={styles.mainCol}>

            <View style={styles.main}>
              <View style={styles.searchContianer}>
                <Text style={styles.address} >
                  {cartValue === 'CHINESE' ? Profile[0].chinese : Profile[0].english}
                </Text>
                <View>
                  <Pressable>
                    <Ionicons name="close" size={30} color="black" />
                  </Pressable>
                </View>
              </View>
              <View style={styles.productsContainer} >
                <View style={styles.products}>
                  <Text style={styles.label} >
                    {cartValue === 'CHINESE' ? Profile[1].chinese : Profile[1].english}
                  </Text>
                  <TextInput placeholder="Enter your name" style={styles.input}
                    underlineColor="white"
                    // value={formData.name}
                    // onChangeText={(value) => handleChange('name', value)}
                  />
                </View>
                <View style={styles.products}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput placeholder="Enter your email address" style={styles.input}
                    underlineColor="white"
                    // value={formData.email}
                    // onChangeText={(value) => handleChange('email', value)}
                  />
                </View>
                <View style={styles.products}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput placeholder="Enter your Phone number" style={styles.input}
                    underlineColor="white"
                    // value={formData.phone}
                    // onChangeText={(value) => handleChange('phone', value)}
                  />
                </View>
                <View style={styles.products}>
                  <Text style={styles.label}>Postal Code</Text>
                  <TextInput placeholder="Enter your Postal code" style={styles.input}
                    underlineColor="white"
                    // value={formData.postal_code}
                    // onChangeText={(value) => {
                    //   handleChange('postal_code', value); 
                    // }}
                  />
                </View>
                <View style={styles.products}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput placeholder="Enter Your Address" style={styles.addresInput}
                    underlineColor="white"
                    // value={formData.address} // Use the formData address to populate the field
                    // onChangeText={(value) => handleChange('address', value)}
                  />
                </View>
                <View style={styles.products}>
                  <Text style={styles.label}>Unit NO</Text>
                  <TextInput placeholder="Enter your Unit No" style={styles.input}
                    underlineColor="white"
                    // value={formData.unit_no}
                    // onChangeText={(value) => handleChange('unit_no', value)}
                  />
                </View>
              </View>

              <View style={styles.btnContainer_1}>
                {/* {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : ( */}
                  <Pressable 
                  // onPress={onSubmit}
                  >
                    <Text style={styles.button}>SAVE</Text>
                  </Pressable>
                {/* )} */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProfileUpdateAddress;


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: height * 0.05,
    // backgroundColor: 'white',
    backgroundColor: '#F1F1F1',
    width:width*1,

  },

  searchContianer: {
    width: width *0.85,
    alignSelf: 'center',
    flexDirection: 'row',
    // gap: 175,
    marginBottom: 25,
    display:'flex',
    justifyContent:'space-between',
  },

  address: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '700',
    // marginLeft: 10,

  },

  addressButton: {
    width: width * 0.5,
    height: width * 0.06,
    backgroundColor: 'red',
    borderRadius: 10,
    color: 'white',
    fontSize: width * 0.03,
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 0.0,
  },

  mainCol: {
    width: width * 0.1,
    height: width * 2.2,
    alignSelf: 'center',
    zIndex: -4,
    // marginLeft: -20,
    // backgroundColor: 'green',
  },

  main: {
    width: width * 0.9,
    height: width * 1.7,
    alignSelf: 'center',
    // zIndex: -4,
    backgroundColor: '#F1F1F1',
    // backgroundColor:'blue',
    marginLeft:'5%',
    // paddingHorizontal:10,
  },

  productsContainer: {
    alignSelf: 'center',
    marginBottom: width * -0.05,
    zIndex: -4,
  },


  products: {
    flex: 1,
    // width: width * 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: width * 0.1,
    zIndex: -4,
    // padding:10,
  },

  label: {
    zIndex: -4,
    marginTop: width * -0.02,
    marginBottom: width * 0.02,
    color: 'black',
    position: 'relative',
    fontFamily: 'Poppins-Medium',
  },

  input: {
    width: width * 0.84,
    height: width * 0.1,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    borderRadius: width * 0.02,
    // paddingLeft: width * 0.01,
    paddingBottom: width * 0.02,
    borderColor: 'red',
    color: 'black',
    borderWidth: 1,
    outlineWidth: 0,
  },

  addresInput: {
    // width: width * 0.9,
    width: width * 0.84,
    height: width * 0.1,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    borderRadius: width * 0.02,
    // paddingLeft: width * 0.01,
    paddingBottom: width * 0.12,
    borderColor: 'red',
    color: 'black',
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    borderWidth: 1,
    outlineWidth: 0,
  },

  edit_content: {
    paddingRight: width * 0.03,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  edit: {
    position: 'absolute',
    width: width * 0.04,
    height: width * 0.04,
  },

  btnContainer_1: {
    width: width * 0.44,
    height: width * 0.13,
    borderRadius: width * 0.1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    zIndex: -4,
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.04,
    marginBottom: width * 0.15,
    borderWidth: 1,
    borderColor: 'white',
    outlineWidth: 0,
  },

  button: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },


});


