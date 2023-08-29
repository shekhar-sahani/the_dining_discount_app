import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Surface, Text } from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const SPACING = 5;
const ITEM_WIDTH = width * 0.6; // Item is a square. Therefore, its height and width are of the same length.
const ITEM_LENGTH = height * 0.3; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;


const RestaurantCard = (props) => {
    const [restaurantData, setRestaurantData] = useState({});

    useEffect(()=>{
        // console.log("propsssssss==========",props?.restaurant_data);
        // console.log("ImageData==========",props?.restaurant_data?.restaurant_images[0]);
        // console.log("restaurant_images==========",props?.restaurant_data?.opening_time);
        var d = new Date(props?.restaurant_data?.opening_time).toLocaleTimeString();
        // let hours = d.getUTCHours();
        // if(hours < 10) {
        //     hours = "0" + hours;
        // }
        // let mins = d.getUTCMinutes();
        // if(mins < 10) {
        //     mins = "0" + mins;
        // }

        // console.log(hours); // Hours
        // console.log(mins);
        console.log(d);
        setRestaurantData(props?.restaurant_data);
    },[props]);

    const handleRedirect = (data) => {
        props.navigation.navigate('Services', {restaurant_data:props?.restaurant_data});
    }

    const imageURL = props?.restaurant_data?.restaurant_images[0];

    return (
        <TouchableOpacity underlayColor={'transparent'} style={{ paddingHorizontal:2 }} onPress={() => handleRedirect(props)}>
            <View style={{ marginBottom:20 }}>
                    <View style={[styles.itemContent]}>
                            <Image
                                // source={item?.uri}
                                source={{uri: imageURL}}
                                style={styles.itemImage}
                            />
                            <View style={[styles.cardContentView, styles.shadowProp]}>
                                <View style={styles.restaurant_details_1}>
                                    <View>
                                        <View style={{ flexDirection:'row', marginBottom:8 }}>
                                            <Image source={require('../assets/images/veg_icon.png')} style={{ marginRight:10 }} />
                                            <Text style={styles.restaurant_details_title}>{restaurantData?.restaurant_name}</Text>
                                        </View>
                                        <View style={{ flexDirection:'row', marginBottom:8 }}>
                                            <Image source={require('../assets/images/discount_icon.png')} style={{ marginRight:10 }} />
                                            <Text>Upto 20% off</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems:'center', justifyContent:'center' }}>
                                        <Text style={{ color:'#ffffff', backgroundColor:'#F47F0B', paddingHorizontal:10, paddingVertical:5, borderRadius:8 }}>
                                            4.5 <Ionicons name="star" color="#ffffff" size={11}/>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.restaurant_details_2}>
                                    <View style={{ width:"60%" }}>
                                        <View style={{ flexDirection:'row', marginBottom:8 }}>
                                            <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                            <Text>{new Date(props?.restaurant_data?.opening_time).toLocaleTimeString()} to {new Date(props?.restaurant_data?.closing_time).toLocaleTimeString()}</Text>
                                        </View>
                                        <View style={{ flexDirection:'row', marginBottom:8 }}>
                                            <Image source={require('../assets/images/location_icon.png')} style={{ marginRight:10 }} />
                                            <Text style={{ width:'100%' }}>{restaurantData?.address_line_1} (4.0 km)</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems:'center', justifyContent:'center' }}>
                                        <TouchableOpacity style={styles.book_now_btn}>
                                            <Text style={{ color:'#ffffff' }}>Book Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </View>
            </View>
        </TouchableOpacity>
    );
};

export default RestaurantCard;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // height:height*0.23,
        // paddingHorizontal:5,
        marginBottom:30
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        // shadowRadius: BORDER_RADIUS,
        shadowRadius: 8,
        elevation: 5,
    },
    restaurant_image: {
        width:'100%',
        height:height*0.2,
        // resizeMode:'cover'
    },
    restaurant_details_view : {
        backgroundColor:'#fff',
        padding:10
    },
    restaurant_details_1: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    restaurant_details_2: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    restaurant_details_title: {
        color:'#111A28',
        fontFamily:'Roboto',
        fontWeight:'700',
    },
    book_now_btn: {
        backgroundColor:'#F47F0B',
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:15,
    },
    itemImage: {
        width: '100%',
        height: ITEM_LENGTH,
        borderRadius: 8,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        resizeMode: 'cover',
    },
    cardContentView: {
        backgroundColor:'#ffffff',
        width:'100%',
        padding:10,
        overflow:'hidden',
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        // position:'absolute',
        // top:50,
        // bottom:0,
        // flexWrap: 'wrap',
        // borderRadius:8
    },
});
