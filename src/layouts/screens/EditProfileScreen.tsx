import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions, Button, ScrollView, Pressable } from 'react-native'
// import Navbar from '../../component/navbar';
// import Colors from '../../styles/Colors';
import { FormPostMethod, getMethod, getStorageData, storeData, } from '../../utils/helper';
import { Avatar, RadioButton } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
const { width, height } = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';



const EditProfileScreen = ({ route }: any) => {
    const [loading, setLoading] = useState(true);

    const [fullName, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailId, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const { name, email, number, avatar } = route.params;
    useEffect(() => {
        setName(name);
        setPhone(number);
        setEmail(email);
        setImageUrl(avatar);
    }, []);
    const navigation = useNavigation();

    const EditProfile = async () => {
        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('phone', phone);
        formData.append('email', emailId);
        formData.append('image', {
            uri: imageUrl,  // Use the image path
            type: 'image/jpg', // Adjust the type as needed based on the image format
            name: 'profile.jpg', // Adjust the name as needed
        });
        console.log("formData", imageUrl)

        try {
            const api: any = await FormPostMethod(`update-profile`, formData);
            if (api.status === 200) {
                console.log("api", api.data);
                setLoading(false);
                const existingUserData = await getStorageData();
                const updatedUserDetails = {
                    ...existingUserData.user, // Keep existing data
                    name: fullName,           // Update first_name
                    phone: phone,
                    email: email,         // Update mobile_number
                    avatar_original: imageUrl || existingUserData.user.avatar, // Update avatar or keep the existing avatar
                };
                const updatedUserData = {
                    ...existingUserData,
                    user: updatedUserDetails,
                };
                await storeData(updatedUserData);
                navigation.navigate('TabNavigation');
            } else {
                setLoading(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
            }
        }
        catch (e) {
            Snackbar.show({
                text: "Some Error Occured" + e,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
        }

    }
    const imageUpload = async () => {
        console.log("hiiii")
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            });

            // Check if the image was selected successfully
            if (image && image.path) {
                setImageUrl(image.path);
            } else {
                // Handle the case when the user didn't pick any image
                console.log('No image selected');
            }
        } catch (error) {
            // Handle any errors that might occur during image selection
            console.log('Error selecting image:', error);
        }

    };
    return (

        <View style={styles.cover}>
            <Pressable onPress={() => navigation.dispatch(CommonActions.goBack())} style={styles.hamburger}>
                <IonIcon
                    name="arrow-back"
                    size={26}
                    color={'red'}
                // style={styles.img_3}
                />
            </Pressable>
            <View>
                <View style={styles.profile}>
                    <Avatar.Image size={85} source={{ uri: imageUrl || avatar }} style={styles.profileImage} />
                    <Pressable style={styles.camera} onPress={() => imageUpload()}>
                        <IonIcon
                            name="camera"
                            size={26}
                            color='black'
                        // style={styles.img_3}
                        />
                    </Pressable>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>Name</Text>
                    <View style={styles.inputarea}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'gray'}
                            value={fullName}
                            onChangeText={fullName => setName(fullName)}
                            placeholder="Enter email"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Text style={styles.name}>Phone</Text>
                    <View style={styles.inputarea}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'gray'}
                            value={phone}
                            onChangeText={phone => setPhone(phone)}
                            keyboardType={'numeric'}
                            placeholder="Enter Phone No"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Text style={styles.name}>Email</Text>
                    <View style={styles.inputarea}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'gray'}
                            value={emailId}
                            onChangeText={emailId => setEmail(emailId)}
                            keyboardType={'numeric'}
                            placeholder="Enter Email Id"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <Pressable style={styles.button} onPress={() => EditProfile()}>
                        <Text style={styles.save}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default EditProfileScreen;
const styles = StyleSheet.create({
    cover: {
        flex: 1,
        backgroundColor: 'white'
    },
    camera: {
        position: 'absolute',
        top: 60,
        left: 60
    },
    hamburger: {
        marginLeft: 20,
        marginTop: 20
    },
    info: {
        padding: 14
    },
    input: {
        color: 'black'
    },
    profile: {
        alignSelf: 'center',
        marginBottom: 50
    },
    profileImage: {
        height: width * 0.2,
        width: width * 0.2,
    },
    welcomeText: {
        position: 'absolute',
        top: "8%",
        left: '35%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '65%',
    },
    language: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentDiv: {
        paddingBottom: '10%',
        borderWidth: 1,
        borderColor: 'grey',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        height: width * 0.4,
        marginTop: "5%",
    },
    contentDiv2: {
        paddingBottom: '10%',
        paddingTop: '5%',
        borderWidth: 1,
        borderColor: 'grey',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    earningText: {
        fontSize: width * 0.06,
        marginLeft: 20,
        fontWeight: "600",
    },
    earningView: {
        width: "80%",
        backgroundColor: '#E8E8E8',
        marginLeft: "10%",
        borderRadius: 20,
        paddingBottom: 15,
        borderColor: 'grey',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 20
        // marginTop: width * 0.2
    },
    earnings: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    earnings1: {
        borderWidth: 1,
        borderColor: 'grey',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '33%'
    },
    earnings1Text: {
        fontSize: width * 0.04,
        // fontWeight: 'bold',
        color: '#515151'
    },
    earnings1Text2: {
        fontSize: width * 0.035,
        // fontWeight: 500,
        color: '#EC1C24'
    },

    earnings2: {
        borderWidth: 1,
        borderColor: 'grey',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '30%'
    },

    earnings3: {
        display: 'flex',
        paddingLeft: 10,
        width: '33%',
    },
    startButton: {
        backgroundColor: '#F26722',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    startButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalOrder: {
        marginTop: 30,
        marginLeft: '10%',
        width: '80%',
    },
    totalOrderText: {
        marginBottom: 20,
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    box: {
        backgroundColor: 'red',
        width: width * 0.38,
        height: height * 0.23,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    boxnoText: {
        fontSize: width * 0.08,
        color: 'white',
        fontWeight: "bold",
    },
    boxContentText: {
        fontSize: width * 0.036,
        color: 'white',
        fontWeight: "bold"
    },
    boxLast: {
        marginBottom: 100,
        paddingBottom: 100,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.3, // Adjust the height as needed
    },
    modalText: {
        fontSize: width * 0.04,
        textAlign: 'center',
    },
    button: {
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 40,
        marginTop: 40,
        backgroundColor: '#EC1C24',
        borderColor: '#EC1C24',
    },
    save: {
        color: 'white',
        fontSize: 18
    },
    inputarea: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        paddingLeft: 10,
        borderRadius: 15,
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
        color: 'black'
    }
})
