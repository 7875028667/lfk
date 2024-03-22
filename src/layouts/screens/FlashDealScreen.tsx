import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Button, Pressable, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../reduxFolder/action';
import { language } from '../../reduxFolder/langauge';
import { RadioButton } from 'react-native-paper';
import { getMethod } from '../../utils/helper';
import Modal from 'react-native-modal';
import Appbar from '../../components/Appbar';



const FlashDealScreen = ({ navigation }: any) => {
  
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortPage, setSortPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);
  const dispatch = useDispatch();
  const cartValue = useSelector((state: any) => state.reducer);
  const [lengPage, setLengPage] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [selectedFilter, setSelectedFilter] = useState('1');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);



  const [deals, setDeals] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true); // State to control rendering
  const [showDeals, setShowDeals] = useState(false); // State to control rendering



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const api: any = await getMethod('flash-deals');
      if (api.status === 200) {
        console.log("ALL PRODUCTS--", api.data.data[0].products.data)
        setProducts(api.data.data[0].products.data);

        // const uniqueCategoryIds = [...new Set(api.data.data.map(item => item.category_id))];
        // setCategoryIds(uniqueCategoryIds);

      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  };





  const sortFilter = async () => {
    try {
      const api: any = await getMethod(`products-sort-filter?sort_by=${selectedSort}&filter_by_category=${selectedFilter}`);

      if (api.status === 200) {
        setDeals(api.data.data);
        setShowAllProducts(false);
        setShowDeals(true);
        // console.log("TEST---- FIRST", api.data.data)
      } else {
        console.log('API Error:', api.data.message);
      }
    } catch (e) {
      console.log('Error while fetchinggg:', e);
    }
  }



  const handlePickerOpen = () => {
    setIsPickerOpen(true);
    setLengPage(!lengPage);
    setSortPage(false); // Set sortPage to false
    setFilterPage(false);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsPickerOpen(false);
    // console.log(selectedOption)
    if (cartValue === 'ENGLISH' && selectedOption === 'ENGLISH') {
      dispatch(changeLanguage('ENGLISH'));

    }
    else {
      dispatch(changeLanguage('CHINESE'));

    }
    dispatch(changeLanguage(option));
  };


  // MODAL FUNCTION===============================

  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const [checked, setChecked] =useState('');


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };



  const handleRadioButtonChange = (value: string) => {
    setSelectedSort(value);
    setChecked(value);
    sortFilter();

  };
  const handleRadioButtonChangeCategory = (value: string) => {
    setSelectedFilter(value);
    setChecked(value);
    sortFilter();

  };


  // MODAL FUNCTION===============================

  const restFilter = () => {
    setShowAllProducts(true);
    setShowDeals(false);
  }


  return (
    <ScrollView>
      <SafeAreaView>
        <Pressable
        // onPress={bodyFun}
        >
          <View style={styles.body}>
            <Appbar />
            <View style={styles.searchContianer}>
              <Text style={styles.home}>Flash Deals</Text>
            </View>
            <Text onPress={restFilter}>RESET FILTER</Text>
            <View style={styles.container}>
              <Pressable onPress={toggleModal} >
                <View style={styles.content}>
                  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
                    <Path
                      d="M8.93642 7.17973C8.93642 7.34295 8.86917 7.49948 8.74946 7.61489C8.62976 7.7303 8.4674 7.79514 8.29811 7.79514H0.638316C0.469024 7.79514 0.306666 7.7303 0.186958 7.61489C0.0672509 7.49948 0 7.34295 0 7.17973C0 7.01651 0.0672509 6.85998 0.186958 6.74457C0.306666 6.62916 0.469024 6.56432 0.638316 6.56432H8.29811C8.4674 6.56432 8.62976 6.62916 8.74946 6.74457C8.86917 6.85998 8.93642 7.01651 8.93642 7.17973ZM0.638316 1.23081H15.1068C15.2761 1.23081 15.4385 1.16597 15.5582 1.05056C15.6779 0.935152 15.7451 0.778621 15.7451 0.615405C15.7451 0.45219 15.6779 0.295659 15.5582 0.180248C15.4385 0.0648371 15.2761 0 15.1068 0H0.638316C0.469024 0 0.306666 0.0648371 0.186958 0.180248C0.0672509 0.295659 0 0.45219 0 0.615405C0 0.778621 0.0672509 0.935152 0.186958 1.05056C0.306666 1.16597 0.469024 1.23081 0.638316 1.23081ZM6.59593 13.1286H0.638316C0.469024 13.1286 0.306666 13.1935 0.186958 13.3089C0.0672509 13.4243 0 13.5808 0 13.7441C0 13.9073 0.0672509 14.0638 0.186958 14.1792C0.306666 14.2946 0.469024 14.3595 0.638316 14.3595H6.59593C6.76522 14.3595 6.92758 14.2946 7.04729 14.1792C7.16699 14.0638 7.23425 13.9073 7.23425 13.7441C7.23425 13.5808 7.16699 13.4243 7.04729 13.3089C6.92758 13.1935 6.76522 13.1286 6.59593 13.1286ZM19.8133 10.8475C19.6936 10.7323 19.5314 10.6676 19.3622 10.6676C19.1931 10.6676 19.0309 10.7323 18.9112 10.8475L15.7451 13.8989V5.53865C15.7451 5.37543 15.6779 5.2189 15.5582 5.10349C15.4385 4.98808 15.2761 4.92324 15.1068 4.92324C14.9375 4.92324 14.7752 4.98808 14.6554 5.10349C14.5357 5.2189 14.4685 5.37543 14.4685 5.53865V13.8989L11.3024 10.8475C11.1814 10.7388 11.0214 10.6797 10.856 10.6825C10.6907 10.6853 10.5329 10.7499 10.4159 10.8626C10.299 10.9754 10.232 11.1275 10.2291 11.2869C10.2262 11.4464 10.2875 11.6007 10.4003 11.7173L14.6557 15.82C14.7754 15.9353 14.9377 16 15.1068 16C15.276 16 15.4382 15.9353 15.5579 15.82L19.8133 11.7173C19.9329 11.6019 20 11.4455 20 11.2824C20 11.1194 19.9329 10.9629 19.8133 10.8475Z"
                      fill="#EC1C24"
                    />
                  </Svg>
                  <Text style={styles.sortText}>{cartValue === 'CHINESE' ? language[2].chinese : language[2].english}</Text>
                </View>
              </Pressable>
              <Pressable onPress={toggleSecondModal} >
                <View style={styles.content}>
                  <Image source={require('../../../assets/img/Group.png')} style={styles.sort} />
                  <Text style={styles.sortText}>{cartValue === 'CHINESE' ? language[3].chinese : language[3].english}</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.imageContainer_1} >
              {showAllProducts && // Render only if showAllProducts is true
                products.map(item => (
                  <View style={styles.box} key={item.id}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails',
                      {
                        productId: item.id,
                        categoryId: item.category_id
                      }
                      // {categoryId: item.category_id}
                    )}>
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: item.thumbnail_image }} style={styles.img_8} />
                      </View>
                      <View style={styles.price}>
                        <Text style={styles.cost}>{item.main_price} </Text>
                        <View style={styles.item}>
                          <Text style={styles.item_1}> {item.new_num_of_sale} </Text>
                          <Text style={styles.item_2}>Sold</Text>
                        </View>
                      </View>
                      <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.imageContainer_one}>
            {showDeals && // Render only if showDeals is true
              deals.map((deal: any) => (
                <View style={styles.box} key={deal.id}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: deal.thumbnail_img }} style={styles.img_8} />
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.cost}>{deal.main_price} </Text>
                    <View style={styles.item}>
                      <Text style={styles.item_1}> {deal.new_num_of_sale} </Text>
                      <Text style={styles.item_2}>Sold</Text>
                    </View>
                  </View>
                  <Text style={styles.title}>{deal.name}</Text>
                </View>

              ))}
          </View>

          {/* MODAL=================================================== */}
          {/* FITER MODAL=============================================== */}
          <Modal isVisible={isSecondModalVisible} onBackdropPress={toggleSecondModal} style={styles.modal}>
            <View style={styles.modalContent} >
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 10 }}>
                <Text style={{ color: 'black', fontSize: windowWidth * 0.04, fontWeight: 'bold' }}>Filter by</Text>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <ScrollView>
                  <RadioButton.Group onValueChange={handleRadioButtonChangeCategory} value={checked}>
                    
                    {categoryIds.map(categoryId => (
                      <RadioButton.Item
                        key={categoryId}
                        label={`Category ${categoryId}`} // You can modify the label as needed
                        value={categoryId}
                        color="red"
                        labelStyle={{}}
                      />
                    ))}
                  </RadioButton.Group>
                </ScrollView>
              </View>
            </View>
          </Modal>


          {/* SORT MODAL=================================================== */}

          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
            <View style={styles.modalContent} >
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 10 }}>
                <Text style={{ color: 'black', fontSize: windowWidth * 0.04, fontWeight: 'bold' }}>Sort by</Text>
              </View>
              <View>
                <RadioButton.Group onValueChange={handleRadioButtonChange} value={checked} >
                  <RadioButton.Item label="Popularity" value="popularity" color="red" labelStyle={{}} />
                  <RadioButton.Item label="Price- Low to High" value="price_low_to_high" color="red" labelStyle={{}} />
                  <RadioButton.Item label="Price- High to Low" value="price_high_to_low" color="red" labelStyle={{}} />
                  <RadioButton.Item label="Newest First" value="newest" color="red" labelStyle={{}} />
                </RadioButton.Group>
              </View>
            </View>
          </Modal>
          {/* SORT MODAL=============================================== */}
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};



export default FlashDealScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  selectedOptionText: {
    color: 'red',
  },

  optionText: {
    color: 'black',
  },

  pickerContainer: {
    width: 35,
    height: 30,
    position: 'absolute',
    top: -20,
    backgroundColor: 'white',
    marginLeft: 25,
    marginTop: 10,
    
  },

  optionContainer: {
    borderBottomLeftColor: '#D9D9D9',
    borderBottomWidth: 1,
    padding: 5,
    borderRadius: 3,
    color: 'black',
  },

  mid: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: -5,
  },

  midCol: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.94,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  world: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    gap: 8,
  },

  img_2: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.14,
    position: 'relative',
  },

  img_3: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },

  public: {
    width: 30,
    flexDirection: 'row',
    marginLeft: -15,
  },

  openPage: {
    width: windowWidth * 0.56,
    height: windowWidth * 8,
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 5,
    marginTop: -25,
    position: 'absolute',
    backgroundColor: '#F1F1F1',
    zIndex: 999,
  },

  CrossImg: {
    marginLeft: windowWidth * -0.05,
    height: windowWidth * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: windowWidth * 0.1,
    gap: windowWidth * 0.07,
    marginBottom: windowWidth * 0.05,
  },

  logo: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.14,
  },

  closeIcon: {
    display: 'none',
  },

  closePage: {
    display: 'none',
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth * 0.56,
    alignItems: 'center',
    gap: windowWidth * 0.05,
    // marginTop:width *0.05,
    marginBottom: windowWidth * 0.03,
    color: 'black',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },

  one: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    position: 'relative',
    marginBottom: windowWidth * 0.01,
  },

  textOne: {
    fontSize: windowWidth * 0.04,
    fontWeight: '900',
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },

  textOne_0: {
    fontSize: windowWidth * 0.04,
    fontWeight: '900',
    fontFamily: 'Poppins_800Bold',
    color: 'red',
  },

  img_4: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },

  text: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    fontFamily: 'Poppins_Bold',
    color: 'black',
  },

  title: {
    fontFamily: 'Poppins_Bold',
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
    lineHeight: 20,
    // backgroundColor:'red',
    width: 225,
  },
  body: {
    flex: 1,

  },
  home: {
    color: '#515151',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins-Medium',
  },

  textAbout: {
    color: 'red',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },

  sortText: {
    fontSize: windowWidth * 0.045,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: 'black',
  },

  searchContianer: {
    width: windowWidth * 1,
    height: windowWidth * 0.12,
    backgroundColor: '#E3E3E3',
    fontSize: windowWidth * 0.05,
    fontFamily: 'Poppins_600Bold',
    flexDirection: 'row',
    color: '#515151',
    alignItems: 'center',
    paddingLeft: 8,
    marginBottom: windowWidth * 0.1,
    position: 'relative',
    zIndex: -15,
  },

  container: {
    width: windowWidth * 1,
    display: 'flex',
    height: windowHeight * 0.08,
    flexDirection: 'row',
    marginBottom: windowWidth * 0.07,
    fontWeight: '900',
    position: 'relative',
    zIndex: -15,
    flex:1
  },

  content: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.09,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontSize: windowWidth * 0.08,
    fontWeight: '900',
    fontFamily: 'Poppins_600SemiBold',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    color: 'black',
    position: 'relative',
    zIndex: -15,
  },

  sort: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.05,
  },

  text_0: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: windowWidth * 0.04,
    lineHeight: 20,
    color: 'black',
    position: 'relative',
    zIndex: -15,
  },

  imageContainer_1: {
    width: '100%',
    zIndex: -5,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 12,
    backgroundColor: 'white',
    flex:1,
  },
  imageContainer_one: {
    width: '100%',
    height: '100%',
    marginBottom: windowHeight * 0.12,
    zIndex: -5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 12,
    // backgroundColor: 'white',
    // flex:1,
    backgroundColor: 'white',

  },

  box: {
    width: '48%',
    height: windowWidth * 0.55,
  },

  imageContainer: {
    width: windowWidth * 0.43,
    height: windowWidth * 0.33,
    backgroundColor: '#FEFBF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    paddingRight: 5,
    zIndex: -5,

  },

  img_8: {
    width: windowWidth * 0.42,
    height: windowWidth * 0.32,
    // marginBottom: windowHeight * 0.01,
    // marginRight: 15,
    // padding: 15,
    marginLeft: 5,
    borderRadius: 6,
    // zIndex: -55,
  },

  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.01,
    width: windowWidth * 0.4,
  },

  item_1: {
    color: 'red',
    fontFamily: "Poppins-Bold",
    marginTop: 3,
    fontSize: windowWidth * 0.025
    // backgroundColor:'plum',
  },

  item_2: {
    color: 'black',
    fontFamily: "Poppins",
    fontSize: windowWidth * 0.025
  },

  cost: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: windowWidth * 0.03,
    // lineHeight: 20,
    fontWeight: '700',
    /* identical to box height */
    color: 'black',
  },

  item: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: -5,
  },

  sortList: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.57,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: windowHeight * -0.99,
  },

  textContent: {
    width: windowWidth * 0.92,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Poppins_Medium',
    fontSize: windowWidth * 0.04,
    color: '#515151',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    textAlign: 'center',
    padding: windowWidth * 0.05,
    marginBottom: windowWidth * 0.02,
  },

  value: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.05,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontSize: windowWidth * 0.04,
    color: '#515151',
    paddingLeft: windowWidth * 0.05,
    paddingRight: windowWidth * 0.05,
    gap: windowWidth * 0.8,
    marginBottom: windowWidth * 0.05,
  },

  valueText: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    fontWeight: '700',
    fontFamily: 'Poppins_Light',
    fontSize: windowWidth * 0.05,
    color: 'black',
  },
  globe: {
    // paddingRight:20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: windowHeight * 0.35, // Adjust the height as needed
  },
  modalText: {
    fontSize: windowWidth * 0.04,
    textAlign: 'center',
  },
  sortImage: {
    height: 200,
    width: 200,
  }
});


