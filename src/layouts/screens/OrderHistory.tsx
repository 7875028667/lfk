import React, { useEffect, useState } from 'react';
import {  View, Text, StyleSheet, Dimensions, Image, Pressable, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import HeaderScreen from './HeaderScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { getMethod } from '../../utils/helper';
import { language } from '../../reduxFolder/langauge';
import Appbar from '../../components/Appbar';


const OrderHistory = ({ navigation }: any) => {

  const cartValue = useSelector((state: any) => state.reducer);




  const [data, setData] = useState([]);

  useEffect(() => {
    purchaseHistory();
  }, []);

  const purchaseHistory = async () => {
    try {
      const api: any = await getMethod('purchase-history');
      if (api.status === 200) {
        setData(api.data.data);
        // console.log("TEST--", api.data.data)

      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }


  return (
    <View style={styles.container}>
    <ScrollView>
      <SafeAreaView>
        <Pressable >
          <View style={styles.body}>
          <Appbar/>
            <Text style={styles.text}>{cartValue === 'CHINESE' ? language[4].chinese : language[4].english}</Text>
            {data.map((order) => (
              <View style={styles.compound} key={order.id}>
                <View style={styles.compoundBOX}>
                  <View style={styles.productImgView}>
                    <Image source={{ uri: order.product_img }} style={styles.productImg} />
                  </View>
                  <View style={styles.category}>
                    <Text style={styles.title}>Order ID: {order.consolidate_order_no}</Text>
                    <Text style={styles.title}>Delivery Date: {order.delivery_date}</Text>
                    <Text style={styles.price}>${order.gross_amount}</Text>
                    <Pressable>
                      <View style={styles.btnContainer_1}>
                        <Text style={styles.button}>Order again</Text>
                        <Icon name="cart" size={width * 0.04} color="white" />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

          </View>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
    </View>
  );
};

export default OrderHistory;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height:'100%',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  text: {
    width: width * 0.5,
    // height: width * 0.06,
    fontSize: width * 0.055,
    marginLeft:15,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
    marginBottom: height * 0.05,
    color: 'black',
  },

  compound_0: {
    width: width * 1,
    height: width * 0.5,
    padding: width * 0.02,
    alignItems: 'flex-start',
    borderColor: '#D9D9D9',
    borderBottomWidth: 2,
    zIndex: -4,
    marginBottom: height * 0.03,
    backgroundColor: 'red',

  },

  compound: {
    width: width * 1,
    height: width * 0.35,
    padding: width * 0.02,
    alignItems: 'flex-start',
    borderColor: '#D9D9D9',
    borderBottomWidth: 2,
    zIndex: -4,
    marginBottom: height * 0.03,
    // backgroundColor:'black'
  },


  compound_1: {
    width: width * 1,
    height: width * 0.37,
    padding: width * 0.02,
    alignItems: 'flex-start',
    zIndex: -4,
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

  productImgView:{
    width: width * 0.25,
    height: width * 0.25,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:20,
  },

  productImg: {
    width: width * 0.24,
    height: width * 0.245,
    marginBottom: height * 0.3,
    borderRadius:20,

  },

  category: {
    width: width * 0.22,
    height: width * 0.22,
    marginBottom: height * 0.3,
  },

  title: {
    width: width * 0.7,
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    color: 'black',
    fontWeight: '700'
  },

  price: {
    width: width * 0.5,
    whiteSpace: 'nowrap',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
    color: 'red',
  },

  success: {
    width: width * 0.7,
    marginTop: width * -0.06,
    fontFamily: 'Poppins-Medium',
    color: '#28F8AD',
    textAlign: 'right',
    fontSize: width * 0.04,

  },

  failed: {
    width: width * 0.7,
    marginTop: width * -0.06,
    fontFamily: 'Poppins-Medium',
    color: 'red',
    textAlign: 'right',
    fontSize: width * 0.04,

  },


  btnContainer_1: {
    width: width * 0.3,
    height: width * 0.06,
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    zIndex: -4,
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.04,
    flexDirection: 'row',
  },


  button: {
    fontSize: width * 0.025,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginRight: 10,
  },

  img3: {
    width: width * 0.03,
    height: width * 0.03,
  },


});


