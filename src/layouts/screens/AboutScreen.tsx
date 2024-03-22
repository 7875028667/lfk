import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView, } from 'react-native';
import HeaderScreen from './HeaderScreen';
import { getMethod } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { language } from '../../reduxFolder/langauge';



const AboutScreen = ({ navigation }: any) => {
  const cartValue = useSelector((state: any) => state.reducer);


  useEffect(() => {
    aboutDetails();
  }, [])

  const [aboutUs, setAboutUs] = useState({});

  const aboutDetails = async () => {
    try {
      const api: any = await getMethod('about-us');
      if (api.status === 200) {
        setAboutUs(api.data)
        // console.log("second", api.data)
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView >
        <HeaderScreen />
        <View style={styles.body} >
          <View style={styles.searchContianer}>
            <Text style={styles.home}> {cartValue === 'CHINESE' ? language[0].chinese : language[0].english} /</Text>
            <Text style={styles.column}> {cartValue === 'CHINESE' ? language[1].chinese : language[1].english}</Text>
          </View>

          <View style={styles.main} >
            <Image source={require('../../../assets/img/aboutItem.png')} style={styles.about} />
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Poppins-Medium', marginBottom: 5 }}>About Our Shop</Text>
            <Text style={styles.text_1}>
              {aboutUs.data}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    zIndex: -5,
  },

  column: {
    color: 'red',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins_ExtraBold',
  },

  home: {
    color: '#515151',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins_ExtraBold',
  },

  main: {
    zIndex: -2,
    position: 'relative',
    paddingLeft: windowWidth * 0.03,
    marginBottom: windowWidth * 0.01,
  },

  searchContianer: {
    width: '100%',
    height: windowWidth * 0.12,
    backgroundColor: '#E3E3E3',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins_Bold',
    flexDirection: 'row',
    color: '#515151',
    alignItems: 'center',
    paddingLeft: 8,

    marginBottom: windowWidth * 0.1,
    zIndex: -2,
    position: 'relative',
  },

  about: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    alignSelf: 'center', 
    justifyContent: 'center',
    marginBottom: windowWidth * 0.05,
  },

  text_1: {
    width: windowWidth * 0.92,
    // height: windowWidth * 0.3,
    color: '#515151',
    fontSize: windowWidth * 0.035,
    lineHeight: windowWidth * 0.05,
    alignItems: 'center',
    fontFamily: 'Poppins_800Bold',
    marginBottom: windowWidth * 0.22,
    textAlign: 'justify',
    paddingRight: 8,
  },


});

{/* LFK Singapore is a retail and wholesaler for
numerous Korean brands. The company specialises in cookware,
kitchenware, food and beverages products suitable for all
households. LFK Singapore is headquartered in Singapore,
distributing products in Southeast Asia region. Established in 2008,
with a humble beginning of retailing in wet markets, currently,
the company consists of 30+ employees, focusing on providing our clients and customers with the best goods and services. */}

