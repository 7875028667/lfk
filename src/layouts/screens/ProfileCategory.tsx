import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView, ActivityIndicator, } from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postMethod, storeData } from '../../utils/helper';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appbar from '../../components/Appbar';



function ProfileCategory({ navigation }: any) {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  // const cartValue = useSelector((state) => state.reducer);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [unitNo, setUnitNo] = useState('');



  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = {
        name: name,
        email: email,
        phone: phone,
        postal_code: postalCode,
        address: address,
        unit_no: unitNo,
      };

      const response:any = await postMethod('address/add', formData);

      if (response.status === 200) {
        Snackbar.show({
          text: response.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });


        const newAddressData = {
          name: name,
          email: email,
          phone: phone,
          postal_code: postalCode,
          address: address,
          unit_no: unitNo,
        };
        const storedAddresses = await AsyncStorage.getItem('addresses');
        const parsedAddresses = storedAddresses ? JSON.parse(storedAddresses) : [];
        parsedAddresses.push(newAddressData);
        await AsyncStorage.setItem('addresses', JSON.stringify(parsedAddresses));
        navigation.reset({
          routes: [{ name: 'ProfileAddress' }]
        })
      } else {
        console.log("else the api")
      }
    } catch (error) {
      console.log("catch the api")
    } finally {
      setLoading(false);
    }
  }
  const fetchAddressBypc = async (postalCode: string) => {
    try {
      const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
      if (response.status === 200) {
        const addressInfo = response.data.results[0];
        console.log("ONEMAP")
        setAddress(addressInfo.ADDRESS);
        trigger('address');
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
       <Appbar/>
        <View style={styles.body} >
          <View style={styles.mainCol}>

            <View style={styles.main}>
              <View style={styles.searchContianer}>
                {/* <TouchableOpacity> */}
                <Text style={styles.address}>
                  {/* {cartValue === 'CHINESE' ? Profile[0].chinese : Profile[0].english} */}
                  Add new addess
                </Text>
                {/* </TouchableOpacity> */}
                <View>
                  <View style={styles.cross}>
                    <Pressable onPress={() => navigation.goBack()}>
                      <Ionicons name="close" size={width * 0.1} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.productsContainer} >
                <View style={styles.products}>
                  <Text style={styles.label}>
                    Name
                  </Text>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput placeholder="Enter your name"
                        style={styles.input}
                        underlineColor="white"
                        value={name}
                        // onChangeText={(value) => setName(value)}
                        onChangeText={(value) => {
                          setName(value);
                          field.onChange(value);
                        }}
                      />
                    )}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    defaultValue=""
                  />
                  {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

                </View>

                <View style={styles.products}>
                  <Text style={styles.label}>Email</Text>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput placeholder="Enter your email address" style={styles.input}
                        underlineColor="white"
                        value={email}
                        onChangeText={(value) => {
                          setEmail(value);
                          field.onChange(value);
                        }}
                      />
                    )}
                    name="email"
                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                    defaultValue=""
                  />
                  {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                </View>


                <View style={styles.products}>
                  <Text style={styles.label}>Phone</Text>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput placeholder="Enter your Phone number" style={styles.input}
                        underlineColor="white"
                        keyboardType="numeric"
                        value={phone}
                        // onChangeText={(value) => setPhone(value)}
                        onChangeText={(value) => {
                          if (value.length <= 8) {
                            setPhone(value);
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                    name="phone"
                    rules={{
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\d{8}$/,
                        message: 'Phone number must be exactly 8 digits',
                      },
                    }}
                    defaultValue=""
                  />
                  {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}


                </View>

                <View style={styles.products}>
                  <Text style={styles.label}>Postal Code</Text>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput placeholder="Enter your Postal code" style={styles.input}
                        underlineColor="white"
                        keyboardType="numeric"
                        value={postalCode}

                        onChangeText={(value) => {
                          if (value.length <= 6) {
                            setPostalCode(value);
                            field.onChange(value);
                            fetchAddressBypc(value) // Call fetchAddressBypc with the current postal code value
                              .then((addressInfo) => {
                                setAddress(addressInfo.ADDRESS); // Update the address state with the fetched address
                              })
                              .catch((error) => {
                                console.log('Error fetching address:', error);
                              });
                          }
                        }}
                      />
                    )}
                    name="postalCode"
                    rules={{
                      required: 'Postal code is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Postal code must be exactly 6 digits',
                      },
                    }}
                    defaultValue=""
                  />
                  {errors.postalCode && <Text style={styles.error}>{errors.postalCode.message}</Text>}
                </View>


                <View style={styles.products}>
                  <Text style={styles.label}>Address</Text>

                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        placeholder="Enter Your Address"
                        style={styles.addresInput}
                        underlineColor="white"
                        value={address}
                        multiline={true}
                        onChangeText={(value) => {
                          setAddress(value);
                          field.onChange(value);
                        }}

                      />
                    )}
                    name="address"
                    rules={{ minLength: { value: 1, message: 'Address is required' } }}
                    defaultValue=""
                  />
                  {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}


                </View>

                <View style={styles.products}>
                  <Text style={styles.label}>Unit NO</Text>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <TextInput placeholder="Enter your Unit No" style={styles.input}
                        underlineColor="white"
                        keyboardType="numeric"
                        value={unitNo}
                        // onChangeText={(value) => setUnitNo(value)}
                        onChangeText={(value) => {
                          setUnitNo(value);
                          field.onChange(value);
                        }}
                      />
                    )}
                    name="unitNo"
                    rules={{ required: 'Unit no is required' }}
                    defaultValue=""
                  />
                  {errors.unitNo && <Text style={styles.error}>{errors.unitNo.message}</Text>}

                </View>
              </View>

              <View style={styles.btnContainer_1}>
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Pressable onPress={handleSubmit(onSubmit)} >
                    <Text style={styles.button}>SAVE</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileCategory;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: height * 0.05,
    backgroundColor: 'white',
  },

  searchContianer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 175,
    marginBottom: 25,
  },

  address: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 30
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
    width: width * 0.94,
    height: width * 2.2,
    alignSelf: 'center',
    zIndex: -4,
    // marginLeft: -20,

    backgroundColor: '#F1F1F1',
  },

  main: {
    width: width * 0.92,
    height: width * 1.7,
    alignSelf: 'center',
    zIndex: -4,
    backgroundColor: '#F1F1F1',
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
    // backgroundColor:'yellow'
  },

  label: {
    zIndex: -4,
    marginTop: width * -0.02,
    marginBottom: width * 0.02,
    color: 'black',
    // position: 'relative',
    fontFamily: 'Poppins-Medium',
  },

  input: {
    width: width * 0.85,
    // height: width * 0.1,
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
    width: width * 0.85,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    borderRadius: width * 0.02,
    borderColor: 'red',
    color: 'black',
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
  error: {
    color: 'red'
  },
  cross: {
    marginTop: 25,
    marginLeft: -20
  }


});


function fetchData() {
  throw new Error('Function not implemented.');
}

function setApiData(apiData: any) {
  throw new Error('Function not implemented.');
}

function trigger(arg0: string) {
  throw new Error('Function not implemented.');
}

