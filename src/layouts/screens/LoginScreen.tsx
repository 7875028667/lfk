import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Pressable,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { postMethod, storeData } from '../../utils/helper';
import { Controller, useForm } from 'react-hook-form';
import { setToken } from '../../reduxFolder/action';
import { useDispatch } from 'react-redux';
import Snackbar from 'react-native-snackbar';


export const LoginScreen = ({ navigation }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiEmail, setApiEmail] = useState('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i');
    const dispatch = useDispatch();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data: any) => {
        const { email, password } = data;
        try {
            setLoading(true);
            const raw = {
                email: email,
                password: password,
            };
            const api: any = await postMethod('auth/login', raw);
            if (api.status === 200) {
                // console.log("api.data",api.data);
                await storeData(api.data);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.navigate('DrawerNavigator');
                setApiEmail(api.data.user.email);
                const result = api.data;
                dispatch(setToken(result.access_token));
            } else {
                console.log('else');
                setApiEmail(email);
                if (apiEmail && api.status === 200) {
                    Alert.alert('inValid email and password');
                }
                console.log('EMAIL:', email, 'PASSWORD:', password);

            }
        } catch (error: any) {
            console.log('catch', error);
        }
        finally {
            setLoading(false);
        }
    };

    const registration = () => {
        navigation.navigate('Create')
    }

    return (
        <View style={styles.body}>
            <View>
                {/* <Text style={{fontSize:25}} onPress={()=> navigation.navigate('Signup')}>Create account</Text> */}
                <Text style={styles.title}>Welcome To</Text>
                <Text style={styles.title_1}>LFK</Text>
            </View>
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputText}
                            label="Email Address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={value}
                            onChangeText={(text) => {
                                setEmail(text);
                                onChange(text);
                            }}
                            onBlur={onBlur}
                            underlineColor="white"
                            left={<TextInput.Icon icon="email" style={styles.email} />}
                        />
                    )}
                    name="email"
                    defaultValue=""
                />
                {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputText}
                            label="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={value}
                            underlineColor="white"
                            onBlur={onBlur}
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => {
                                setPassword(text);
                                onChange(text);
                            }}
                            left={<TextInput.Icon icon="lock" style={styles.passwordIcon} />}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? 'eye-off' : 'eye'}
                                    onPress={togglePasswordVisibility}
                                />
                            }
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
                <View style={styles.pass}>
                    <TouchableOpacity>
                        <Text style={styles.password}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable>
                        <Text style={styles.text}>LOGIN WITH FACEBOOK</Text>
                    </Pressable>
                </View>
                <View style={styles.btnContainer_1}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Pressable onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.text}>Sign In</Text>
                        </Pressable>
                    )}
                </View>
            </View>
            <View style={styles.create_text}>
                <Text style={styles.password}>Don’t have an account?</Text>
                <TouchableOpacity onPress={registration}>
                    <Text style={styles.create_One}>Create one</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: windowWidth * 0.05,
        paddingRight: windowWidth * 0.05,
    },

    title: {
        width: '100%',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 36,
        color: '#000000',
    },

    title_1: {
        width: '100%',
        textAlign: 'left',
        fontFamily: 'Poppins_Bold',
        fontWeight: '600',
        fontSize: 34,
        lineHeight: 36,
        color: 'red',
        marginBottom: windowHeight * 0.02,
    },

    inputContainer: {
        width: '100%',
        marginBottom: windowHeight * 0.01,
        height: windowHeight * 0.12,
    },

    inputText: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.08,
        backgroundColor: '#E3E3E3',
        color: '#515151',
        fontFamily: 'Poppins-ExtraBold',
        borderBottomColor: '#E3E3E3',
        outlinewindowWidth: 0,
        borderTopEndRadius: windowWidth * 0.04,
        borderTopLeftRadius: windowWidth * 0.04,
        borderRadius: windowWidth * 0.04,
        marginBottom: 2,
    },

    email: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.07,
        // backgroundColor: '#D9D9D9',
        borderRadius: 5,
        // marginLeft: -0.1,
    },

    passwordIcon: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.07,
        // backgroundColor: '#D9D9D9',
        borderRadius: 5,
        // marginLeft: -0.1,
    },
    errorText: {
        color: 'red',
        marginTop: 3,
        fontFamily: 'Poppins-Regular',
    },
    pass: {
        height: windowHeight * 0.05,
        marginTop: windowHeight * -0.01,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2,
    },
    password: {
        fontWeight: '500',
        color: '#515151',
        fontFamily: 'Poppins-Bold',
    },

    btnContainer: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.06,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 0.3,
        marginTop: windowHeight * 0.17,
        fontSize: 0.04,
        fontWeight: '900',
        position: 'absolute',
        backgroundColor: '#2374F2',
        borderRadius: windowWidth * 0.28,
        marginBottom: windowHeight * 0.3,
    },

    btnContainer_1: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.06,
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.27,
        fontSize: 0.04,
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: windowWidth * 0.28,
        fontWeight: '900',
        marginBottom: windowHeight * 0.08,
    },
    text: {
        fontWeight: '700',
        color: 'white',
        fontFamily: 'Poppins_ExtraBold',
    },
    create_text: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        color: '#515151',
        marginTop: windowHeight * 0.22,
        marginBottom: windowHeight * -0.15,
        alignSelf: 'center',
        alignItems: 'center',
        gap: 5,
        fontSize: windowWidth * 0.03,
        fontFamily: 'Poppins_Bold',
    },
    create_One: {
        color: 'red',
        fontWeight: '500',
        fontSize: windowWidth * 0.03,
        fontFamily: 'Poppins-Bold',
    },
});
