import { ActivityIndicator, TouchableOpacity,Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

const Create = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);

    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [unitNo, setUnitNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();


    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const raw = {
                first_name: fname,
                last_name: lname,
                phone: phone,
                email: email,
                dob: dob,
                gender: gender,
                postal_code: postalCode,
                address: address,
                unit_no: unitNo,
                password: password,
                password_confirmation: confirmPassword
            };
            console.log("formData", raw)

            const response: any = await postMethod('auth/signup', raw);
            if (response.status === 200) {
                console.log("first", raw)
                console.log("200-response", response.data.message)

                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.navigate('LoginScreen')
                setLoading(false);

            } else {
                console.log("response-else", response.data.message)
                console.log("else the api")

                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
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
        <View>
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.title}>Create Your</Text>
                    <Text style={styles.title_1}>Account</Text>

                    {/* INPUT FOR FIRST NAME */}
                    <View style={styles.products}>
                        <Text style={styles.label}>
                            First Name
                        </Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your first name"
                                    style={styles.input}
                                    underlineColor="white"
                                    value={fname}
                                    onChangeText={(value) => {
                                        setfName(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="fname"
                            rules={{ required: 'First Name is required' }}
                            defaultValue=""
                        />
                        {errors.fname && <Text style={styles.error}>{errors.fname.message}</Text>}

                    </View>
                    {/* INPUT FOR FIRST NAME */}

                    {/* INPUT FOR LAST NAME */}
                    <View style={styles.products}>
                        <Text style={styles.label}>
                            Last Name
                        </Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your last name"
                                    style={styles.input}
                                    underlineColor="white"
                                    value={lname}
                                    onChangeText={(value) => {
                                        setlName(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="lname"
                            rules={{ required: 'Last Name is required' }}
                            defaultValue=""
                        />
                        {errors.lname && <Text style={styles.error}>{errors.lname.message}</Text>}

                    </View>
                    {/* INPUT FOR LAST NAME */}

                    {/* INPUT FOR EMAIL */}
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
                    {/* INPUT FOR EMAIL */}

                    {/* INPUT FOR PHONE */}
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
                    {/* INPUT FOR PHONE */}

                    {/* INPUT FOR DOB */}
                    <View style={styles.products}>
                        <Text style={styles.label}>DOB</Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your DOB" style={styles.input}
                                    underlineColor="white"
                                    value={dob}
                                    onChangeText={(value) => {
                                        setDob(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="dob"
                            rules={{
                                required: 'DOB is required',
                                //  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } 
                            }}
                            defaultValue=""
                        />
                        {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

                    </View>
                    {/* INPUT FOR DOB */}

                    {/* INPUT FOR GENDER. */}
                    <View style={styles.products}>
                        <Text style={styles.label}>Gender</Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your Gender" style={styles.input}
                                    underlineColor="white"
                                    value={gender}
                                    onChangeText={(value) => {
                                        setGender(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="gender"
                            rules={{
                                required: 'gender is required',
                                //  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } 
                            }}
                            defaultValue=""
                        />
                        {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}

                    </View>
                    {/* INPUT FOR GENDER. */}

                    {/* INPUT FOR POSTALCODE */}
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
                    {/* INPUT FOR POSTALCODE */}

                    {/* INPUT FOR ADDRESS */}
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
                    {/* INPUT FOR ADDRESS */}

                    {/* INPUT FOR UNIT NO. */}
                    <View style={styles.products}>
                        <Text style={styles.label}>Unit NO</Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your Unit No" style={styles.input}
                                    underlineColor="white"
                                    keyboardType="numeric"
                                    value={unitNo}
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
                    {/* INPUT FOR UNIT NO. */}

                    {/* INPUT FOR PASSWORD */}
                    <View style={styles.products}>
                        <Text style={styles.label}>Password</Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your Unit No" style={styles.input}
                                    underlineColor="white"
                                    keyboardType="numeric"
                                    value={password}
                                    onChangeText={(value) => {
                                        setPassword(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="password"
                            rules={{ required: 'password is required' }}
                            defaultValue=""
                        />
                        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

                    </View>
                    {/* INPUT FOR PASSWORD */}

                    {/* INPUT FOR PASSWORD */}
                    <View style={styles.products}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput placeholder="Enter your password" style={styles.input}
                                    underlineColor="white"
                                    keyboardType="numeric"
                                    value={confirmPassword}
                                    onChangeText={(value) => {
                                        setConfirmPassword(value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                            name="confirmPassword"
                            rules={{ required: 'password is required' }}
                            defaultValue=""
                        />
                        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

                    </View>
                    {/* INPUT FOR PASSWORD */}
                    <View style={styles.btnContainer_1}>

                        {loading ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} >
                                <Text style={styles.button}>SAVE</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Create



const width = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputText: {
        marginBottom: -15,
        width: width * 0.85,
        //   height: windowHeight * 0.08,
        // fontWeight: 700,
        backgroundColor: '#E3E3E3',
        color: 'black',
        fontFamily: 'Poppins-ExtraBold',
        borderBottomColor: '#E3E3E3',
        borderTopEndRadius: width * 0.04,
        borderTopLeftRadius: width * 0.04,
        borderRadius: width * 0.04,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        paddingTop: 55,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    button: {
        fontSize: width * 0.04,
        fontFamily: 'Poppins-Medium',
        color: 'white',
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
    title: {
        width: '100%',
        textAlign: 'left',
        fontFamily: 'Poppins-black',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 36,
        color: '#000000',
    },
    title_1: {
        width: '100%',
        fontWeight: '600',
        fontSize: 34,
        color: 'red',
        marginBottom: windowHeight * 0.03,
    },
})

function trigger(arg0: string) {
    throw new Error('Function not implemented.');
}

