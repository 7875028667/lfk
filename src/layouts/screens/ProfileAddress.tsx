import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import HeaderScreen from './HeaderScreen';
import { getMethod, getStorageData, postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import Appbar from '../../components/Appbar';


function ProfileAddress({ navigation }: any) {


  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [userDetails, setUserDetails] = useState()
  const [apiData, setApiData] = useState([]);
  const dispatch = useDispatch();
  const addressData = useSelector(state => state.addressData); // Get address data from Redux store
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchData();
    getStoredData();
  }, []);


  const onRefresh = () => {
    setRefreshing(true);
    fetchData(); // Fetch data again
    setRefreshing(false);
  };

  const getStoredData = async () => {

    try {

      const storedData = await getStorageData();
      setUserDetails(storedData)
      console.log("address stored-data", storedData)

    }
    catch (error) {
      console.log('Error retrieving images:', error);
    }
  };

  const fetchData = async () => {
    try {
      const api: any = await getMethod('address/all-address');
      if (api.status === 200) {
        const apiData = api.data.data;
        setApiData(apiData);
        setIsLoading(false)

      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  };


  const handleEditAddress = (dataItem: any) => {
    console.log("EDIT-data", dataItem)
    console.log("EDIT-DATA-ID:", dataItem.id);
    navigation.navigate('EditAddress', {
      addressData: dataItem,
      id: dataItem.id,
      name: dataItem.name,
      email: dataItem.email,
      phone: dataItem.phone,
      postalcode: dataItem.postal_code,
      address: dataItem.address,
      unitno: dataItem.unit_no

    });


  };

  const deleteAddress = async (dataItem: any) => {
    console.log("DELETE-DATA:", dataItem);
    console.log("DELETE-DATA:", dataItem.id);

    
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const api: any = await getMethod(`address/delete?address_id=${dataItem.id}`);
              if (api.status === 200) {
                console.log("API Response:", api.data);
  
                Snackbar.show({
                  text: 'Address deleted successfully!',
                  duration: Snackbar.LENGTH_SHORT,
                  textColor: 'white',
                  backgroundColor: 'green',
                });
                navigation.reset({
                        routes: [{ name: 'ProfileAddress' }]
                      })
              } else {
                console.log('API Error:', api.data.message);
              }
            } catch (e) {
              console.log('Error while deleting:', e);
            }
          },
        },
      ],
      { cancelable: true }
    );

  }


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <ScrollView
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
         <Appbar/>
          <View style={styles.body}>
            <View style={styles.searchContianer}>
              <Text style={styles.address}>Address</Text>
              <View>
                <Pressable onPress={() => navigation.navigate('ProfileCategory')}>
                  <Text style={styles.addressButton}>Add New Address</Text>
                </Pressable>
              </View>
            </View>


            {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                  {apiData.map((dataItem) => (
                    <View style={styles.container} key={dataItem.id}>
                      <View style={styles.cart_contentEdit}>
                        <Pressable
                          onPress={() => handleEditAddress(dataItem)}
                        >
                          <Text style={styles.titleEdit}>Edit</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => deleteAddress(dataItem)} >
                          <Text style={styles.titleEdit0}>Delete</Text>
                        </Pressable>
                      </View>
                      <View style={styles.cart_contentTitle} key={dataItem.id}>
                        <Text style={styles.title}>{dataItem.name}</Text>
                        <Ionicons
                          name="call"
                          size={16}
                          color="red"
                          style={styles.phone}
                        />
                        <Text style={styles.number}>+{dataItem.phone}</Text>
                      </View>
                      <View style={styles.cart_email}>
                        <Ionicons
                          name="mail-unread-outline"
                          size={18}
                          color="red"
                        // style={styles.add_img}
                        />
                        <Text style={styles.title_1}>{dataItem.email}</Text>
                      </View>
                      <View style={styles.cart_email}>
                        <Ionicons
                          name="location-outline"
                          size={18}
                          color="red"
                          style={styles.add_img}
                        />
                        <Text style={styles.title_2}>{dataItem.address}</Text>
                      </View>
                      <View style={styles.cart_email}>
                        <Ionicons
                          name="location-outline"
                          size={18}
                          color="red"
                          style={styles.add_img}
                        />
                        <Text style={styles.title_2}>
                          Unit No: {dataItem.unit_no}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
             )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
export default ProfileAddress;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: height * 0.05,
    fontFamily: 'Poppins-Black',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  number: {
    width: width * 0.5,
    height: width * 0.05,
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    color: '#515151',
    marginTop:5
  },
  searchContianer: {
    width: width * 0.8,
    height: width * 0.5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -125,
  },

  address: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '700',
    marginLeft: 2,
  },

  addressButton: {
    width: width * 0.4,
    // height: width * 0.06,
    backgroundColor: 'red',
    borderRadius: 10,
    color: 'white',
    fontSize: width * 0.03,
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    // paddingBottom: 0.0,
  },

  container: {
    width: width * 0.9,
    // height: width * 0.43,
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    flexWrap: 'wrap',
    zIndex: -2,
    position: 'relative',
    borderRadius: 10,
    marginBottom: width * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingTop: 10,
    marginLeft: 10,
    borderBottomLeftColor: '#D9D9D9',
    borderBottomWidth: 1,
  },

  cart_contentTitle: {
    // backgroundColor:'white',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    // alignItems: 'center',
  },

  title: {
    // width: width * 0.14,
    // height: width * 0.06,
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.028,
    color: 'red',
    borderRightWidth: 2,
    borderColor: '#515151',
    paddingTop: width * 0.01,
    // marginLeft: -30,
    paddingRight:10,
  },

  title_1: {
    width: width * 0.5,
    height: width * 0.05,
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    color: '#515151',
    // backgroundColor:'yellow'
  },
 
  phone: {
    // width: width * 0.03,
    // height: width * 0.03,
    fontFamily: 'Poppins-SemiBold',
    // fontSize: width * 0.02,
    color: 'red',
    marginLeft: width * 0.03,
    marginRight: width * 0.02,
    marginTop: 5,
  },

  cart_email: {
    width: width * 0.8,
    height: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: width * 0.04,
  },

  email_img: {
    width: width * 0.06,
    height: width * 0.04,
  },

  add_img: {
    // width: width * 0.05,
    // height: width * 0.05,
  },

  title_2: {
    width: width * 0.4,
    // height: width * 0.1,
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    // marginTop: width * 0.04,
    color: '#515151',
    // backgroundColor:'red'
    },

  container_0: {
    width: width * 0.9,
    height: width * 0.55,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    // alignItems: 'center',
    alignSelf: 'center',
    zIndex: -2,
    position: 'relative',
    marginBottom: width * 0.05,
  },

  column: {
    width: width * 0.9,
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    textAlign: 'left',
    fontSize: width * 0.03,
    paddingTop: width * 0.05,
    paddingBottom: width * 0.02,

    paddingLeft: width * 0.04,
    marginBottom: width * 0.05,
    zIndex: -2,
    position: 'relative',
  },

  content: {
    width: width * 0.9,
    height: width * 0.14,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: width * 0.04,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    marginBottom: width * 0.1,
    alignItems: 'center',
    paddingBottom: width * 0.05,
    zIndex: -2,
    position: 'relative',
  },

  cart_contentEdit: {
    width: width * 1,
    height: width * 0.06,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    // textAlign:'right',
    gap: width * 0.01,
    marginTop: 90,
    marginBottom: -98,
  },

  titleEdit: {
    width: width * 0.09,
    height: width * 0.06,
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.03,
    borderRightWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight:5,
  },

  titleEdit0: {
    width: width * 0.2,
    height: width * 0.06,
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.03,
    borderColor: 'black',
    color: 'red',
  },
});
// function setUserDetails(storedData: any) {
//   throw new Error('Function not implemented.');
// }

