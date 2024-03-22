import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { FormPostMethod, postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';



const SignUp = ({ navigation }: any) => {

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();


    const [text, setText] = useState('');
    const [loading, setloading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [postalCode, setPostalCode] = useState(''); // Separate state for postal code
    const [address, setAddress] = useState('');



    const handleChangePostalCode = (text) => {
        setPostalCode(text);
    };

    const handleChangeAddress = (text) => {
        setAddress(text);
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const fetchAddressBypc = async (postalCode: string) => {
        try {
            const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
            if (response.status === 200) {
                console.log("ONEMAP")
                const addressInfo = response.data.results[0];
                const fullAddress = addressInfo.ADDRESS;
                console.log("first", fullAddress);
                // handleChangeText('postal_code', postalCode);
                // handleChangeText('address', fullAddress);

                // setValue('address', fullAddress);
                handleChangePostalCode(postalCode);
                setAddress(fullAddress);


            }
        } catch (error) {
            console.log('Error fetching address:', error);
        }
    };



    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        dob: '',
        gender: '',
        postal_code: '',
        address: '',
        unit_no: '',
        password: '',
        password_confirmation: '',
    });

    const handleChangeText = (fieldName, text) => {
        // setFormData({ ...formData, [fieldName]: text });
        if (fieldName === 'postal_code') {
            setFormData({ ...formData, postal_code: text });
        } else if (fieldName === 'address') {
            setFormData({ ...formData, address: text });
        } else {
            setFormData({ ...formData, [fieldName]: text });
        }
    };


    const onSubmit = async (data: any) => {
        console.log('signup---');
        console.log('formData:', formData);
        try {
            const response: any = await postMethod('auth/signup', formData);

            if (response.data.status === true) {
                setloading(true);
                console.log("fffffff", response.status)
                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                setloading(false);

            } else {
                setloading(true);
                console.log('signup-failed', response.data);
                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
                setloading(false);
            }
        } catch (error) {
            setloading(false);
            console.log('Error while updating profile:', error);
        }
    };


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <View style={styles.body}>
                    <TouchableOpacity
                    //  onPress={fetchAddressBypc}
                    >
                        {/* <Text>fetch onemap api</Text> */}
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Your</Text>
                    <Text style={styles.title_1}>Account</Text>
                    <View style={styles.mainContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="First Name"
                                underlineColor="white"
                                left={<TextInput.Icon icon="account" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.first_name}
                                onChangeText={(text) => handleChangeText('first_name', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Last Name"
                                underlineColor="white"
                                left={<TextInput.Icon icon="account" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.last_name}
                                onChangeText={(text) => handleChangeText('last_name', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Phone"
                                underlineColor="white"
                                keyboardType="numeric"
                                left={<TextInput.Icon icon="phone" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.phone}
                                onChangeText={(text) => handleChangeText('phone', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Email"
                                underlineColor="white"
                                left={<TextInput.Icon icon="email-outline" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.email}
                                onChangeText={(text) => handleChangeText('email', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="DOB"
                                underlineColor="white"
                                keyboardType="numeric"
                                left={<TextInput.Icon icon="calendar" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.dob}
                                onChangeText={(text) => handleChangeText('dob', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Gender"
                                underlineColor="white"
                                left={<TextInput.Icon icon="gender-male-female" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.gender}
                                onChangeText={(text) => handleChangeText('gender', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Postal Code"
                                // keyboardType="numeric"
                                underlineColor="white"
                                left={<TextInput.Icon icon="badge-account-horizontal-outline" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.postalCode}
                                onChangeText={(text) => {
                                    handleChangePostalCode(text);
                                    fetchAddressBypc(text);
                                }}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Address"
                                underlineColor="white"
                                left={<TextInput.Icon icon="google-maps" color="#BBBBBB" style={styles.passwordIcon} />}
                                // value={address}
                                // onChangeText={(text) => handleChangeText('fullAddress', text)}
                                // value={address}
                                // onChangeText={(text) => handleChangeAddress(text)}
                                value={formData.address} // Use the address state variable here
                                onChangeText={(text) => handleChangeAddress(text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Unit No."
                                keyboardType="numeric"
                                underlineColor="white"
                                left={<TextInput.Icon icon="office-building-marker" color="#BBBBBB" style={styles.passwordIcon} />}
                                value={formData.unit_no}
                                onChangeText={(text) => handleChangeText('unit_no', text)}

                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Password"
                                keyboardType="numeric"
                                underlineColor="white"
                                left={<TextInput.Icon icon="lock" color="#BBBBBB" style={styles.passwordIcon} />}
                                secureTextEntry={!showPassword}
                                right={<TextInput.Icon color="#BBBBBB" icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                                value={formData.password}
                                onChangeText={(text) => handleChangeText('password', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Confirm Password"
                                keyboardType="numeric"
                                underlineColor="white"
                                left={<TextInput.Icon icon="lock" color="#BBBBBB" style={styles.passwordIcon} />}
                                secureTextEntry={!showPassword}
                                right={<TextInput.Icon color="#BBBBBB" icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                                value={formData.password_confirmation}
                                onChangeText={(text) => handleChangeText('password_confirmation', text)}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.btnContainer_1}>
                            {loading ? (
                                <ActivityIndicator size="large" color="white" />
                            ) : (
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 40 }} onPress={onSubmit}>
                                    <Text style={styles.button}>Sign Up</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.create_text}>
                            <Text style={styles.password}> Already have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.create_One}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        paddingTop: 55,
        paddingLeft: windowWidth * 0.05,
        paddingRight: windowWidth * 0.05,
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
        textAlign: 'left',
        // fontFamily: 'Poppins_900ExtraBold',
        fontWeight: '600',
        fontSize: 34,
        lineHeight: 36,
        color: 'red',
        marginBottom: windowHeight * -0.02,
    },

    mainContainer: {
        width: windowWidth * 0.92,
        alignItems: 'center',
        marginBottom: windowHeight * 0.04,
        marginTop: windowHeight * 0.06,
    },

    inputContainer: {
        width: '100%',
        height: windowWidth * 0.21,
        marginBottom: -15,
    },

    inputText: {
        marginBottom: -15,
        width: windowWidth * 0.85,
        //   height: windowHeight * 0.08,
        // fontWeight: 700,
        backgroundColor: '#E3E3E3',
        color: 'black',
        fontFamily: 'Poppins-ExtraBold',
        borderBottomColor: '#E3E3E3',
        borderTopEndRadius: windowWidth * 0.04,
        borderTopLeftRadius: windowWidth * 0.04,
        borderRadius: windowWidth * 0.04,
    },
    inputTextAddress: {
        //   width: windowWidth * 0.9,
        // height: windowHeight * 0.08,
        backgroundColor: '#E3E3E3',
        color: 'black',
        fontFamily: 'Poppins-ExtraBold',
        borderBottomColor: '#E3E3E3',
        borderTopEndRadius: windowWidth * 0.04,
        borderTopLeftRadius: windowWidth * 0.04,
        borderRadius: windowWidth * 0.04,
    },

    inputGender: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.08,
        // fontWeight: 700,
        backgroundColor: '#E3E3E3',
        color: 'black',
        fontFamily: 'Poppins-ExtraBold',
        borderBottomColor: '#E3E3E3',
        borderTopEndRadius: windowWidth * 0.04,
        borderTopLeftRadius: windowWidth * 0.04,
        borderRadius: windowWidth * 0.04,
        paddingLeft: 25,
        paddingRight: 5,
    },

    passwordIcon: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.07,
        // backgroundColor: '#D9D9D9',
        borderRadius: 5,
        // marginLeft: -0.1,
    },


    btnContainer_1: {
        width: windowWidth * 0.4,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginBottom: windowHeight * 0.015,
        borderRadius: 40,
        padding: 8,
    },

    text: {
        width: 'auto',
        height: windowHeight * 0.1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        fontSize: 5,
        fontWeight: '900',
    },

    create_text: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        color: '#515151',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 5,
        fontSize: windowWidth * 0.03,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: windowWidth * 0.01,
        marginBottom: windowWidth * 0.05,
    },

    create_One: {
        color: 'red',
        fontWeight: '900',
        fontSize: windowWidth * 0.03,
        // fontFamily: 'Poppins_600SemiBold',
    },

    password: {
        fontWeight: '500',
        color: '#515151',
    },

    button: {
        fontSize: windowWidth * 0.04,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        textAlign: 'center',
    },
    error: {
        color: 'red'
    },
});