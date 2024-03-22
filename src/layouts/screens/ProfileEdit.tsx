
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderScreen from './HeaderScreen';
import { postMethod } from '../../utils/helper';


function ProfileEdit({ route }: any) {

    const { addressData } = route.params;
    console.log("PROFILE_EDIT", addressData);
    const [name, setName] = useState(addressData.name);
    const [email, setEmail] = useState(addressData.email);
    const [phone, setPhone] = useState(addressData.phone);
    const [address, setAddress] = useState(addressData.address);
    const [postal, setPostal] = useState(addressData.postal);
    const [unit, setUnit] = useState(addressData.unit);

    const handleUpdate = async () => {
        try {
            const updatedData = {
                id: addressData.id,
                name: name, // Provide the postal code value here
                email: email, // Provide the postal code value here
                phone: phone,
                address: address, 
                postal: postal,
                unit: unit,
                // ... other updated fields
            };

            const response: any = await postMethod('address/update', updatedData);
            if (response.status === 200) {
                console.log("UPDATE", "succeed");
            } else {
                console.log('Update Error:', response.data.message);
            }
        } catch (error) {
            console.log('Update Error:', error);
        }

    };


    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderScreen />
                <View style={styles.body} >
                    <View style={styles.mainCol}>
                        <View style={styles.main}>
                            <View style={styles.searchContianer}>
                                <Text style={styles.address} >
                                    Edit Address
                                </Text>
                                <View>
                                    <Pressable>
                                        <Ionicons name="close" size={30} color="red" />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.productsContainer} >
                                <View style={styles.products}>
                                    <Text style={styles.label} >
                                        Name
                                    </Text>
                                    <TextInput placeholder="Enter your name" style={styles.input}
                                        underlineColor="white"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput placeholder="Enter your email address" style={styles.input}
                                        underlineColor="white"
                                        value={email}  // Set the value to the state variable
                                        onChangeText={setEmail}
                                    />
                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Phone</Text>
                                    <TextInput placeholder="Enter your Phone number" style={styles.input}
                                        underlineColor="white"
                                        value={phone}  // Set the value to the state variable
                                        onChangeText={setPhone}
                                    />
                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Address</Text>
                                    <TextInput placeholder="Enter Your Address" style={styles.addresInput}
                                        underlineColor="white"
                                        value={address}  // Set the value to the state variable
                                        onChangeText={setAddress}
                                    />
                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Postal Code</Text>
                                    <TextInput placeholder="Enter your Postal code" style={styles.input}
                                        underlineColor="white"
                                        value={postal}  // Set the value to the state variable
                                        onChangeText={setPostal}
                                    />
                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Unit NO</Text>
                                    <TextInput placeholder="Enter your Unit No" style={styles.input}
                                        underlineColor="white"
                                        value={unit}  // Set the value to the state variable
                                        onChangeText={setUnit}
                                    />
                                </View>
                            </View>

                            <View style={styles.btnContainer_1}>
                                {/* {loading ? (
                                <ActivityIndicator size="large" color="white" />
                                ) : ( */}
                                <Pressable onPress={handleUpdate}>
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
export default ProfileEdit;


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: height * 0.05,
        // backgroundColor: 'white',
        backgroundColor: '#F1F1F1',
        width: width * 1,

    },

    searchContianer: {
        width: width * 0.85,
        alignSelf: 'center',
        flexDirection: 'row',
        // gap: 175,
        marginBottom: 25,
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor:'red',
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
        marginLeft: '5%',
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





// const cartValue = useSelector((state) => state.reducer);
// // const apiUrl = ' http://ykpt.braincave.work/api/v2/address/add';
// const token = useSelector((state) => state.authReducer.token);
// const authHeader = `Bearer  ${token}`;
// const resetNavigation = useNavigation();
// const [loading, setLoading] = useState(false);


// const [formData, setFormData] = useState({
//   name: '',
//   email: '',
//   phone: '',
//   address: '',
//   postal_code: '',
//   unit_no: '',
// });

// const onSubmit = async () => {
//   // console.log('token', authHeader);
//   try {
//     setLoading(true);

//     const response: any = await postMethod('address/add', formData, {
//       headers: {
//         Authorization: authHeader,
//       },
//     });
//     console.log(response);
//     if (response.status === 200) {
//       await storeData(response);
//       console.log(response.data);
//       navigation.navigate('ProfileAddress');
//       // resetNavigation.reset({
//       //   index: 0,
//       //   routes: [{name: 'ProfileAddress' }],
//       // });
//     }
//   } catch (error: any) {
//     console.log('Error:', error.message);
//   }
//   finally {
//     setLoading(false);
//   }
// };
// const handleChange = async (field: string, value: string) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     [field]: value,
//   }));

//   if (field === 'postal_code') {
//     try {
//       const response = await axios.get(
//         `https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y`
//       );

//       if (response.data && response.data.results.length > 0) {
//         // Update the address field in formData with the fetched address
//         const address = response.data.results[0].ADDRESS;
//         setFormData((prevData) => ({
//           ...prevData,
//           address: address,
//         }));
//       } else {
//         console.log('Postal code not found.');
//       }
//     } catch (error) {
//       console.log('Error fetching address:', error.message);
//     }
//   }
// };
