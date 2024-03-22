import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderScreen from './HeaderScreen';
import { FormPostMethod, getMethod, getStorageData, postMethod, storeData } from '../../utils/helper';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Snackbar from 'react-native-snackbar';
import Appbar from '../../components/Appbar';


function EditAddress({ navigation, route }: any) {

    const { control, handleSubmit, formState: { errors } } = useForm();


    // const { control, handleSubmit, formState: { errors } } = useForm();
    // const cartValue = useSelector((state) => state.reducer);

    const [loading, setLoading] = useState(false);

    const { addressData, id, name, phone, email, postalcode, unitno, address } = route.params;

    const [updatedname, setUpdatedname] = useState("");
    const [updatedemail, setUpdatedemail] = useState("");
    const [updatedphone, setUpdatedphone] = useState("");
    const [updatedpostalcode, setUpdatedpostalcode] = useState("");
    const [updatedaddress, setUpdatedaddress] = useState("");
    const [updatedunitno, setUpdatedunitno] = useState("");




    useEffect(() => {
        setUpdatedname(name);
        setUpdatedemail(email);
        setUpdatedphone(phone);
        setUpdatedpostalcode(postalcode);
        setUpdatedaddress(address);
        setUpdatedunitno(unitno);
    }, []);


    const fetchAddressBypc = async (postalCode: string) => {
        try {
            const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
            if (response.status === 200) {
                const addressInfo = response.data.results[0];
                setUpdatedaddress(addressInfo.ADDRESS);
                console.log("first")
            }
        } catch (error) {
            console.log('Error fetching address:', error);
        }
    };


    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('address_id', addressData.id);
        formData.append('name', updatedname);
        formData.append('email', updatedemail);
        formData.append('phone', updatedphone);
        formData.append('postal_code', updatedpostalcode);
        formData.append('address', updatedaddress);
        formData.append('unit_no', updatedunitno);


        console.log('Profile UPDATE---', formData);

        try {
            const response: any = await FormPostMethod('address/update', formData);

            if (response.status === 200) {
                console.log("fffffff", response.status)

                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.reset({
                    routes: [{ name: 'ProfileAddress' }]
                })
            } else {
                console.log('Profile update failed', response.data);
            }
        } catch (error) {
            console.log('Error while updating profile:', error);
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
                                <Text style={styles.address} >
                                    {/* {cartValue === 'CHINESE' ? Profile[0].chinese : Profile[0].english} */}
                                    Edit Address
                                </Text>
                                <View style={styles.cross}>
                                    <Pressable onPress={() => navigation.goBack()}>
                                        <Ionicons name="close" size={width * 0.1} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.productsContainer}>
                                <View style={styles.products}>

                                    <Text style={styles.label}>
                                        {/* {cartValue === 'CHINESE' ? Profile[1].chinese : Profile[1].english} */}
                                        Name
                                    </Text>
                                    <Controller
                                        control={control}
                                        render={({ field }) => (
                                            <TextInput placeholder="Enter your name" style={styles.input}
                                                underlineColor="white"
                                                value={updatedname}
                                                onChangeText={(text) => {
                                                    setUpdatedname(text);
                                                    field.onChange(text); // Manually trigger the onChange event
                                                }}
                                            />
                                        )}
                                        name="name"
                                        rules={{
                                            // required: 'Name is required' 
                                        }}
                                        defaultValue=""
                                    />
                                    {updatedname.length === 0 && errors.name && (
                                        <Text style={styles.error}>Name is required</Text>
                                    )}

                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label}>Email</Text>

                                    <TextInput placeholder="Enter your email address" style={styles.input}
                                        underlineColor="white"
                                        value={updatedemail}
                                        onChangeText={(text) => {
                                            setUpdatedemail(text);
                                            // field.onChange(text); // Manually trigger the onChange event
                                        }}
                                    />

                                </View>

                                <View style={styles.products}>
                                    <Text style={styles.label}>Phone</Text>

                                    <TextInput placeholder="Enter your Phone number" style={styles.input}
                                        underlineColor="white"
                                        keyboardType="numeric"
                                        value={updatedphone}
                                        onChangeText={(text) => {
                                            if (text.length <= 8) {
                                                setUpdatedphone(text);
                                                // field.onChange(text);
                                            }
                                        }}
                                    />
                                </View>

                                <View style={styles.products}>
                                    <Text style={styles.label}>Postal Code</Text>

                                    <TextInput
                                        placeholder="Enter your Postal code"
                                        style={styles.input}
                                        underlineColor="white"
                                        keyboardType="numeric"
                                        value={updatedpostalcode}

                                        onChangeText={(value) => {
                                            if (value.length <= 6) {
                                                setUpdatedpostalcode(value);
                                                // field.onChange(value);
                                                fetchAddressBypc(value) // Call fetchAddressBypc with the current postal code value
                                                    .then((addressInfo) => {
                                                        setUpdatedaddress(addressInfo.ADDRESS); // Update the address state with the fetched address
                                                    })
                                                    .catch((error) => {
                                                        console.log('Error fetching address:', error);
                                                    });
                                            }
                                        }}
                                    />


                                </View>
                                <View style={styles.products}>
                                    <Text style={styles.label} onPress={fetchAddressBypc}>Address</Text>

                                    <TextInput placeholder="Enter Your Address" style={styles.addresInput}
                                        multiline={true}
                                        underlineColor="white"
                                        value={updatedaddress}
                                        onChangeText={(text) => setUpdatedaddress(text)}
                                    />
                                </View>

                                <View style={styles.products}>
                                    <Text style={styles.label}>Unit NO</Text>

                                    <TextInput placeholder="Enter your Unit No" style={styles.input}
                                        underlineColor="white"
                                        keyboardType="numeric"
                                        value={updatedunitno}
                                        onChangeText={(text) => {
                                            setUpdatedunitno(text);
                                            // field.onChange(text);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.btnContainer_1}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="white" />
                                ) : (
                                    <Pressable
                                        onPress={handleSubmit(onSubmit)}
                                    >
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

export default EditAddress;

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
        width: width * 0.99,
        height: width * 2.2,
        alignSelf: 'center',
        zIndex: -4,
        marginBottom: 20,
        // marginLeft: -20,

        backgroundColor: '#F1F1F1',
        // backgroundColor: 'plum',
    },

    main: {
        width: width * 0.92,
        height: width * 1.7,
        alignSelf: 'center',
        zIndex: -4,
        // backgroundColor: 'red',
    },

    productsContainer: {
        alignSelf: 'center',
        marginBottom: width * -0.05,
        zIndex: -4,
        // backgroundColor:'red',
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
        backgroundColor: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03,
        borderRadius: width * 0.02,
        borderColor: 'red',
        color: 'black',
        borderWidth: 1,
        paddingLeft: 15, // Keep paddingLeft
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
        paddingLeft: 15, // Keep paddingLeft
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
        marginLeft: 10
    }


});


function fetchData() {
    throw new Error('Function not implemented.');
}

function setApiData(apiData: any) {
    throw new Error('Function not implemented.');
}

