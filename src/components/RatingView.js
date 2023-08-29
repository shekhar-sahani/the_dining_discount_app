import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
  
const {width, height} = Dimensions.get('window');

const SPACING = 5;
const ITEM_WIDTH = width * 0.9; // Item is a square. Therefore, its height and width are of the same length.
const ITEM_LENGTH = width * 0.3; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;
  
const RatingView = ({ data, nav_props }) => {
    const [reviewText, setReview] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');

    useEffect(()=>{
        // console.log("RatingView_data========",data);
        // console.log("RatingView_data========",data);
        setRestaurantName(data.restaurant_name);
        setRestaurantAddress(data.restaurant_google_address);
    },[data]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image  source={{uri:data.restaurant_images[0]  }} style={styles.itemImage} />
                <View style={[styles.ratingProfilePicContainer, styles.shadowProp]}>
                    <Image source={require('../assets/images/food_banner.png')} style={styles.rating_profile_pic} />
                </View>
            </View>

            <View style={styles.ratingDescriptionContainer}>
                <Text style={styles.titleFont}>{restaurantName}</Text>
            </View>

            <View style={{ justifyContent:'center', alignItems:'center', marginTop:10  }}>
                <Text style={[styles.greySmallText,{width:width*0.7, textAlign:'center' }]}>
                    {restaurantAddress}
                </Text>
            </View>

            {/* <View style={{ justifyContent:'center', alignItems:'center', marginTop:10 }}>
                <Text style={styles.greenSmallText}>
                    Order Delivered
                </Text>
            </View> */}

            <View style={{ justifyContent:'center', alignItems:'center', marginTop:10, marginBottom:10 }}>
                <Text style={styles.mediumBlackText}>
                    Please Rate Table Booking Service
                </Text>
            </View>

            <View style={{ justifyContent:'center', alignItems:'center', marginTop:10, marginBottom:10, paddingBottom:10 }}>
                {/* <Text style={styles.ratingLabel}>
                    Good
                </Text> */}

                <TextInput
                    // label="Email"
                    value={reviewText}
                    onChangeText={text => setReview(text)}
                    multiline
                    style={styles.ratingTextArea}
                    placeholder="Write review"
                    outlineColor={'#ffffff'}
                    underlineColor={'#ffffff'}
                    activeUnderlineColor={'#ffffff'}
                    cursorColor="#00000033"
                    placeholderTextColor="#00000033" 
                />

                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  };
  
  export default RatingView;
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
        // height:height,
        paddingHorizontal:5,
        marginTop:30
    },
    itemImage: {
        width: width * 0.9,
        height: width * 0.5,
        borderRadius: 8,
        resizeMode: 'contain',
        objectFit:'fill'
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
    imageContainer: {
        justifyContent:'center',
        alignItems:'center'
    },
    rating_profile_pic: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius:50,
        borderWidth:3,
        borderColor:'orange'
    }, 
    ratingProfilePicContainer: {
        backgroundColor:'#ffffff',
        borderRadius:50,
        overflow:'hidden',
        marginTop:-50,
        padding:5,
    },
    ratingDescriptionContainer: {
        justifyContent:'center',
        alignItems:'center'
    },
    titleFont: {
        fontSize:22,
        fontWeight:500,
        fontFamily:'Roboto',
        marginTop: 20
    },
    greySmallText: {
        color:'#9796A1',
        fontSize:13,
        fontWeight:400,
        fontFamily:'Roboto',
    },
    greenSmallText: {
        color:'#1E9D13',
        fontSize:14,
        fontWeight:400,
        fontFamily:'Roboto',
    },
    mediumBlackText: {
        color:'#000000',
        fontSize:16,
        fontWeight:400,
        fontFamily:'Roboto',
    },
    ratingLabel: {
        color:'#FF9200',
        fontSize:22,
        fontWeight:400,
        fontFamily:'Roboto',
    },
    ratingTextArea: {
        width: width * 0.9,
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderColor:'#EEEEEE',
    },
    submitBtn: {
        backgroundColor:'#FF9200',
        borderRadius:24,
        padding:10,
        width: width * 0.3,
        marginVertical: 30
    },
    submitBtnText: {
        color:'#ffffff',
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:'Roboto-Bold',
        fontSize: 16,
    },
  });