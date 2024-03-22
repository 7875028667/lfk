/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable keyword-spacing */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// // import {getMethod} from '../../utils/helper';

// const CategoryList = () => {
//   const [value, setValue] = useState([]);

//   async function getdata() {
//     try {
//       let url = 'http://ykpt.braincave.work/api/v2/products';
//       let result = await fetch(url);
//       result = await result.json();
//       setValue(result);
//       console.log(result);
//     } catch (error) {
//       console.error('error');
//     }
//   }

//   useEffect(() => {
//     getdata();
//   }, []);

//   return (
//     <View  >
//       {value.length ?
//         value.map((item) =>
//           <View >
//             <View>
//             <Text >{item.name}</Text>
//             <Text>komal is good girl</Text>
//           </View>
//           </View>
//         ) : <Text>kommu</Text>
//       }
//     </View>
//   );
// };

// export default CategoryList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 30,
//     padding: 2,
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });


// useEffect(() => {
//   fetch('http://ykpt.braincave.work/api/v2/products')
//     .then(response => response.json())
//     .then(data => {
//       // Update the products state with the retrieved data
//       setProducts(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }, []);

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
// const CategoryList = () => {
//  const [productData, setProductData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://ykpt.braincave.work/api/v2/products');
//         setProductData(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);


//   return (
//     <View>
//       <Text>Category List</Text>
//       <ScrollView>
//         <View>
//           {productData && productData.map(product => (
//             <View key={product.id}>
//               <Text>{product.id}</Text>
//               <Text>{product.name}</Text>
//               <Image
//                 source={{ uri: product.thumbnail_img }}
//                 style={{ width: 100, height: 100 }}
//               />
//               <Text>{product.sold_qty}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>

//   );

// };

const CategoryList = () => {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ykpt.braincave.work/api/v2/products/2');
        setProductData(response.data);
      } catch (error) {
        console.error(error);
      }

    };




    fetchData();

  }, []);


  return (
    <View>
      <ScrollView>
        <View>
          <View>
            {productData && (
              <View  key={productData.data.id}>
                <Text>{productData.data.id}</Text>
                <Text>{productData.data.name}</Text>
                <Image
                  source={{ uri: productData.data.thumbnail_img }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>{productData.data.user_id}</Text>
              </View>

            )}

          </View>

        </View>

      </ScrollView>

    </View>

  );

};




export default CategoryList;


{/* <View style={[styles.imageContainer_1, , { flexDirection: 'row-reverse', justifyContent: 'space-around'  }]}  >
{productData && productData.map(product => (
  <View style={styles.box} key={product.id}>
    <Image source={{ uri: product.thumbnail_img }} style={styles.img_8} />
    <View style={styles.price}>
      <Text style={styles.cost}>{product.unit_price}</Text>
      <View style={styles.item}>
        <Text style={styles.item_1}>{product.num_of_sale}</Text>
        <Text style={styles.item_2}>Sold</Text>
      </View>
    </View>
    <Text style={styles.title}>{product.name}</Text>
  </View>
))
}</View> */}

// export default CategoryList;




// import React from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';

// const AnotherComponent = ({ token }) => {
//   const addToCart = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const data = {
//         id: 18,
//         quantity: 1,
//         variant: 'S',
//       };

//       const response = await axios.post(
//         'http://ykpt.braincave.work/api/v2/carts/add',
//         data,
//         config
//       );

//       console.log(response.data); // Handle the response as needed
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <button onClick={addToCart}>Add to Cart</button>
//     // Rest of the component code
//   );
// };

// const mapStateToProps = (state) => ({
//   token: state.token.token, // Access the token from the state
// });

// export default connect(mapStateToProps)(AnotherComponent);