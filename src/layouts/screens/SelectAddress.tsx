import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getMethod } from '../../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import HeaderScreen from './HeaderScreen';
import { RadioButton } from 'react-native-paper';


const SelectAddress = ({ navigation, route }: any) => {
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [apiData, setApiData] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState(''); // Add a state variable to store selected  radio button for each item
    const [addId, setAddId] = useState();
    const [delivery, setDelivery] = useState('delivery');
    const [refreshing, setRefreshing] = useState(false);



    const onRefresh = async () => {
        setRefreshing(true);
        fetchDeliveryData();
        selectedAddress();
        setRefreshing(false);
    };

    useEffect(() => {
        if (delivery === 'self_collection') {
            fetchSelfCollectionData();
        } else {
            fetchDeliveryData();
        }
    }, [delivery]);
    

    // useEffect(() => {
    //     fetchSelfCollectionData();
    // }, []);


    function handleRadioButtonChange(id: string): void {
        setSelectedRadio(id);
        
    }


    const fetchDeliveryData = async () => {
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
    const fetchSelfCollectionData = async () => {
        try {
            const api: any = await getMethod(`checkout/all-self-collection-address`);
            if (api.status === 200) {
                console.log("api.data.data", api.data.data)
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

    const selectedAddress = async () => {
        try {
            if (!selectedRadio) {
                // If no address is selected, show a message to the user
                Snackbar.show({
                    text: 'Please select an address.',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
                return; // Exit the function if no address is selected
            }

            const api: any = await getMethod(`checkout/change-cart-delivery-address?address_id=${selectedRadio}&delivery_type=${delivery}`);
            if (api.status === 200) {
                navigation.navigate('Checkout', {
                    deliveryValue: delivery
                });
            } else {
                console.log('API Error:', api.data.message);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
            }
        } catch (e) {
            console.log('Error while fetchinggg:', e);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderScreen />
            <View style={styles.contain}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={{ flexDirection: 'row', marginLeft: 5, marginBottom: 20, }}>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                setDelivery(value); // Update the state with the selected value
                            }}
                            value={delivery}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center' }}>
                                    <RadioButton.Android value="delivery" color="red" uncheckedColor="red" />
                                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium' }}>Delivery</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center' }}>
                                    <RadioButton.Android value="self_collection" color="red" uncheckedColor="red" />
                                    <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold' }}>Self Collection</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="red" />
                    ) : (
                        <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                            {apiData.map((dataItem) => (
                                <View key={dataItem.id} style={{ flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <RadioButton
                                            color="red"
                                            value={dataItem.id}
                                            status={selectedRadio === dataItem.id ? 'checked' : 'unchecked'}
                                            onPress={() => handleRadioButtonChange(dataItem.id)} // Call the function with ID

                                        />
                                    </View>
                                    <View style={styles.container} key={dataItem.id}>
                                        <View style={styles.cart_contentTitle} key={dataItem.id}>
                                            <Text style={styles.title}>{dataItem.name}</Text>
                                            <Ionicons
                                                name="call"
                                                size={18}
                                                color="red"
                                                style={styles.phone}
                                            />
                                            <Text style={styles.title_1}>+{dataItem.phone}</Text>
                                        </View>
                                        <View style={styles.cart_email}>
                                            <Ionicons
                                                name="mail-unread-outline"
                                                size={18}
                                                color="red"
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
                                </View>
                            ))}
                        </View>
                    )}
                    <TouchableOpacity style={styles.saveBtn}>
                        <Text onPress={selectedAddress} style={styles.saveBtnText}>Change Address</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default SelectAddress
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
    contain: {
        backgroundColor: 'white',
        paddingBottom: 150,
        paddingTop: 30,

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
        backgroundColor: 'red',
        borderRadius: 10,
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: '600',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    container: {
        width: width * 0.85,
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
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.028,
        color: 'red',
        borderRightWidth: 2,
        borderColor: '#515151',
        paddingTop: width * 0.01,
        paddingRight: 10,
    },
    title_1: {
        width: width * 0.5,
        // height: width * 0.05,
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03,
        color: '#515151',
    },
    phone: {
        fontFamily: 'Poppins-SemiBold',
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
    },
    title_2: {
        width: width * 0.4,
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03,
        color: '#515151',
    },
    container_0: {
        width: width * 0.9,
        height: width * 0.55,
        backgroundColor: '#E3E3E3',
        borderRadius: 10,
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
    },
    titleEdit0: {
        width: width * 0.2,
        height: width * 0.06,
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.03,
        borderColor: 'black',
        color: 'red',
    },
    saveBtn: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 60
    },
    saveBtnText: {
        color: 'white',
        fontSize: 16,
    },

});