import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, useWindowDimensions, BackHandler, FlatList } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HeaderScreen from './HeaderScreen';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { getMethod, postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import HTMLRender from 'react-native-render-html';
import Appbar from '../../components/Appbar';





const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductDetails = ({ navigation, route }: any) => {

  const cartValue = useSelector((state: any) => state.reducer);
  const { productId, categoryId } = route.params;
  console.log("productId",productId)
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [addCart, setAddCart] = useState();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [variantPrice, setVariantPrice] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [displayedPrice, setDisplayedPrice] = useState(product?.main_price || "");
  const [selectedVariant, setSelectedVariant] = useState('');


  const { width } = useWindowDimensions();



  useEffect(() => {
    singleProduct();
    variationPricing();
    relatedProducts();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('ProductName');
      return true;
    });
    return () => {
      backHandler.remove(); // Clean up the event listener
    }

  }, [productId, selectedSize, selectedColor, navigation]);


  const onRefresh = async () => {
    setRefreshing(true);
    singleProduct();
    setRefreshing(false);
  };


  const singleProduct = async () => {

    try {
      setLoading(true);
      const api: any = await getMethod(`products/${productId}`);
      if (api.status === 200) {
        setProduct(api.data.data);
        setDisplayedPrice(api.data.data.main_price);
        setLoading(false);
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      // Check if the product has variations
      if (product.new_variations.length > 0 && product.new_variations[0] !== "") {
        // If the product has variations and the user hasn't selected a variant
        if (!selectedSize) {
          Snackbar.show({
            text: 'Please select a variant',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
          return; // Exit the function if a variant is required but not selected
        }
      }
  
      const selectedVariant = (selectedColor ? `${selectedColor}-` : '') + selectedSize;
      const body = {
        id: productId, // The product ID
        quantity: quantity, // The selected quantity
        variant: selectedVariant, // Pass the selected variant
      };
      console.log("carts", body);
  
      const response: any = await postMethod('carts/add', body);
  
      if (response.status === 200) {
        setAddCart(response.data);
        console.log("Form post method response", response);
        Snackbar.show({
          text: response.data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'green',
        });
        navigation.navigate("CartScreen");
      } else if (response.data.message === "Product Not Found") {
        Snackbar.show({
          text: 'Please Select Variant first',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'red',
        });
      } else {
        console.log('Add to Cart Error:', response.data.message);
      }
    } catch (e) {
      console.log('Error while adding to cart:', e);
      Snackbar.show({
        text: 'Retry',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'orange',
      });
    }
  };
  
  
  

const relatedProducts = async () => {

  try {

    const api: any = await getMethod(`related-products?category_id=${categoryId}&product_id=${productId}`);

    if (api.status === 200) {
      // setLoading(true);
      // console.log("first===second", api.data.data)
      setRelatedProduct(api.data.data)
      // setLoading(false);
    } else {
      console.log('API Error:', api.data.message);
    }

  } catch (e) {
    console.log('Error while fetchinggg:', e);
  }

}

const variationPricing = async () => {

  try {
    if (selectedSize || selectedColor) {

      const selectedVariant = (selectedColor ? `${selectedColor}-` : '') + selectedSize;

      const api: any = await getMethod(`products-variant-price?product_id=${productId}&variant=${selectedVariant}`);

      if (api.status === 200) {
        setVariantPrice(api.data);
        setDisplayedPrice(api.data.main_price); // Update the displayed price
        console.log("first", selectedVariant)
        console.log("second", api.data)

      } else {
        console.log('API Error:', api.data.message);
      }
    }
  } catch (e) {
    console.log('Error while fetchinggg:', e);
  }
}



return (
  <View>
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Appbar />
        <View style={styles.body}>
          <View >
            <View style={styles.searchContianer} >
              <Text style={styles.home}>Product Details</Text>
            </View>
            <View>
              {loading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <View>
                  {product && (
                    <View style={{ marginBottom: 50 }}>
                      <View style={styles.container}>
                        <Swiper
                          style={{ height: 260 }}
                          showsButtons={true}
                          dot={<View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'gray', margin: 3 }} />}
                          activeDot={<View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'red', margin: 3 }} />}
                          index={activeImageIndex} // Set the active index here
                        >
                          {product.photos.map((photo, index) => (
                            <Image key={index} source={{ uri: photo }} style={{ width: width * 0.4, height: width * 0.4, alignSelf: 'center', borderRadius: 10 }} />
                          ))}
                        </Swiper>

                      </View>
                      <View style={styles.content}>
                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                          {product.photos.map((photo, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => setActiveImageIndex(index)} // Update active index on image click
                            >
                              <Image key={index} source={{ uri: photo }} style={styles.sliderImage} />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      <View>
                        <Text style={styles.description}>
                        </Text>
                      </View>
                      <View style={styles.nameView}>
                        <Text style={styles.name}>{product.name}</Text>
                      </View>
                      <View style={styles.price}>
                        <Text style={{ color: 'red', fontFamily: 'Poppins-SemiBold' }}>Price:</Text>

                        {product.has_discount && (
                          <Text style={{ fontFamily: 'Poppins-SemiBold', color: 'black', textDecorationLine: 'line-through' }}>{product.stroked_price}</Text>
                        )}
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: 'black' }}>{displayedPrice}</Text>

                      </View>
                      <View style={{ marginTop: 35, marginBottom: 10, flexDirection: 'row', marginLeft: 23 }}>
                        <Text style={{ color: 'red', fontFamily: 'Poppins-SemiBold' }}>Quantity:</Text>
                        <View style={styles.quantity}>
                          <Pressable onPress={decreaseQuantity} >
                            <View>
                              <Text style={styles.data}>-</Text>
                            </View>
                          </Pressable>
                          <Text style={styles.data}>{quantity}</Text>
                          <Pressable onPress={increaseQuantity}>
                            <Text style={styles.data}>+</Text>
                          </Pressable>
                        </View>
                      </View>
                      <View style={styles.category}>
                        <Text style={{ color: 'red', fontFamily: 'Poppins-SemiBold' }}>Category:</Text>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: 'gray' }}> {product.category_name}</Text>
                      </View>

                      <View style={styles.categoryy}>
                        {product.new_variations.length > 0 && product.new_variations[0] !== "" && (
                          <View style={styles.size}>
                            <Text style={{ color: 'red', fontFamily: 'Poppins-SemiBold' }}>Variant : </Text>
                            {product.new_variations.map((variant: number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.SetStateAction<string> | null | undefined, index: React.Key | null | undefined) => (
                              <Text
                                key={index}
                                style={[styles.option, variant === selectedSize && { color: 'black', borderColor: 'orange' },]}
                                onPress={() => setSelectedSize(variant)} // Update selected variant on click
                              >
                                {variant}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>

                      {product.description !== null && (
                        <Text style={{ color: 'red', fontFamily: 'Poppins-SemiBold', marginBottom: 3, marginLeft: 23 }}>
                          Product Description:
                        </Text>
                      )}
                      {product.description !== null && (
                        <View>
                          {/* <Text style={styles.text_1}>{product.description}</Text> */}
                          <View style={{ marginHorizontal: 25 }}>
                            <HTMLRender source={{ html: product.description }}
                              contentWidth={width}
                              containerStyle={styles.htmlContainer} />
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                </View>
              )}
              <View style={{ height: 300, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', marginBottom: 25, color: 'red', fontSize: 20, }}>Related Products</Text>
                <View style={{ paddingLeft: 25 }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={relatedProduct}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Pressable style={styles.boxx} key={item.id} onPress={() => navigation.navigate('ProductDetails',
                        {
                          productId: item.id,
                        })}>
                        <View style={styles.categories_1}>
                          <View style={styles.aboutView}>
                            <Image source={{ uri: item.thumbnail_img }} style={styles.about} />
                          </View>
                          <Text style={styles.swiperText}>{item.name}</Text>
                        </View>
                      </Pressable>
                    )}
                  />

                </View>
              </View>
            </View>

            <View style={styles.cart_container}>
              <Pressable onPress={addToCart} >
                <View style={styles.cart_content}>
                  {/* {loading ? (
                      <ActivityIndicator size="large" color="red" />
                    ) : ( */}
                  <Text style={styles.textContent}>Add to Cart</Text>
                  {/* )} */}
                </View>
              </Pressable>
              <TouchableOpacity style={styles.cart_content_0} onPress={() => navigation.navigate('CartScreen')}>
                <Text style={styles.textContent_0}>BUY NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
)
}

export default ProductDetails

const styles = StyleSheet.create({
  htmlContainer: {
    // marginHorizontal: 10,
    color: 'red',
    fontSize: 25,

  },
  boxx: {
    marginRight: 10,

  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  imageSlider: {
    width: width * 1,
  },
  sliderImage: {
    height: width * 0.2,
    width: width * 0.2,
    marginHorizontal: 10
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    zIndex: -5,
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FAC0A4',
    borderWidth: 1,
    borderColor: '#FAC0A4',
    marginHorizontal: 3,
  },

  categories_1: {
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    alignItems: 'center',

  },


  arrow: {
    width: 20,
    height: 20,
    tintColor: 'gray',
  },

  column: {
    color: 'red',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
  home: {
    color: '#515151',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },

  item: {
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
    fontWeight: '200',
    color: '#515151',
    marginLeft: 4,
  },

  searchContianer: {
    width: '100%',
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

  container: {
    width: width * 0.75,
    // height: width * 0.6,
    flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    // marginBottom: width * 0.0,
    flexWrap: 'nowrap',
    gap: 0.1,
    zIndex: -2,
    position: 'relative',
  },

  description: {
    fontSize: width * 0.04,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 23,
  },

  about: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 10,

  },
  aboutView: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4, // For Android

  },
  swiperText: {
    fontSize: width * 0.03,
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
  },

  content: {
    width: width * 0.9,
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 25,
    backgroundColor: 'white',
  },



  text: {
    width: width * 0.9,
    // height: width * 0.08,
    flexWrap: 'nowrap',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.03,
    fontWeight: '500',
    lineHeight: 24,
    zIndex: -2,
    // position: 'relative',
  },

  star: {
    width: width * 0.9,
    height: width * 0.04,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: width * 0.03,
    zIndex: -2,
    position: 'relative',
    marginLeft: 23,
  },

  star_child: {
    width: width * 0.3,
    height: width * 0.04,

  },

  price: {
    width: width * 0.9,
    // height: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    flexWrap: 'nowrap',
    lineHeight: 24,
    color: 'red',
    gap: 5,
    marginBottom: width * -0.05,
    zIndex: -2,
    marginLeft: 23,
  },
  nameView: {
    width: width * 0.9,
    marginLeft: 23,
    marginBottom: 7
  },
  name: {
    color: 'black',
    fontSize: width * 0.04
  },

  quantity: {
    width: width * 0.15,
    height: width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    flexWrap: 'nowrap',
    color: 'red',
    marginLeft: 17,
    zIndex: -2,
    marginBottom: width * -0.4,
  },

  data: {
    width: width * 0.06,
    height: width * 0.06,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    borderColor: '#BBBBBB',
    borderWidth: 1,
    fontSize: width * 0.03,
    fontWeight: '500',
  },

  category: {
    width: width * 0.9,
    // height: width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    lineHeight: 24,
    color: 'red',
    marginBottom: width * 0.01,
    zIndex: -2,
    position: 'relative',
    marginLeft: 23,
  },
  categoryy: {
    width: width * 0.9,
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    lineHeight: 24,
    color: 'red',
    marginBottom: width * 0.01,
    zIndex: -2,
    position: 'relative',
    marginLeft: 20,
  },

  textAbout: {
    width: width * 0.9,
    height: width * 0.08,
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'nowrap',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    lineHeight: 24,
    color: 'red',
    marginBottom: width * 0.02,
    zIndex: -2,
    position: 'relative',
  },

  text_1: {
    width: width * 0.9,
    // height: width * 0.7,
    color: '#515151',
    fontSize: width * 0.03,
    lineHeight: width * 0.06,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'justify',
    marginBottom: width * 0.14,
    zIndex: -2,
    position: 'relative',
  },

  textpro: {
    width: width * 0.9,
    height: width * 0.08,
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    lineHeight: 24,
    color: 'red',
    marginBottom: width * 0.04,
    zIndex: -2,
    position: 'relative',
  },

  textCat_Pro: {
    width: width * 0.9,
    height: width * 0.08,
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    lineHeight: 24,
    zIndex: -2,
    position: 'relative',
    marginBottom: width * 0.04,
  },

  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },

  cart_container: {
    width: width * 1,
    height: width * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
    fontWeight: '500',
    flexWrap: 'nowrap',
    zIndex: -2,
    position: 'relative',
  },

  cart_content: {
    width: width * 0.5,
    height: width * 0.15,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    padding: width * 0.04,
    backgroundColor: 'white',
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
    zIndex: -2,
    position: 'relative',
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
    fontSize: width * 0.04,
    color: 'white',
  },


  dot: {
    width: width * 1,
    height: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: height * 0.05,
    zIndex: -2,
    position: 'relative',
  },

  dot_1: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 50,
    backgroundColor: '#BBBBBB',
  },

  dot_0: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 50,
    backgroundColor: '#FAC0A4',
  },
  centerImage: {
    height: width * 0.3,
    width: width * 0.3,
  },
  color: {
    // display:'flex',
    flexDirection: 'row'
  },
  size: {
    marginRight: 50,
    marginBottom: 10,
    flexDirection: 'row',

  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'red',
    paddingHorizontal: 7,
    paddingVertical: 5,

  },
  option: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    marginRight: 8, // Add spacing between options
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
})
function setSelectedVariant(arg0: string) {
  throw new Error('Function not implemented.');
}

