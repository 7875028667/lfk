import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { getMethod } from '../../utils/helper';
import axios from 'axios';

const Test = () => {


        const makePaymentRequest = async () => {
            const apiUrl = 'https://api.sandbox.hit-pay.com/v1/payment-requests';
          
            const headers = {
              'X-BUSINESS-API-KEY': '7e551b2c0935bdcbc28bf29b44b82be7fe02215f483f626e0f373311882e81b2',
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest',
            };
          
            const data = {
              amount: '600',
              currency: 'SGD',
              email: 'isita@gmail.com',
              name: 'isita china',
              redirect_url: 'https://test.com.success',
              webhook: 'https://test.com.webhook',
            };
          
            try {
              const response = await axios.post(apiUrl, data, { headers });
              console.log('Payment request successfull:', response.data);
            } catch (error) {
              console.error('Payment request Error:', error);
            }
          };
    
    return (
        <View>
            <Text onPress={makePaymentRequest} style={styles.api}>CAll API</Text>
        </View>
    )
}

export default Test
const styles = StyleSheet.create({
api:{
    marginHorizontal:50,
    marginVertical:50,
},

})
