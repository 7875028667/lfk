import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderScreen from './HeaderScreen';
import { getMethod, postMethod } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = ({ navigation }: any) => {

    const cartValue = useSelector((state: any) => state.reducer);
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
    const [cartData, setCartData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cartIncrement, setCartIncrement] = useState('');

    const onRefresh = async () => {
        setRefreshing(true);
        await cart();
        setRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            const loadingTimeout = setTimeout(() => {
                // setIsLoading(false);
                cart(); // Load data after the timeout
            }, 2000); // Change 2000 to the desired timeout duration in milliseconds

            // Clear timeout to avoid memory leaks
            return () => clearTimeout(loadingTimeout);
        }, [])
    );


    const cart = async () => {
        try {
            const api: any = await getMethod('carts');
            if (api.status === 200) {
                setIsLoading(false);
                setCartData(api.data.data);
                console.log("CART--", api.data.data)

            } else {
                console.log('API Error:', api.data.message);
            }
        } catch (e) {
            console.log('Error while fetchinggg:', e);
        }
    }

    const CartChange = async (cartId: number, quantity: number) => {
        console.log("cartId", cartId, quantity)
        const raw = {
            quantity: quantity,
            cart_id: cartId,
        };
        try {
            const api: any = await postMethod('carts/change-quantity', raw);
            if (api.status === 200) {
                setCartIncrement(api.data.data);
                console.log("CART--", api.data.data)

            } else {
                console.log('API Error:', api.data.message);
            }
        } catch (e) {
            console.log('Error while fetchinggg:', e);
        }
    }



    const decrementCount = async (cartId: number) => {
        const updatedCartData = cartData.map(item => {
            if (item.cart_id === cartId && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        setCartData(updatedCartData);

        // Find the updated quantity from the updatedCartData
        const updatedItem = updatedCartData.find(item => item.cart_id === cartId);
        if (updatedItem) {
            // Call CartChange function with the correct quantity
            await CartChange(cartId, updatedItem.quantity);
        }
    };

    const incrementCount = async (cartId: number) => {
        const updatedCartData = cartData.map(item => {
            if (item.cart_id === cartId) {
                // Update the quantity of the specific item
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setCartData(updatedCartData);

        // Find the updated quantity from the updatedCartData
        const updatedItem = updatedCartData.find(item => item.cart_id === cartId);
        if (updatedItem) {
            // Call CartChange function with the correct quantity
            await CartChange(cartId, updatedItem.quantity);
        }
    };

    const handleSelectAllChange = () => {
        const updatedCheckboxes = checkboxes.map(() => !selectAll);
        setCheckboxes(updatedCheckboxes);
        setSelectAll(!selectAll);
    };

    //delete cart item

    const handleCartItemPress = (cartId: number) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this item from your cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        console.log("Clicked Cart Item's cart_id:", cartId);
                        try {
                            const api: any = await getMethod(`carts/delete?cart_id=${cartId}`);
                            if (api.status === 200) {
                                console.log('Item deleted successfully');
                                await cart();
                                Snackbar.show({
                                    text: 'Cart Item Deleted',
                                    duration: Snackbar.LENGTH_SHORT,
                                    textColor: 'white',
                                    backgroundColor: 'green',
                                });
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
    };



    return (
        <View style={styles.outerContainer}>

            {isLoading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
                <SafeAreaView >
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                        <HeaderScreen navigation={navigation} />
                        <View style={styles.searchContianer}>
                            <Text style={styles.home}>Cart </Text>
                            {/* <Text style={{
                            color: 'red',
                            fontSize: width * 0.04,
                            fontFamily: 'Poppins-SemiBold',
                        }}> / {cartValue === 'CHINESE' ? language[6].chinese : language[6].english}</Text> */}
                        </View>

                        {cartData.map((category) => (
                            <View key={category.cart_id} style={styles.column_0}>
                                <View style={styles.container}>
                                    {/* <Checkbox
                                        status={selectAll ? 'checked' : 'unchecked'}
                                        color="red"
                                        uncheckedColor="red"
                                    /> */}
                                </View>
                                <Image source={{ uri: category.product_img }} style={styles.arrow1} />

                                <Text style={styles.column_text}>{category.product_name}</Text>
                                {/* <Text style={styles.column_text}>{category.cart_id}</Text> */}
                                <View style={styles.price}>
                                    <Text style={styles.price_0}>{category.price}</Text>
                                </View>

                                <View style={styles.quantity_0}>
                                    <View style={styles.quantity_0}>
                                        <Pressable onPress={() => decrementCount(category.cart_id, category.quantity)} disabled={category.quantity <= 1}>
                                            <Text style={styles.minus}>-</Text>
                                        </Pressable>
                                        <Text style={styles.minus}>{category.quantity}</Text>
                                        <Pressable onPress={() => incrementCount(category.cart_id, category.quantity)}>
                                            <Text style={styles.minus}>+</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleCartItemPress(category.cart_id)}>
                                    <Icon name="trash-outline" size={width * 0.045} color="#FAC0A4" style={styles.arrow2} />
                                </TouchableOpacity>
                            </View>

                        ))}

                        <View style={styles.cart_container}>
                            <TouchableOpacity style={styles.cart_content} onPress={() => navigation.goBack()} >
                                <Text style={styles.textContent}>Back </Text>
                            </TouchableOpacity>
                            <View style={styles.cart_content_0}>
                                <Pressable onPress={() => navigation.navigate('SelectAddress')}>
                                    <Text style={styles.textContent_0}>Proceed to checkout</Text>
                                </Pressable>
                            </View>

                        </View>

                    </ScrollView>
                </SafeAreaView>
            )}
        </View>
    );
};

export default CartScreen;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        zIndex: -8,
    },

    home: {
        color: '#515151',
        fontSize: width * 0.04,
        fontFamily: 'Poppins-SemiBold',
    },
    searchContianer: {
        width: width * 1,
        height: width * 0.12,
        backgroundColor: '#E3E3E3',
        fontSize: width * 0.05,
        fontFamily: 'Poppins-Bold',
        flexDirection: 'row',
        color: '#515151',
        alignItems: 'center',
        paddingLeft: 8,
        marginBottom: width * 0.1,
        zIndex: -2,
    },

    column: {
        width: width * 1,
        height: width * 0.08,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: width * 0.07,
        marginBottom: width * 0.1,
        zIndex: -2,
        position: 'relative',
    },


    check_Box: {
        width: width * 0.04,
        height: width * 0.04,
        marginLeft: -5,
    },

    check_Box0: {
        width: width * 0.9,
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.05,
        fontWeight: '800',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        marginLeft: -20,

    },

    column_0: {
        width: width * 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // height: width * 0.18,
        alignItems: 'center',
        // flexWrap: 'nowrap',
        // gap: width * 0.04,
        // zIndex: -2,
        // position: 'relative',
        // padding: width * 0.05,
        paddingLeft: 15,
        borderBottomWidth: 1,
    },

    column_text: {
        width: width * 0.32,
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.022,
        color: 'black',
        textAlign: 'justify',
        marginRight: 5,
    },

    arrow1: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: 5,
        marginRight: 10,
        marginVertical: 10,
    },

    price: {
        width: width * 0.18,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '800',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        // backgroundColor:'red',
    },

    price_0: {
        width: width * 0.14,
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.023,
        fontWeight: '800',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black',
    },

    quantity_0: {
        width: width * 0.2,
        height: width * 0.09,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexWrap: 'nowrap',
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.04,
        fontWeight: '500',
        lineHeight: 24,
        color: 'red',
        marginLeft: 3,
    },

    minus: {
        width: width * 0.05,
        height: width * 0.06,
        borderColor: '#BBBBBB',
        borderWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: width * 0.03,
        fontWeight: '500',
        flexWrap: 'nowrap',
    },

    arrow2: {
        width: width * 0.07,
        height: width * 0.06,
        borderRadius: width * 0.02,
        marginTop: 10,
    },

    cart_container: {
        width: width * 1,
        height: width * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.04,
        fontWeight: '500',
        zIndex: -2,
        position: 'relative',
    },

    cart_content: {
        width: width * 0.5,
        height: width * 0.15,
        alignItems: 'center',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        padding: width * 0.04,
        backgroundColor: 'white',
        color: 'black',
        zIndex: -2,
        position: 'relative',
    },

    cart_content_0: {
        width: width * 0.5,
        height: width * 0.15,
        alignItems: 'center',
        textAlign: 'center',
        padding: width * 0.04,
        backgroundColor: 'red',
        color: 'white',
        // zIndex: -2,
    },

    textContent: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.04,
        color: 'black',
    },

    textContent_0: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.03,
        color: 'white',
    },


    container: {
        flex: 1,
        marginLeft: -20,
    },
    outerContainer: {
        flex: 1,
        backgroundColor: 'white',
    }


});


