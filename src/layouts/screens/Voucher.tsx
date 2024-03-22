import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import HeaderScreen from './HeaderScreen';
import { getMethod } from '../../utils/helper';

function Voucher({ navigation }: any) {

    useEffect(() => {
        getLoyalityCoins();
        getVoucherList();
    }, [])

    const [coins, setCoins] = useState(null);
    const [list, setList] = useState([]);

    const getLoyalityCoins = async () => {
        try {
            const api: any = await getMethod('get-loyalty-coins');
            if (api.status === 200) {
                const data = api.data;
                setCoins(data);
                // console.log("Coins", coins)
            } else {
                console.log("else", api.data.message)
            }

        } catch (e) {
            console.log('Error while fetchinggg:', e);
        }
    }

    const getVoucherList = async () => {
        console.log("first");
        try {
            const api: any = await getMethod('voucher-list');
            if (api.status === 200) {
                console.log("list", api.data.data[0].cap_at);
                setList(api.data.data);
                console.log("LIST-->>>", list)
            } else {
                console.log("else", api.data.message)
            }

        } catch (e) {
            console.log('Error while fetchinggg:', e);
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <HeaderScreen />
                    <View style={styles.body}>
                        <View style={styles.row}>
                            <Text style={styles.product}>Products</Text>
                            <Text style={styles.voucher}>Voucher</Text>
                        </View>
                        <View style={styles.col}>
                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 15, }}>
                                <Svg
                                    width={28}
                                    height={28}
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
                                {coins ? (
                                    <Text style={styles.discount}>{coins.data}</Text>
                                ) : (
                                    <Text style={styles.discount}>0</Text> // Display a loading message while data is being fetched
                                )}
                            </View>
                            <Text style={styles.text}>Total Earned Coin</Text>
                        </View>
                        <View>
                            {list.map((item) => (
                                <TouchableOpacity key={item.id} style={styles.box} onPress={() => navigation.navigate('CouponRedeem')}>
                                    <View style={{ flexDirection: 'row', }}  >
                                        <Text style={styles.boxText}>LOGO</Text>
                                        <Text style={styles.boxContent}>
                                            {item.description}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <View>
                                            <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', lineHeight: 20, fontSize: 16 }}>Expires</Text>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Regular', lineHeight: 20, fontSize: 16 }}>{item.expiry_date}</Text>
                                            <Text style={{ color: '#19A7CE', fontFamily: 'Poppins-Regular', lineHeight: 20, fontSize: 12 }}>Terms & Condition</Text>
                                        </View>
                                        <View style={styles.rectangle} >
                                            <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
                                                <Path
                                                    d="M18.125 13.2201V14.5592C18.125 15.3625 17.7546 16.0493 17.2403 16.5891C16.7318 17.124 16.0415 17.5602 15.2647 17.9056C13.7072 18.5964 11.6247 19 9.375 19C7.12528 19 5.04278 18.5974 3.48528 17.9056C2.70847 17.5602 2.01819 17.124 1.50972 16.5891C1.03819 16.0957 0.688194 15.476 0.632778 14.7576L0.625 14.5592V13.2201C1.07708 13.4806 1.56028 13.7115 2.0775 13.9059C4.05111 14.647 6.63236 15.0605 9.375 15.0605C12.1176 15.0605 14.6989 14.647 16.6725 13.9059C17.0604 13.7599 17.4289 13.5941 17.7799 13.4095L18.125 13.2201ZM0.625 7.79243C1.07708 8.05296 1.56028 8.28388 2.0775 8.47829C4.05111 9.21941 6.63236 9.6329 9.375 9.6329C12.1176 9.6329 14.6989 9.21941 16.6725 8.47829C17.1743 8.29029 17.6601 8.0609 18.125 7.79243V10.8566C17.4794 11.3624 16.7622 11.7663 15.9978 12.0546C14.2915 12.6961 11.9494 13.0878 9.375 13.0878C6.80153 13.0878 4.45944 12.6961 2.75222 12.0546C1.98775 11.7663 1.27059 11.3624 0.625 10.8566V7.79243ZM9.375 0.25C11.6247 0.25 13.7072 0.652632 15.2647 1.34441C16.0415 1.6898 16.7318 2.12599 17.2403 2.66086C17.7118 3.15428 18.0618 3.77401 18.1172 4.49243L18.125 4.69079V5.42895C17.4794 5.93478 16.7623 6.33868 15.9978 6.62697C14.2915 7.26842 11.9494 7.6602 9.375 7.6602C6.80153 7.6602 4.45944 7.26842 2.75222 6.62697C2.09484 6.37947 1.4722 6.04571 0.900139 5.63421L0.625 5.42895V4.69079C0.625 3.8875 0.995417 3.20066 1.50972 2.66086C2.01819 2.12599 2.70847 1.6898 3.48528 1.34441C5.04278 0.653619 7.12528 0.25 9.375 0.25Z"
                                                    fill="white"
                                                />
                                            </Svg>
                                            <Text style={{ color: 'white', fontSize: 17, textAlign: 'right', fontWeight: '900' }}>{item.discount}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Voucher;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: width * 0.9,
        alignSelf: 'center',
    },
    row: {
        width: width * 0.55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col: {
        width: width * 0.9,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    product: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 17,
    },
    voucher: {
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 17,
        borderBottomColor: '#EC1C24',
        borderBottomWidth: 2,
        textAlign: 'center',
    },
    discount: {
        color: 'red',
        fontFamily: 'Poppins-Bold',
        fontWeight: '800',
        fontSize: 18,
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#212121',
        fontSize: 15,
        alignItems: 'center',
    },
    box: {
        width: width * 0.9,
        borderColor: 'red',
        borderWidth: 2,
        padding: 7,
        marginBottom: 30,
    },
    boxText: {
        width: width * 0.25,
        height: width * 0.15,
        color: '#0079FF',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 18,
        fontWeight: '800',
    },
    boxContent: {
        width: width * 0.6,
        height: width * 0.15,
        textAlign: 'justify',
        fontSize: 13,
        color: 'black',
    },
    rectangle: {
        width: 120,
        height: 35,
        borderRadius: 50,
        backgroundColor: 'red',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
    },
});
