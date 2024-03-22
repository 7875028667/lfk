import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable, RefreshControl,
  FlatList, ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderScreen from './HeaderScreen';
import Swiper from 'react-native-swiper';
import { getMethod } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { language } from '../../reduxFolder/langauge';
import { CommonActions } from '@react-navigation/native';


const HomeScreen = ({ navigation }: any) => {
  const cartValue = useSelector((state: any) => state.reducer);
  const [categoryData, setCategoryData] = useState([]);
  const [todaysDealData, setTodaysDealData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [flashDeals, setFlashDeals] = useState([])
  const [featuredDeals, setfeaturedDeals] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await categoryItems();
        await todaysDeal();
        await flashDeal();
        await featuredDeal();
        await popularProductDeal();
        await SwiperApi();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    fetchData();
    return () => {
      // Clear the loading timeout if the component is unmounted
      clearTimeout(loadingTimeout);
    };
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Call the functions that fetch your data here
      await categoryItems();
      await todaysDeal();
    } catch (error) {
      console.log('Error while refreshing:', error);
    }
    setIsRefreshing(false);
  };


  const registaion = () => {
    navigation.navigate('Create');
  };


  const product = () => {
    navigation.navigate('Product');
  };

  //  const onCheck = async () => {
  //   try {
  //       const response = await axios.get(
  //         `https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y`
  //       );

  //       if (response.data && response.data.results.length > 0) {
  //       //   const address = response.data.results[0].ADDRESS;
  //       //   setFormData((prevData) => ({
  //       //     ...prevData,
  //       //     address: address,
  //       //   }));
  //       } else {
  //         console.log('Postal code not found.');
  //       }
  //     } catch (error) {
  //       console.log('Error fetching address:', error.message);
  //     }
  // } 


  const categoryItems = async () => {
    try {
      const api: any = await getMethod('all-categories-home-screen');
      if (api.status === 200) {
        console.log("categoryData", api.data);
        setCategoryData(api.data.data);
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  const todaysDeal = async () => {
    try {
      const apiData: any = await getMethod('products/todays-deal-home-screen');
      if (apiData.status === 200) {
        // console.log("todays", apiData.data);=+-
        setTodaysDealData(apiData.data.data);
      } else {
        console.log('API Error:', apiData.data.message);
      }
    } catch (e) {
      console.log('Error while fetching:', e);
    }
  }

  const flashDeal = async () => {
    try {
      const api: any = await getMethod('flash-deals-home-screen');
      if (api.status === 200) {
        setFlashDeals(api.data.data[0].products.data);
        // console.log("second", api.data.data[0].products.data)
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  const featuredDeal = async () => {
    try {
      const api: any = await getMethod('products/featured-home-screen');
      if (api.status === 200) {
        setfeaturedDeals(api.data.data);
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  const popularProductDeal = async () => {
    try {
      const api: any = await getMethod('products/popular-products-home-screen');
      if (api.status === 200) {
        setPopularProduct(api.data.data);
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  const SwiperApi = async () => {
    try {
      const api: any = await getMethod('banners');
      if (api.status === 200) {
        setSwiper(api.data.data);
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />}>
        {isLoading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <>
            <HeaderScreen />
            <View style={styles.body}>
              <View style={styles.searchContianer}>
                <TextInput style={styles.searchContent}
                  underlineColor="#E3E3E3"
                  right={
                    <TextInput.Icon
                      icon={() => <Icon name="search" size={24} color="#BBBBBB" />}
                    />
                  }
                />
              </View>
              {/* ========================================================================================= */}
              <View>
                {/* <Text onPress={() => navigation.navigate('Test')} style={{padding:30}}>Test</Text> */}

              </View>
              {/* ============================================================================================ */}

              <View style={styles.categories_1}>
                <View style={styles.imageContainer}>
                  <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    dot={<View style={styles.dotStyle} />}
                    activeDot={<View style={styles.activeDotStyle} />}
                  >
                    {swiper.map((item, index) => (
                      <View style={styles.categories_1} key={index}>
                        <Image source={{ uri: item.photo }} style={styles.img_6}
                        onError={() => console.log("Error loading image")} />
                      </View>
                    ))}
                  </Swiper>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <View style={styles.categories}>
                  <Text style={styles.text_0}>{cartValue === 'CHINESE' ? language[7].chinese : language[7].english}</Text>
                  <Text style={styles.categoryView}>{cartValue === 'CHINESE' ? language[14].chinese : language[14].english}</Text>
                </View>
                <FlatList
                  horizontal
                  data={categoryData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item.banner }} style={styles.img_7} />
                  )}
                  ListEmptyComponent={() => (
                    <Text style={styles.displayText}>No Deals available for Today.</Text>
                  )}
                />
              </View>
              <View>
                <View style={styles.categories}>
                  <Text style={styles.text_0}>Today's Deal</Text>
                  <Pressable onPress={() => navigation.navigate('TodayDealScreen')}>
                    <Text style={styles.categoryView}>View All</Text>
                  </Pressable>
                </View>
                <FlatList
                  horizontal
                  data={todaysDealData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (

                    <Pressable style={styles.boxx} key={item.id} onPress={() =>
                      navigation.dispatch(
                        CommonActions.navigate({
                          name: 'ProductDetails',
                          params:
                          {
                            productId: item.id,
                            // categoryId: item.category_id
                          },
                        })
                      )}>
                      <Image source={{ uri: item.thumbnail_image }} style={styles.img_8} />
                      <View style={styles.space}>
                        <Text style={styles.mainPrice}>{item.stroked_price}</Text>
                      </View>
                      <View style={styles.price}>
                        <Text style={styles.cost}>{item.main_price}</Text>
                        <View style={styles.item}>
                          <Text style={styles.item_1}>{item.new_num_of_sale}</Text>
                          <Text style={styles.item_2}>Sold</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.productTitle}>{item.name}</Text>
                      </View>
                    </Pressable>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={styles.displayText}>No Deals available for Today.</Text>
                  )}
                />
              </View>
              <View>
                <View style={styles.categories}>
                  <Text style={styles.text_0}>Flash Deal</Text>

                  <Pressable onPress={() => navigation.navigate('FlashDealScreen')}>
                    <Text style={styles.categoryView}>View All</Text>
                  </Pressable>
                </View>
                <FlatList
                  horizontal
                  data={flashDeals}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <Pressable style={styles.boxx} key={item.id} onPress={() =>
                      navigation.dispatch(
                        CommonActions.navigate({
                          name: 'ProductDetails',
                          params:
                          {
                            productId: item.id,
                            // categoryId: item.category_id
                          },
                        })
                      )}>
                      <View style={styles.boxx} key={item.id}>
                        <Image source={{ uri: item.thumbnail_image }} style={styles.img_8} />
                        <View style={styles.space}>
                          <Text style={styles.mainPrice}>{item.stroked_price}</Text>
                        </View>
                        <View style={styles.price}>
                          <Text style={styles.cost}>{item.main_price}</Text>
                          <View style={styles.item}>
                            <Text style={styles.item_1}>{item.new_num_of_sale}</Text>
                            <Text style={styles.item_2}>Sold</Text>
                          </View>
                        </View>
                        <View>
                          <Text style={styles.productTitle}>{item.name}</Text>
                        </View>
                      </View>
                    </Pressable>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={styles.displayText}>No Deals available for Today.</Text>
                  )}
                />
              </View>

              <View style={styles.categories}>
                <Text style={styles.text_0}>Featured Products</Text>
                <Pressable onPress={() => navigation.navigate('FeaturedProductScreen')}>
                  <Text style={styles.categoryView}>View All</Text>
                </Pressable>
              </View>
              <FlatList
                horizontal
                data={featuredDeals} // Use the data from the API response
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable style={styles.boxx} key={item.id} onPress={() => navigation.navigate('ProductDetails',
                    {
                      productId: item.id,
                    })}>
                    <View style={styles.boxx}>
                      <Image source={{ uri: item.thumbnail_image }} style={styles.img_8} />
                      <View style={styles.price}>
                        <Text style={styles.cost}>{item.main_price}</Text>
                        <View style={styles.item}>
                          <Text style={styles.item_1}>{item.new_num_of_sale}</Text>
                          <Text style={styles.item_2}>Sold</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.productTitle}>{item.name}</Text>
                      </View>
                    </View>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  <Text style={styles.displayText}>No Deals available for Today.</Text>
                )}
              />

              <Image source={require('../../../assets/img/promotional-banner.png')} style={styles.offer} />
              <View style={styles.categories}>
                <Text style={styles.text_0}>Popular Products</Text>
                <Pressable onPress={() => navigation.navigate('PopularProductScreen')}>
                  <Text style={styles.categoryView}>View All</Text>
                </Pressable>
              </View>
              <FlatList
                horizontal
                data={popularProduct} // Use the data from the API response stored in popularProduct
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable style={styles.boxx} key={item.id} onPress={() => navigation.navigate('ProductDetails',
                    {
                      productId: item.id,
                    })}>
                    <View style={styles.boxx}>
                      <Image source={{ uri: item.thumbnail_image }} style={styles.img_8} />
                      <View style={styles.price}>
                        <Text style={styles.cost}>{item.main_price}</Text>
                        <View style={styles.item}>
                          <Text style={styles.item_1}>{item.new_num_of_sale}</Text>
                          <Text style={styles.item_2}>Sold</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.productTitle}>{item.name}</Text>
                      </View>
                    </View>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  <Text style={styles.displayText}>No Deals available for Today.</Text>
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>

  );
};

export default HomeScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.05,
    zIndex: -28,
  },

  searchContianer: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.12,
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.02,
    borderRadius: 10,
    zIndex: -5,
    position: 'relative',
  },

  searchContent: {
    width: windowWidth * 0.85,
    height: windowWidth * 0.12,
    backgroundColor: '#E3E3E3',
    fontSize: windowWidth * 0.04,
    fontFamily: 'Poppins-Bold',
    borderBottomColor: '#E3E3E3',
    outlinewindowWidth: 0,
    borderRadius: 10,
  },

  img_5: {
    width: '5.2%',
    height: windowWidth * 0.05,
    paddingLeft: windowWidth * 0.01,
    paddingTop: windowWidth * 0.05,

  },

  imageContainer: {
    width: windowWidth * 0.87,
    height: windowWidth * 0.46,
    marginBottom: 20,
    zIndex: -5,
    position: 'relative',
  },

  img_6: {
    width: windowWidth * 0.88,
    height: windowWidth * 0.42,
    marginBottom: windowHeight * 0.01,
  },

  dotStyle: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: 50,
    backgroundColor: '#BBBBBB',
    marginHorizontal: 4,
    top: 35,
  },

  activeDotStyle: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: 50,
    backgroundColor: '#FAC0A4',
    marginHorizontal: 4,
    top: 35,
  },

  dot: {
    width: '100%',
    height: windowHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: windowHeight * 0.1,
  },

  dot_1: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: 50,
    backgroundColor: '#BBBBBB',
  },

  dot_0: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    borderRadius: 50,
    backgroundColor: '#FAC0A4',
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowWidth * 0.05,
    fontSize: windowWidth * 0.04,
  },

  text_0: {
    fontFamily: 'Poppins_Bold',
    fontSize: windowWidth * 0.05,
    lineHeight: 30,
    fontWeight: '800',
    /* identical to box height */
    color: 'black',
  },

  categoryView: {
    fontFamily: 'Poppins_Bold',
    fontSize: windowWidth * 0.04,
    color: '#FAC0A4',
    lineHeight: 30,
    fontWeight: '800',
  },

  categories_1: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 120,
    fontFamily: 'Poppins-SemiBold',
    flexWrap: 'wrap'
  },

  productTitle: {
    width: windowWidth * 0.34,
    height: windowWidth * 0.1,
    marginBottom: windowHeight * 0.05,
    fontFamily: 'Poppins_Medium',
    fontSize: windowWidth * 0.03,
    color: 'black',
  },

  mainPrice: {
    textDecorationLine: 'line-through',
    color: 'black',
    fontSize: windowWidth * 0.022,
    height: windowWidth * 0.3,
  },

  img_7: {
    width: 200,
    height: 150,
    marginRight: 10
  },
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },


  boxx: {
    marginRight: 10
  },
  categories_2: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 80,
    fontFamily: 'Poppins-SemiBold',
    flexWrap: 'wrap',
    marginHorizontal: 10
  },

  todaysDeal: {
    // width: windowWidth * 0.9,
    height: windowWidth * 0.67,
    marginBottom: windowHeight * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  categories_3: {
    width: windowHeight * 0.53,
    height: windowWidth * 0.48,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: windowHeight * 0.1,
    zIndex: -5,
    position: 'relative',
  },

  box: {
    width: '45%',
    height: windowWidth * 0.2,
  },



  box_1: {
    width: windowHeight * 0.4,
    height: windowHeight * 0.5,
    marginBottom: windowHeight * -0.5,
  },

  img_8: {
    width: '100%',
    height: 100,
    marginBottom: windowHeight * 0.01,
    borderRadius: 10,
    marginRight: 10
  },

  price: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth * 0.4,
    marginBottom: windowHeight * 0.01,
    justifyContent: 'space-between',
  },

  cost: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: windowWidth * 0.03,
    lineHeight: 30,
    /* identical to box height */
    color: 'black',
  },

  item: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    gap: 5,
  },

  item_1: {
    color: '#EC1C24',
    fontSize: windowWidth * 0.03,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 30,
    fontWeight: '600',
  },

  item_2: {
    color: '#000000',
    fontSize: windowWidth * 0.025,
    fontFamily: 'Poppins_200SemiBold',
    lineHeight: 30,
  },

  space: {
    width: '100%',
    height: windowWidth * 0.03,
    lineHeight: 15,
    marginBottom: windowWidth * 0.01,
  },

  offer: {
    width: '100%',
    height: windowWidth * 0.25,
    marginBottom: windowHeight * 0.05,
    zIndex: -5,
    position: 'relative',
  },
  displayText: {
    fontSize: windowWidth * 0.035,
    color: 'black',
    alignSelf: 'center',

  },
});


