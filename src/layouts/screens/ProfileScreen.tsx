import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions, Button, ScrollView, Pressable } from 'react-native'
// import Navbar from '../../component/navbar';
// import Colors from '../../styles/Colors';
import { getMethod, getStorageData, postMethod } from '../../utils/helper';
import Modal from 'react-native-modal';
import { Avatar, RadioButton } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import Appbar from '../../components/Appbar';
const { width, height } = Dimensions.get('window');


interface ProfileData {
  id: number;
  name: string;
  avatar_original: string;
  phone: number;
}
const NewProfile = () => {

  const [profile, setProfile] = useState<ProfileData>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null)
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [checked, setChecked] = React.useState('first');


  const handleRadioButtonChange = (value: React.SetStateAction<string>) => {
    setChecked(value);
  };
  useFocusEffect(
    useCallback(() => {
      getdata(); 
    }, [])
  );


  const getdata = async () => {
    setLoading(true);
    const api: any = await getMethod(`profile`);
    if (api.status === 200) {
      console.log("profile_data", api.data.data)
      setLoading(false);
      setProfile(api.data)
      // console.log("........",profile?.user_details.avatar_original)
    }
  }


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
          <Avatar.Image size={85} source={{ uri: profile?.data.avatar_original }} style={styles.profileImage} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>Name</Text>
          <View style={styles.inputarea}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'gray'}
              value={profile?.data.name}
              placeholder="Enter email"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.name}>Phone</Text>
          <View style={styles.inputarea}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'gray'}
              value={profile?.data.phone}
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
              value={profile?.data.email}
              keyboardType={'numeric'}
              placeholder="Enter Phone No"
              underlineColorAndroid="transparent"
            />
          </View>

          {/* <Pressable style={styles.button}
            onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.save}>Edit Details</Text>
          </Pressable> */}



          <Pressable style={styles.button}
            onPress={() => navigation.navigate('EditProfileScreen', {
              name: profile?.data.name,
              number: profile?.data.phone,
              email: profile?.data.email,
              avatar: profile?.data.avatar_original,
            })}>
            <Text style={styles.save}>Edit Details</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default NewProfile;
const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor: 'white'
  },
  img_3: {

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
