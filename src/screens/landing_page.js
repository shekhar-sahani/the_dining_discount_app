import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import AppHeader from '../components/header';
// import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';
import { Searchbar, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCarousel from '../components/ImageCarousel';
import CategoriesCarousel from '../components/CategoriesCarousel';
import RestaurantCard from '../components/RestaurantCard';
import {NGROK_URL} from "@env";

// const data = [
//     {
//       id: 0,
//     //   uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
//       uri: require('../assets/images/food_banner.png'),
//       title: 'Dahlia',
//     },
//     {
//         id: 1,
//         uri: require('../assets/images/food_banner.png'),
//         title: 'Dahlia',
//     },
//     {
//         id: 2,
//         uri: require('../assets/images/food_banner.png'),
//         title: 'Dahlia',
//     },
//      // https://unsplash.com/photos/Jup6QMQdLnM
//     // {
//     //   id: 1,
//     //   uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
//     //   title: 'Sunflower',
//     // }, // https://unsplash.com/photos/oO62CP-g1EA
//     // {
//     //   id: 2,
//     //   uri: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
//     //   title: 'Zinnia',
//     // }, // https://unsplash.com/photos/gKMmJEvcyA8
//     // {
//     //   id: 3,
//     //   uri: 'https://images.unsplash.com/photo-1587814213271-7a6625b76c33',
//     //   title: 'Tulip',
//     // }, // https://unsplash.com/photos/N7zBDF1r7PM
//     // {
//     //   id: 4,
//     //   uri: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4',
//     //   title: 'Chrysanthemum',
//     // }, // https://unsplash.com/photos/GsGZJMK0bJc
//     // {
//     //   id: 5,
//     //   uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
//     //   title: 'Hydrangea',
//     // }, // https://unsplash.com/photos/coIBOiWBPjk
// ];

// const category_data = [
//     {
//       id: 0,
//     //   uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
//       uri: require('../assets/images/food_thali.png'),
//       title: 'All',
//     },
//     {
//         id: 1,
//         uri: require('../assets/images/food_thali.png'),
//         title: 'Pure Veg',
//     },
//     {
//         id: 2,
//         uri: require('../assets/images/non_veg_thali.png'),
//         title: 'Veg & Non Veg',
//     },
//     {
//         id: 3,
//         uri: require('../assets/images/bar_resto.png'),
//         title: 'Bar & Resto',
//     },
//     {
//         id: 4,
//         uri: require('../assets/images/pub_lounge.png'),
//         title: 'Pub & lounge',
//     },
//     {
//         id: 5,
//         uri: require('../assets/images/non_veg_thali.png'),
//         title: 'Chinese',
//     },
//     {
//         id: 6,
//         uri: require('../assets/images/non_veg_thali.png'),
//         title: 'Fast Food',
//     },
// ];

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff',
    },
    searchbox: {
        backgroundColor: '#ffffff',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#0000001F',
        width:width * 0.98
    },
    viewWidth: {
        flex:1,
        width:width * 0.99,
        marginTop:20,
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor:'blue'
    }
});

const LandingPage = ({navigation, route}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [restaurantListSearched, setRestaurantListSearched] = React.useState([]);
    const [offersArray, setOffersArray] = React.useState([]);
    const [categoriesArray, setCategoriesArray] = React.useState([]);
    
    const restaurant_data = {
        "title":"Relax Pure Veg",
        "rating":"4.5",
        "timing":"9:00 am to 11:00 pm"
    };
    
    useEffect( () => {
        console.log("route=================",route)
        async function requestLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Example App',
                        'message': 'Example App access to your location '
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the location==========");
                    GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 60000,
                    })
                    .then(location => {
                        // console.log("position===========");
                        // console.log(location);
                        // console.log("position===========");
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })
                    // Geolocation.getCurrentPosition(
                    //     (position) => {
                    //         console.log("position===========");
                    //         console.log(position);
                    //         console.log("position===========");
                    //     },
                    //     (error) => {
                    //         // See error code charts below.
                    //         console.log(error.code, error.message);
                    //     },
                    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    // );
                    // alert("You can use the location");
                } else {
                    console.log("location permission denied")
                    alert("Location permission denied");
                }
            } catch (err) {
                console.warn(err)
            }
        }
        requestLocationPermission();
    }, []);

    useEffect( () => {
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(data)
        }
        fetch(NGROK_URL + '/restaurant/getAllRestaurants', options)
        .then(response => response.json())
        .then(result => {
            // console.log('getAllRestaurants=================',result);
            setRestaurantList(result);
            setRestaurantListSearched(result);
        });

        fetch(NGROK_URL + '/offers/getAllOffers', options)
        .then(response => response.json())
        .then(result => {
            // console.log('getAllOffers=================',result);
            setOffersArray(result);
        });

        fetch(NGROK_URL + '/category/getAllCategories', options)
        .then(response => response.json())
        .then(result => {
            // console.log('getAllCategories=================',result);
            setCategoriesArray(result);
        });
    }, []);

    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    //     return () => {
    //       BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    //     };
    // }, []);
    useEffect(() => {
        console.log('route==========================================================================',route.name);
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [route, navigation])

    // const handleBackButtonClick() {
    //     navigation.goBack();
    //     return true;
    // }

    const onChangeSearch = (query) => {
        console.log("query=======",searchQuery);
        setSearchQuery(query);
        const reg = new RegExp(query,'i');
        let filterByValue = restaurantList.filter((item)=>{
            let flag = false;
            for(let prop in item){
                if(reg.test(item[prop])){
                    flag = true;
                }
            };
            return flag;
        });
        setRestaurantListSearched(filterByValue);
        if(query == '') {
            setRestaurantListSearched(restaurantList);
        }
        // console.log("filterByValue=============",filterByValue);
    } ;

    return (
        <ScrollView style={styles.container} stickyHeaderIndices={[0]} >
            <View style={{ backgroundColor:"#ffffff" }}>
                <AppHeader {...navigation} />
                <View style={{ alignItems:'center', marginTop:20 }}>
                    <Searchbar
                        placeholder="Search restaurants or food..."
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        clearIcon={()=><Ionicons name="mic-outline" color="#A2A2A3" size={30}/>}
                        iconColor={'#A2A2A3'}
                        style={styles.searchbox}
                        placeholderTextColor={'#CFD0D2'}
                    />
                </View>
            </View>
            

            <View style={{ flex:1, alignItems:'center' }}>
                <View style={styles.viewWidth}>
                    {searchQuery == '' ? 
                    <View  style={{ width:'100%'  }}>
                        <Text style={{ textAlign:'left', width:100, fontSize:20, fontFamily:'Roboto-Bold', fontWeight:400 }}>
                            Banners
                        </Text>

                        <View style={{ marginTop:10 }}>
                            <ImageCarousel data={offersArray} />
                        </View>

                        <View>
                            <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'  }}>
                                <Text style={{ textAlign:'left', width:100, fontSize:20, fontFamily:'Roboto-Bold', fontWeight:400, marginBottom:10 }}>Categories</Text>
                                <Text style={{ textAlign:'right', width:100, fontSize:17, fontFamily:'Roboto-Bold', fontWeight:400, marginBottom:10, color:"#FF9200" }}>View All</Text>
                            </View>
                            <CategoriesCarousel data={categoriesArray} />
                        </View>
                    </View>: null}

                    <View>
                        <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'  }}>
                            <Text style={{ textAlign:'left', fontFamily:'Roboto-Bold', fontWeight:400, marginBottom:10, fontSize:22 }}>All Restaurants</Text>
                            <Text style={{ textAlign:'left', fontFamily:'Roboto-Bold', fontWeight:400, marginBottom:10, color:"#FF9200", fontSize:17 }}>View All</Text>
                        </View>
                        {
                            restaurantListSearched.map((r_data, idx)=> {
                                return(
                                    <RestaurantCard key={idx} restaurant_data={r_data} navigation={navigation} />
                                )
                            })
                        }
                        {/* <RestaurantCard restaurant_data={restaurantList[0]} navigation={navigation} /> */}
                        {/* <RestaurantCard restaurant_data={restaurant_data} navigation={navigation} />
                        <RestaurantCard restaurant_data={restaurant_data} navigation={navigation} /> */}
                    </View>
                </View>
            </View>
            

            {/* <Text>Landing Page</Text> */}
        </ScrollView>
    );
}

export default LandingPage;