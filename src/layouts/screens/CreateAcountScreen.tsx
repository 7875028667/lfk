import React, { useState } from 'react';
import { View, Button, Alert, ScrollView, StyleSheet, Dimensions, SafeAreaView, Text, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { postMethod, storeData } from '../../utils/helper';
import { TextInput } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const CreateAcountScreen = ({ navigation }: any) => {
  // const { control, handleSubmit, formState: { errors } } = useForm();
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const [loading, setloading] = useState(false);
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

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,

    });
  };


  // const validatePasswordsMatch = (value) => {
  //   const password = watch('password'); // Get the value of the password field
  //   if (value === password) {
  //     return true;
  //   }
  //   return 'Passwords do not match';
  // };



  const handleSignUp = async () => {
    try {
      const response = await postMethod('auth/signup', formData);

      if (response.data.status === true) {
        setloading(true);
        console.log("first",formData)
        console.log("first----",response.data)

        Alert.alert('Success', 'Registration successful.');
        storeData(formData);
        navigation.navigate("Login")
        setloading(false);
      } else {
        console.log("else formdata",formData)
        console.log("else----",response.data)
        reset();
        // Clear validation errors
        // Object.keys(errors).forEach((field) => {
        //   errors[field] = undefined;
        // });
        // Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      setloading(false);
      reset();
      // Clear validation errors
      Object.keys(errors).forEach((field) => {
        errors[field] = undefined;
      });
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const dateOfBirthIconSvg = `
    <svg width="20" height="18" viewBox="0 0 20 18" fill="#BBBBBB" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 12H14V14H16M16 8H14V10H16M18 16H10V14H12V12H10V10H12V8H10V6H18M8 4H6V2H8M8 8H6V6H8M8 12H6V10H8M8 16H6V14H8M4 4H2V2H4M4 8H2V6H4M4 12H2V10H4M4 16H2V14H4M10 4V0H0V18H20V4H10Z"/>
    </svg>
  `;

  const genderIconSvg = `<svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6C12 8.97 9.84 11.44 7 11.92V14H9V16H7V18H5V16H3V14H5V11.92C2.16 11.44 0 8.97 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0ZM6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2Z" fill="#BBBBBB"/>
  </svg>
  `;

  const postalIconSvg = `<svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 9C6.06087 9 7.07828 8.57857 7.82843 7.82843C8.57857 7.07828 9 6.06087 9 5C9 3.93913 8.57857 2.92172 7.82843 2.17157C7.07828 1.42143 6.06087 1 5 1C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5C1 6.06087 1.42143 7.07828 2.17157 7.82843C2.92172 8.57857 3.93913 9 5 9ZM5 9V21" stroke="#BBBBBB" stroke-width="2"/>
  </svg>
  `;

  const addressIconSvg = `<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 8C15.2833 8 15.521 7.904 15.713 7.712C15.905 7.52 16.0007 7.28267 16 7V5H18C18.2833 5 18.521 4.904 18.713 4.712C18.905 4.52 19.0007 4.28267 19 4C19 3.71667 18.904 3.479 18.712 3.287C18.52 3.095 18.2827 2.99934 18 3H16V1C16 0.71667 15.904 0.479003 15.712 0.287003C15.52 0.0950035 15.2827 -0.000663206 15 3.46021e-06C14.7167 3.46021e-06 14.479 0.0960034 14.287 0.288003C14.095 0.480003 13.9993 0.717337 14 1V3H12C11.7167 3 11.479 3.096 11.287 3.288C11.095 3.48 10.9993 3.71734 11 4C11 4.28334 11.096 4.521 11.288 4.713C11.48 4.905 11.7173 5.00067 12 5H14V7C14 7.28334 14.096 7.521 14.288 7.713C14.48 7.905 14.7173 8.00067 15 8ZM8 12C8.55 12 9.021 11.804 9.413 11.412C9.805 11.02 10.0007 10.5493 10 10C10 9.45 9.804 8.979 9.412 8.587C9.02 8.195 8.54933 7.99934 8 8C7.45 8 6.979 8.196 6.587 8.588C6.195 8.98 5.99933 9.45067 6 10C6 10.55 6.196 11.021 6.588 11.413C6.98 11.805 7.45067 12.0007 8 12ZM8 21.625C7.86667 21.625 7.73333 21.6 7.6 21.55C7.46667 21.5 7.35 21.4333 7.25 21.35C4.81667 19.2 3 17.204 1.8 15.362C0.6 13.52 0 11.7993 0 10.2C0 7.7 0.804333 5.70834 2.413 4.225C4.02167 2.74167 5.884 2 8 2C8.16667 2 8.33333 2.00434 8.5 2.013C8.66667 2.02167 8.83333 2.034 9 2.05V4.075C8.83333 4.04167 8.67067 4.02067 8.512 4.012C8.35333 4.00334 8.18267 3.99934 8 4C6.31667 4 4.89567 4.57934 3.737 5.738C2.57833 6.89667 1.99933 8.384 2 10.2C2 11.3833 2.49167 12.7377 3.475 14.263C4.45833 15.7883 5.96667 17.484 8 19.35C10.0333 17.4833 11.5417 15.7873 12.525 14.262C13.5083 12.7367 14 11.3827 14 10.2V10H16V10.2C16 11.8 15.4 13.521 14.2 15.363C13 17.205 11.1833 19.2007 8.75 21.35C8.65 21.4333 8.53333 21.5 8.4 21.55C8.26667 21.6 8.13333 21.625 8 21.625Z" fill="#BBBBBB"/>
  </svg>
  `;

  const unit_noSvg = ` <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 12H14V14H16M16 8H14V10H16M18 16H10V14H12V12H10V10H12V8H10V6H18M8 4H6V2H8M8 8H6V6H8M8 12H6V10H8M8 16H6V14H8M4 4H2V2H4M4 8H2V6H4M4 12H2V10H4M4 16H2V14H4M10 4V0H0V18H20V4H10Z" fill="#BBBBBB"/>
  </svg>
  `;


  const [showPassword, setShowPassword] = useState(false);


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
        handleInputChange('address', fullAddress);
        // handleChangeText('address', fullAddress); 
        setValue('postal_code', postalCode); // Update postal_code value  
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  return (
    <View>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.title}>Create Your</Text>
          <Text style={styles.title_1}>Account</Text>
          <View style={styles.mainContainer}>
            {/* Your form inputs */}

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (

                  <TextInput style={styles.inputText}
                    left={<TextInput.Icon icon="account" color="#BBBBBB" style={styles.passwordIcon} />}
                    placeholder="First Name"
                    value={formData.first_name}
                    onChangeText={(value) => {
                      handleInputChange('first_name', value)
                      field.onChange(value);
                    }
                    }
                  />
                )}
                name="first_name"
                rules={{ required: 'First name is required' }}
                defaultValue=""
              />
              {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}

            </View>
            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    left={<TextInput.Icon icon="account" color="#BBBBBB" style={styles.passwordIcon} />}
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChangeText={(value) => {
                      handleInputChange('last_name', value)
                      field.onChange(value);
                    }
                    }
                  />
                )}
                name="last_name"
                rules={{ required: 'Last name is required' }}
                defaultValue=""
              />
              {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}

            </View>
            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    left={<TextInput.Icon icon="phone" color="#BBBBBB" style={styles.passwordIcon} />}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    value={formData.phone}
                    onChangeText={(value) => {
                      handleInputChange('phone', value)
                      field.onChange(value);
                    }
                    }
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
            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChangeText={(value) => {
                      handleInputChange('email', value)
                      field.onChange(value);
                    }
                    }
                    left={<TextInput.Icon icon="email" color="#BBBBBB" style={styles.passwordIcon} />}
                  />
                )}
                name="email"
                rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                defaultValue=""
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            </View>


            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Date of Birth"
                    value={formData.dob}
                    // keyboardType="numeric"
                    onChangeText={(value) => {
                      handleInputChange('dob', value)
                      field.onChange(value);
                    }
                    }
                    left={<TextInput.Icon icon={() => <SvgXml xml={dateOfBirthIconSvg} color="black" />} color="#BBBBBB" style={styles.passwordIcon} />}
                  />
                )}
                name="dob"
                rules={{
                  required: 'DOB is required',
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                    message: 'Invalid date format (yyyy-mm-dd)',
                  },
                }}
                defaultValue=""
              />
              {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

            </View>
            {/* Your form inputs */}

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Postal Code"
                    keyboardType="numeric"
                    // value={formData.postal_code}
                    value={field.value} // Use the controlled value from react-hook-form

                    onChangeText={(value) => {
                      handleInputChange('postal_code', value)
                      field.onChange(value);
                      fetchAddressBypc(value);
                    }
                    }
                    left={<TextInput.Icon icon={() => <SvgXml xml={postalIconSvg} color="black" />} color="#BBBBBB" style={styles.passwordIcon} />}
                  />
                )}
                name="postal_code"
                rules={{
                  required: 'Postal code is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Postal code must be exactly 6 digits',
                  },
                }}
                defaultValue=""
              />
              {errors.postal_code && <Text style={styles.error}>{errors.postal_code.message}</Text>}

            </View>

            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputTextAddress}
                placeholder="Address"
                value={formData.address}
                multiline={true}
                onChangeText={(value) => handleInputChange('address', value)}
                left={<TextInput.Icon icon={() => <SvgXml xml={addressIconSvg} color="black" />} color="#BBBBBB" style={styles.passwordIcon} />}
              />
            </View>

            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputText}
                placeholder="Gender"
                value={formData.gender}
                onChangeText={(value) => handleInputChange('gender', value)}
                left={<TextInput.Icon icon={() => <SvgXml xml={genderIconSvg} color="black" />} style={styles.passwordIcon} />}
              />
            </View>


            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Unit No"
                    value={formData.unit_no}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      handleInputChange('unit_no', value)
                      field.onChange(value);
                    }
                    }
                    left={<TextInput.Icon icon={() => <SvgXml xml={unit_noSvg} color="black" />} color="#BBBBBB" style={styles.passwordIcon} />}
                  />
                )}
                name="unit_no"
                rules={{ required: 'Unit no is required' }}
                defaultValue=""
              />
              {errors.unit_no && <Text style={styles.error}>{errors.unit_no.message}</Text>}

            </View>
            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Password"
                    value={formData.password}
                    secureTextEntry={!showPassword}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      handleInputChange('password', value)
                      field.onChange(value);
                    }
                    }
                    left={<TextInput.Icon icon="lock" color="#BBBBBB" style={styles.passwordIcon} />}
                    right={
                      <TextInput.Icon color="#BBBBBB"
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                      />
                    }
                  />
                )}
                name="password"
                rules={{ required: 'Password is required' }}
                defaultValue=""
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            </View>

            {/* Your form inputs */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput style={styles.inputText}
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    secureTextEntry={!showPassword}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      handleInputChange('password_confirmation', value)
                      field.onChange(value);
                    }
                    }
                    left={<TextInput.Icon icon="lock" color="#BBBBBB" style={styles.passwordIcon} />}
                    right={
                      <TextInput.Icon color="#BBBBBB"
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                      />
                    }
                  />
                )}
                name="password_confirmation"
                rules={{
                  required: 'Password confirmation is required and should be same as above password',
                  // validate: validatePasswordsMatch, // Add the custom validation function
                }}

                defaultValue=""
              />
              {errors.password_confirmation && <Text style={styles.error}>{errors.password_confirmation.message}</Text>}


            </View>

            <View style={styles.btnContainer_1}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <TouchableOpacity onPress={handleSubmit(handleSignUp)} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 30 }}>
                  <Text style={styles.button}>SIGN UP</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.create_text}>
              <Text style={styles.password}> Already have an account ?</Text>
              <TouchableOpacity >
                <Text style={styles.create_One}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
    </View >
  );
};

export default CreateAcountScreen;
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
    marginBottom: windowHeight * 0.01,
  },

  inputText: {
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
  },
  inputTextAddress: {
    width: windowWidth * 0.9,
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
    width: windowWidth * 0.5,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: windowHeight * 0.015,
    borderRadius: 20,
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
    marginTop: windowWidth * -0.01,
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
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
    // borderRadius: 50,
  },
  error: {
    color: 'red'
  },
});