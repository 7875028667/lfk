/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    // Button,
    Pressable,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';
import HeaderScreen from './HeaderScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Svg, Path } from 'react-native-svg';


const ProductVoucher = ({ navigation }: any) => {
    return (
        <ScrollView>
            <SafeAreaView>
                <Pressable >
                    <View style={styles.body}>
                        <HeaderScreen navigation={navigation} />
                        <View style={styles.compound_0}>
                            <View style={styles.row}>
                                <Text style={styles.voucher}>Products</Text>
                                <Text style={styles.product}>Voucher</Text>
                                <View style={styles.col}>
                                    <View style={{ flexDirection: 'row', gap: 5 }}>
                                        <Svg
                                            width={20}
                                            height={18}
                                            viewBox="0 0 28 28"
                                            fill="none"
                                        >
                                            <Path
                                                d="M1 14C1 15.7072 1.33625 17.3977 1.98957 18.9749C2.64288 20.5521 3.60045 21.9852 4.80761 23.1924C6.01477 24.3995 7.44788 25.3571 9.02512 26.0104C10.6023 26.6637 12.2928 27 14 27C15.7072 27 17.3977 26.6637 18.9749 26.0104C20.5521 25.3571 21.9852 24.3995 23.1924 23.1924C24.3995 21.9852 25.3571 20.5521 26.0104 18.9749C26.6637 17.3977 27 15.7072 27 14C27 12.2928 26.6637 10.6023 26.0104 9.02512C25.3571 7.44788 24.3995 6.01477 23.1924 4.80761C21.9852 3.60045 20.5521 2.64288 18.9749 1.98957C17.3977 1.33626 15.7072 1 14 1C12.2928 1 10.6023 1.33626 9.02512 1.98957C7.44788 2.64288 6.01477 3.60045 4.80761 4.80761C3.60045 6.01477 2.64288 7.44788 1.98957 9.02512C1.33625 10.6023 1 12.2928 1 14Z"
                                                stroke="#EC1C24"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <Path
                                                d="M18.0445 9.66672C17.7829 9.21282 17.4027 8.83862 16.9447 8.58419C16.4867 8.32975 15.9682 8.20465 15.4445 8.22228H12.5556C11.7895 8.22228 11.0547 8.52664 10.5129 9.06841C9.97111 9.61018 9.66675 10.345 9.66675 11.1112C9.66675 11.8773 9.97111 12.6121 10.5129 13.1539C11.0547 13.6957 11.7895 14.0001 12.5556 14.0001H15.4445C16.2107 14.0001 16.9455 14.3044 17.4873 14.8462C18.0291 15.388 18.3334 16.1228 18.3334 16.8889C18.3334 17.6551 18.0291 18.3899 17.4873 18.9317C16.9455 19.4735 16.2107 19.7778 15.4445 19.7778H12.5556C12.032 19.7955 11.5135 19.6704 11.0555 19.4159C10.5975 19.1615 10.2173 18.7873 9.95564 18.3334M14.0001 6.77783V21.2223"
                                                stroke="#EC1C24"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                        <Text style={styles.discount}>4842 Coins</Text></View>
                                </View>
                            </View>
                            <View style={styles.compoundBOX}>

                                <Image source={require('../../../assets/img/Rectangle43.png')} style={styles.productImg} />
                                <View style={styles.category}>
                                    <Text style={styles.title}>Pomegrante Collagen </Text>
                                    <Text style={styles.title}>Jelly Sticks</Text>
                                    <Pressable >
                                        <View style={styles.btnContainer_1}>
                                            <Svg
                                                width={28}
                                                height={20}
                                                viewBox="0 0 28 28"
                                                fill="none"
                                            >
                                                <Path
                                                    d="M1 14C1 15.7072 1.33625 17.3977 1.98957 18.9749C2.64288 20.5521 3.60045 21.9852 4.80761 23.1924C6.01477 24.3995 7.44788 25.3571 9.02512 26.0104C10.6023 26.6637 12.2928 27 14 27C15.7072 27 17.3977 26.6637 18.9749 26.0104C20.5521 25.3571 21.9852 24.3995 23.1924 23.1924C24.3995 21.9852 25.3571 20.5521 26.0104 18.9749C26.6637 17.3977 27 15.7072 27 14C27 12.2928 26.6637 10.6023 26.0104 9.02512C25.3571 7.44788 24.3995 6.01477 23.1924 4.80761C21.9852 3.60045 20.5521 2.64288 18.9749 1.98957C17.3977 1.33626 15.7072 1 14 1C12.2928 1 10.6023 1.33626 9.02512 1.98957C7.44788 2.64288 6.01477 3.60045 4.80761 4.80761C3.60045 6.01477 2.64288 7.44788 1.98957 9.02512C1.33625 10.6023 1 12.2928 1 14Z"
                                                    stroke="white"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <Path
                                                    d="M18.0445 9.66672C17.7829 9.21282 17.4027 8.83862 16.9447 8.58419C16.4867 8.32975 15.9682 8.20465 15.4445 8.22228H12.5556C11.7895 8.22228 11.0547 8.52664 10.5129 9.06841C9.97111 9.61018 9.66675 10.345 9.66675 11.1112C9.66675 11.8773 9.97111 12.6121 10.5129 13.1539C11.0547 13.6957 11.7895 14.0001 12.5556 14.0001H15.4445C16.2107 14.0001 16.9455 14.3044 17.4873 14.8462C18.0291 15.388 18.3334 16.1228 18.3334 16.8889C18.3334 17.6551 18.0291 18.3899 17.4873 18.9317C16.9455 19.4735 16.2107 19.7778 15.4445 19.7778H12.5556C12.032 19.7955 11.5135 19.6704 11.0555 19.4159C10.5975 19.1615 10.2173 18.7873 9.95564 18.3334M14.0001 6.77783V21.2223"
                                                    stroke="white"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </Svg>
                                            <Text style={styles.button}>110.00</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                        <View style={styles.compound}>
                            <View style={styles.compoundBOX}>
                                <Image source={require('../../../assets/img/Rectangle42.png')} style={styles.productImg} />
                                <View style={styles.category}>
                                    <Text style={styles.title}>Deoproce Violet CC Cream</Text>
                                    <Pressable>
                                        <View style={styles.btnContainer_1}>
                                            <Svg
                                                width={28}
                                                height={20}
                                                viewBox="0 0 28 28"
                                                fill="none"
                                            >
                                                <Path
                                                    d="M1 14C1 15.7072 1.33625 17.3977 1.98957 18.9749C2.64288 20.5521 3.60045 21.9852 4.80761 23.1924C6.01477 24.3995 7.44788 25.3571 9.02512 26.0104C10.6023 26.6637 12.2928 27 14 27C15.7072 27 17.3977 26.6637 18.9749 26.0104C20.5521 25.3571 21.9852 24.3995 23.1924 23.1924C24.3995 21.9852 25.3571 20.5521 26.0104 18.9749C26.6637 17.3977 27 15.7072 27 14C27 12.2928 26.6637 10.6023 26.0104 9.02512C25.3571 7.44788 24.3995 6.01477 23.1924 4.80761C21.9852 3.60045 20.5521 2.64288 18.9749 1.98957C17.3977 1.33626 15.7072 1 14 1C12.2928 1 10.6023 1.33626 9.02512 1.98957C7.44788 2.64288 6.01477 3.60045 4.80761 4.80761C3.60045 6.01477 2.64288 7.44788 1.98957 9.02512C1.33625 10.6023 1 12.2928 1 14Z"
                                                    stroke="white"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <Path
                                                    d="M18.0445 9.66672C17.7829 9.21282 17.4027 8.83862 16.9447 8.58419C16.4867 8.32975 15.9682 8.20465 15.4445 8.22228H12.5556C11.7895 8.22228 11.0547 8.52664 10.5129 9.06841C9.97111 9.61018 9.66675 10.345 9.66675 11.1112C9.66675 11.8773 9.97111 12.6121 10.5129 13.1539C11.0547 13.6957 11.7895 14.0001 12.5556 14.0001H15.4445C16.2107 14.0001 16.9455 14.3044 17.4873 14.8462C18.0291 15.388 18.3334 16.1228 18.3334 16.8889C18.3334 17.6551 18.0291 18.3899 17.4873 18.9317C16.9455 19.4735 16.2107 19.7778 15.4445 19.7778H12.5556C12.032 19.7955 11.5135 19.6704 11.0555 19.4159C10.5975 19.1615 10.2173 18.7873 9.95564 18.3334M14.0001 6.77783V21.2223"
                                                    stroke="white"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </Svg>
                                            <Text style={styles.button}>150.00</Text>
                                        </View></Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.compound}>
                            <View style={styles.compoundBOX}>
                                <Image source={require('../../../assets/img/Rectangle41.png')} style={styles.productImg} />
                                <View style={styles.category}>
                                    <Text style={styles.title}>Chamos Acaci Snal
                                    </Text>
                                    <Text style={styles.title}>Repair Ant - Wrinkle Cream</Text>
                                    <Pressable ><View style={styles.btnContainer_1}>
                                        <Svg
                                            width={28}
                                            height={20}
                                            viewBox="0 0 28 28"
                                            fill="none"
                                        >
                                            <Path
                                                d="M1 14C1 15.7072 1.33625 17.3977 1.98957 18.9749C2.64288 20.5521 3.60045 21.9852 4.80761 23.1924C6.01477 24.3995 7.44788 25.3571 9.02512 26.0104C10.6023 26.6637 12.2928 27 14 27C15.7072 27 17.3977 26.6637 18.9749 26.0104C20.5521 25.3571 21.9852 24.3995 23.1924 23.1924C24.3995 21.9852 25.3571 20.5521 26.0104 18.9749C26.6637 17.3977 27 15.7072 27 14C27 12.2928 26.6637 10.6023 26.0104 9.02512C25.3571 7.44788 24.3995 6.01477 23.1924 4.80761C21.9852 3.60045 20.5521 2.64288 18.9749 1.98957C17.3977 1.33626 15.7072 1 14 1C12.2928 1 10.6023 1.33626 9.02512 1.98957C7.44788 2.64288 6.01477 3.60045 4.80761 4.80761C3.60045 6.01477 2.64288 7.44788 1.98957 9.02512C1.33625 10.6023 1 12.2928 1 14Z"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <Path
                                                d="M18.0445 9.66672C17.7829 9.21282 17.4027 8.83862 16.9447 8.58419C16.4867 8.32975 15.9682 8.20465 15.4445 8.22228H12.5556C11.7895 8.22228 11.0547 8.52664 10.5129 9.06841C9.97111 9.61018 9.66675 10.345 9.66675 11.1112C9.66675 11.8773 9.97111 12.6121 10.5129 13.1539C11.0547 13.6957 11.7895 14.0001 12.5556 14.0001H15.4445C16.2107 14.0001 16.9455 14.3044 17.4873 14.8462C18.0291 15.388 18.3334 16.1228 18.3334 16.8889C18.3334 17.6551 18.0291 18.3899 17.4873 18.9317C16.9455 19.4735 16.2107 19.7778 15.4445 19.7778H12.5556C12.032 19.7955 11.5135 19.6704 11.0555 19.4159C10.5975 19.1615 10.2173 18.7873 9.95564 18.3334M14.0001 6.77783V21.2223"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                        <Text style={styles.button}>150.00</Text>
                                    </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.compound_1}>
                            <View style={styles.compoundBOX}>
                                <Image source={require('../../../assets/img/Rectangle43.png')} style={styles.productImg} />
                                <View style={styles.category}>
                                    <Text style={styles.title}>Pomegrante Collagen </Text>
                                    <Text style={styles.title}>Jelly Sticks</Text>
                                    <Pressable ><View style={styles.btnContainer_1}>

                                        <Svg
                                            width={28}
                                            height={20}
                                            viewBox="0 0 28 28"
                                            fill="none"
                                        >
                                            <Path
                                                d="M1 14C1 15.7072 1.33625 17.3977 1.98957 18.9749C2.64288 20.5521 3.60045 21.9852 4.80761 23.1924C6.01477 24.3995 7.44788 25.3571 9.02512 26.0104C10.6023 26.6637 12.2928 27 14 27C15.7072 27 17.3977 26.6637 18.9749 26.0104C20.5521 25.3571 21.9852 24.3995 23.1924 23.1924C24.3995 21.9852 25.3571 20.5521 26.0104 18.9749C26.6637 17.3977 27 15.7072 27 14C27 12.2928 26.6637 10.6023 26.0104 9.02512C25.3571 7.44788 24.3995 6.01477 23.1924 4.80761C21.9852 3.60045 20.5521 2.64288 18.9749 1.98957C17.3977 1.33626 15.7072 1 14 1C12.2928 1 10.6023 1.33626 9.02512 1.98957C7.44788 2.64288 6.01477 3.60045 4.80761 4.80761C3.60045 6.01477 2.64288 7.44788 1.98957 9.02512C1.33625 10.6023 1 12.2928 1 14Z"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <Path
                                                d="M18.0445 9.66672C17.7829 9.21282 17.4027 8.83862 16.9447 8.58419C16.4867 8.32975 15.9682 8.20465 15.4445 8.22228H12.5556C11.7895 8.22228 11.0547 8.52664 10.5129 9.06841C9.97111 9.61018 9.66675 10.345 9.66675 11.1112C9.66675 11.8773 9.97111 12.6121 10.5129 13.1539C11.0547 13.6957 11.7895 14.0001 12.5556 14.0001H15.4445C16.2107 14.0001 16.9455 14.3044 17.4873 14.8462C18.0291 15.388 18.3334 16.1228 18.3334 16.8889C18.3334 17.6551 18.0291 18.3899 17.4873 18.9317C16.9455 19.4735 16.2107 19.7778 15.4445 19.7778H12.5556C12.032 19.7955 11.5135 19.6704 11.0555 19.4159C10.5975 19.1615 10.2173 18.7873 9.95564 18.3334M14.0001 6.77783V21.2223"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                        <Text style={styles.button}>
                                            150.00</Text>
                                    </View></Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ProductVoucher;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
    },

    row: {
        width: width * 1,
        height: height * 0.1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },


    product: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 17,

    },

    voucher: {
        width: width * 0.2,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 17,
        borderBottomColor: '#EC1C24',
        borderBottomWidth: 2,
        textAlign: 'center',
    },

    text: {
        width: width * 0.5,
        height: width * 0.06,
        fontSize: width * 0.05,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'left',
        marginBottom: height * 0.05,
        color: 'black',
    },

    col: {
        width: width * 1.2,
        height: height * 0.15,
        flexDirection: 'column',
        marginLeft: -85,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: -35,
    },

    discount: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: '800',
        fontSize: 13,
    },

    compound_0: {
        width: width * 1,
        height: width * 0.45,
        padding: width * 0.02,
        alignItems: 'flex-start',
        borderColor: '#D9D9D9',
        borderBottomWidth: 2,
        zIndex: -4,
        marginBottom: height * 0.03,

    },

    compound: {
        width: width * 1,
        height: width * 0.3,
        padding: width * 0.02,
        alignItems: 'flex-start',
        borderColor: '#D9D9D9',
        borderBottomWidth: 2,
        zIndex: -4,
        marginTop:15,
        marginBottom: height * 0.03,
    },


    compound_1: {
        width: width * 1,
        height: width * 0.25,
        padding: width * 0.02,
        alignItems: 'flex-start',
        zIndex: -4,
        marginTop:10,
        marginBottom: height * 0.03,
    },

    compoundBOX: {
        width: width * 1,
        height: width * 0.2,
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: width * 0.02,
        marginBottom: height * 0.00,
        zIndex: -4,
    },



    productImg: {
        width: width * 0.25,
        height: width * 0.22,
        marginBottom: height * 0.3,

    },

    category: {
        width: width * 0.22,
        height: width * 0.20,
        justifyContent:'center',
        marginBottom: height * 0.3,
    },

    title: {
        width: width * 0.5,
        marginBottom: -1,
        fontFamily: 'Poppins-SemiBold',
        fontSize: width * 0.03,
        color: 'black',
    },

    price: {
        width: width * 0.5,
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.04,
        color: 'red',
    },

    btnContainer_1: {
        width: width * 0.25,
        height: width * 0.06,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.04,
        flexDirection: 'row',
        marginTop: 20,
        zIndex: -9,
    },


    button: {
        fontSize: width * 0.03,
        fontFamily: 'Poppins-Medium',
        color: 'white',
    },

    img3: {
        width: width * 0.03,
        height: width * 0.03,
    },


});


