import React, {useState, useRef, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Pressable
  } from 'react-native';
import { Searchbar, Text, Divider, Menu, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectTableCount from '../components/SelectTableCount';
import CalendarComponent from '../components/CalendarComponent';
import {NGROK_URL} from "@env";
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import AppCommonHeader from '../components/common_header';
import Lightbox from 'react-native-lightbox-v2';

const {height, width} = Dimensions.get('window');

const Services = ({navigation, route}) => {
    const [tableData, setTableData] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [activeBit, setActiveBit] = React.useState(0);
    const [restaurantData, setRestaurantData] = useState({});
    const [allAmenities, setAllAmenities] = useState([]);
    const [restaurantAmenities, setRestaurantAmenities] = useState([]);

    useEffect( () => {
        // console.log("navigation=========",navigation);
        // console.log("route=========",route?.params?.restaurant_data);
        // console.log("restaurant_image==================",route?.params?.restaurant_data?.restaurant_images[0]);
        setRestaurantData(route?.params?.restaurant_data)
        let numbersArr = Array.from(Array(10).keys());
        setTableData(numbersArr);

        // Api to get restaurant specific amenities
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(data)
        }
        fetch(NGROK_URL + `/restaurantAmenity/getRestaurantAmenitiesById/${route?.params?.restaurant_data?.id}`, options)
        .then(response => response.json())
        .then(result => {
            // console.log('getRestaurantAmenitiesById=================',result);
            setRestaurantAmenities(result);
        });

    }, [route?.params?.restaurant_data]);

    useEffect( () => {
        // Api to get all amenities
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(data)
        }

        fetch(NGROK_URL + '/amenity/getAllAmenities', options)
        .then(response => response.json())
        .then(result => {
            // console.log('getAllAmenities=================',result);
            setAllAmenities(result);
        });
    }, []);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleActiveLink = (link_bit) => {
        console.log("link_bit========",link_bit);
        setActiveBit(link_bit);
        navigation.navigate('TabsView',{ link_bit:link_bit, restaurant_name:restaurantData?.restaurant_name, restaurant_data:restaurantData });
    }

    const imageURL = route?.params?.restaurant_data?.restaurant_images[0];

    const handleOpenLightBox = () => {
        console.log("Lightbox open========");
    }

    return (
        <ScrollView style={styles.container}>
            <AppCommonHeader {...navigation} name="Service" />
            <Divider style={{width:'99%', marginBottom:10}} />
            <View style={{ marginTop:10, alignItems:'center', backgroundColor:'#ffffff', height:'100%'}}>
                <View style={[styles.viewWidth, styles.image_container]}>
                    {/* <Image source={{uri:imageURL}} style={styles.restaurant_image} /> */}
                    {/* <Image source={require('../assets/images/restaurant_1.png')} style={styles.restaurant_image} /> */}
                    <Lightbox>
                        <Image source={{uri:imageURL}} style={styles.restaurant_image} />
                    </Lightbox>
                    <Pressable style={styles.all_photos_container} onPress={handleOpenLightBox}>
                        <Image source={require('../assets/images/all_photos.png')} />
                        <Text style={styles.all_photos_text}>All Photos</Text>
                    </Pressable>
                </View>

                <View style={{ display:'flex', flexDirection:'row', alignItems:'flex-start', width:width * 0.95, marginTop:10, justifyContent:'space-between' }}>
                    <View>
                        <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', paddingVertical:1 }}>
                            <Image source={require('../assets/images/veg_icon.png')} style={{ marginRight:10 }} />
                            <Text style={styles.restaurant_details_title}>{restaurantData?.restaurant_name}</Text>
                        </View>
                        <View style={{ flexDirection:'row', marginBottom:8 }}>
                            <Image source={require('../assets/images/discount_icon.png')} style={{ marginRight:10 }} />
                            <Text>Upto 20% off</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection:'row', marginBottom:8 }}>
                                <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                <Text>{new Date(restaurantData?.opening_time).toLocaleTimeString()} to {new Date(restaurantData?.closing_time).toLocaleTimeString()}</Text>
                            </View>
                            <View style={{ flexDirection:'row', marginBottom:8 }}>
                                <Image source={require('../assets/images/location_icon.png')} style={{ marginRight:10 }} />
                                <Text style={{ width:width*0.7 }}>{restaurantData?.address_line_1} (4.0 km)</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.details_right}>
                        <View style={{ alignItems:'center', justifyContent:'center' }}>
                            <Text style={{ color:'#ffffff', backgroundColor:'#F47F0B', paddingHorizontal:10, paddingVertical:5, borderRadius:8 }}>
                                4.5 <Ionicons name="star" color="#ffffff" size={11}/>
                            </Text>
                        </View>
                    </View>
                </View>
                
                <Divider style={styles.divider_css} />

                <View style={[styles.card, styles.shadowProp]}>
                    <TouchableOpacity onPress={()=>handleActiveLink('offer')}>
                        <Text 
                            style={activeBit == 0 ? styles.active_link : null  }
                        >
                            Offer
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleActiveLink('menu')}>
                        <Text 
                            style={activeBit == 1 ? styles.active_link : null  }
                        >
                            Menu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleActiveLink('video')}>
                        <Text 
                            style={activeBit == 2 ? styles.active_link : null  }
                        >
                            Video
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleActiveLink('rating')}>
                        <Text 
                            style={activeBit == 3 ? styles.active_link : null  }
                        >
                            Rating
                        </Text>
                    </TouchableOpacity>
                </View>

                <Divider style={styles.divider_css} />

                <View style={{ marginTop:5 }}>
                    <View style={{ }}>
                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Quick book a table</Text>
                    </View>

                    <View style={{ marginVertical:10, }}>
                        <Text style={{ fontWeight:'400', fontFamily:'Roboto', fontSize:12, color:'#6B717C' }}>A table for</Text>
                    </View>

                    <View style={{ }}>
                        <SelectTableCount tableData={tableData} />
                    </View>

                    <View style={{ marginVertical:20 }}>
                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:17, color:'#122B2E' }}>Select your date</Text>
                        <View style={{ marginVertical:20 }}>
                            <CalendarComponent />
                        </View>
                    </View>

                    <Divider style={styles.divider_css} />

                    <View style={{ marginVertical:10 }}>
                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Select your time slot</Text>
                        <View style={[styles.shadowProp, styles.select_menu, { marginVertical:20, justifyContent:'flex-start', alignItems:'flex-start' }]}>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                style={{color:'red'}}
                                theme={{ colors: { primary: 'red' } }}
                                anchor={
                                    <View style={{ flexDirection:'row', alignItems:'center', paddingHorizontal:10, color:'red' }}>
                                        <Image source={require('../assets/images/time_icon.png')} />
                                        <Button style={{ color:'red' }} onPress={openMenu}>9:00 am to 11:00 am</Button>
                                    </View>
                                }
                            >
                                <Menu.Item onPress={() => {}} title="12:30 pm to 03:00 pm" />
                                <Divider />
                                <Menu.Item onPress={() => {}} title="4:00 pm to 07:00 pm" />
                            </Menu>
                        </View>
                    </View>

                    <View style={{ marginVertical:10 }}>
                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Restaurant Time</Text>
                        <View style={{ marginVertical:10 }}>
                            <View>
                                <Text style={{ color:'#6B717C', fontSize:16, marginBottom:2, }}>Breakfast</Text>
                                
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{new Date(restaurantData?.breakfast_start_time).toLocaleTimeString()} to {new Date(restaurantData?.breakfast_end_time).toLocaleTimeString()}</Text>
                                </View>

                                {/* <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>4:00 pm to 07:00 pm</Text>
                                </View> */}
                            </View>

                            <View style={{ marginVertical:5 }}>
                                <Text style={{ color:'#6B717C', fontSize:16, marginBottom:2, }}>Lunch</Text>
                                
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{new Date(restaurantData?.lunch_start_time).toLocaleTimeString()} to {new Date(restaurantData?.lunch_end_time).toLocaleTimeString()}</Text>
                                </View>
                            </View>

                            <View style={{ marginVertical:5 }}>
                                <Text style={{ color:'#6B717C', fontSize:16, marginBottom:2, }}>Dinner</Text>
                                
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{new Date(restaurantData?.dinner_start_time).toLocaleTimeString()} to {new Date(restaurantData?.dinner_end_time).toLocaleTimeString()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginVertical:10 }}>
                        <View>
                            <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Amenities</Text>
                            <View>
                                {
                                    allAmenities.map((val, idx)=>{
                                        // console.log('val========',val);
                                        // console.log('restaurantAmenities========',restaurantAmenities[0]);

                                        const checkUsername = obj => obj.amenity_id == val.id;
                                        let doesExist = restaurantAmenities?.some(checkUsername);

                                        return (
                                            <View key={idx} style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                                    <Image source={{uri: val?.icon_url}} style={{ marginRight:10, width:20, height:20, objectFit:'contain' }} />
                                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{val?.amenity_name}</Text>
                                                </View>
                                                <View>
                                                    <Ionicons name="checkbox" color={doesExist ? "#FF9200" : "#B9BABC"} size={20}/>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                                {/* <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Family Section</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Wi-Fi</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Menu Card</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Smoking Area</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>DJ</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#B9BABC" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Garden Area</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>AC</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#B9BABC" size={20}/>
                                    </View>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                        <Image source={require('../assets/images/time_icon.png')} style={{ marginRight:10 }} />
                                        <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>Non AC</Text>
                                    </View>
                                    <View>
                                        <Ionicons name="checkbox" color="#FF9200" size={20}/>
                                    </View>
                                </View> */}
                            </View>
                        </View>
                    </View>

                    <Divider style={styles.divider_css} />
                    
                    <View style={{ marginVertical:10 }}>
                        <View>
                            <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Locate & Contact</Text>

                            <View style={{ marginVertical:10 }}>
                                <Image source={require('../assets/images/map_img.png')} style={styles.map_image} />
                            </View>

                            <View>
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/location_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C', width:width*0.85 }}>{restaurantData?.restaurant_google_address}</Text>
                                </View>
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/location_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{restaurantData?.restaurant_email}</Text>
                                </View>
                                <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:5 }}>
                                    <Image source={require('../assets/images/location_icon.png')} style={{ marginRight:10 }} />
                                    <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{restaurantData?.restaurant_contact}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <Divider style={styles.divider_css} />

                    <View style={{ marginVertical:10 }}>
                        <View style={{ marginVertical:10 }}>
                            <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>Social Media Links</Text>
                        </View>

                        <View style={{ flexDirection:'row', gap:10 }}>
                            <Image source={require('../assets/images/instagram_icon.png')} style={{ marginRight:10 }} />
                            <Image source={require('../assets/images/facebook_icon.png')} style={{ marginRight:10 }} />
                            <Image source={require('../assets/images/whatsapp_icon.png')} style={{ marginRight:10 }} />
                        </View>

                        <View style={{ flexDirection:'row', marginBottom:8, alignItems:'center', marginVertical:10 }}>
                            <Image source={require('../assets/images/email.png')} style={{ marginRight:10 }} />
                            <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:16, color:'#6B717C' }}>{restaurantData?.restaurant_email}</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical:30, alignItems:'center' }}>
                        <View style={{ marginVertical:10, alignItems:'center' }}>
                            <Text style={{ fontWeight:'600', fontFamily:'Roboto', fontSize:18, color:'#122B2E' }}>View Terms & Conditions</Text>
                        </View>

                        <View style={[styles.tnc_card, styles.shadowProp]}>
                                <Text>By continuing, you agree to The Discount Conditions of Use and Privacy Notice.</Text>
                        </View>
                    </View>

                    <View style={{ alignItems:'center', marginBottom:30 }}>
                        <TouchableOpacity style={[styles.proceed_btn]}>
                            <Text style={styles.proceed_btn_text}>Proceed</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

export default Services;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    restaurant_image: {
        // width: '100%',
        // height: '100%',
        height: height * 0.4,
        width: width * 0.99,
        borderRadius: 8,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        resizeMode: 'cover',
        // width:'100%',
        // borderRadius:10,
    },
    image_container: {
        alignItems:'center',
        justifyContent:'center',
        height: height * 0.4
    },
    viewWidth: {
        // flex:1,
        width:width * 0.99,
    },
    restaurant_details_title: {
        color:'#111A28',
        fontFamily:'Roboto',
        fontWeight:'700',
    },
    divider_css: {
        width:width * 0.95,
        marginVertical: 10
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        // shadowOpacity: 0.05,
        shadowRadius: 50,
        elevation: 3,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        gap:10,
        width:width * 0.95,
        paddingVertical:10,
        paddingHorizontal:10,
        marginBottom:20,
        marginTop:15,
    },
    select_menu: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        display:'flex',
    },
    tnc_card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        display:'flex',
        width: width * 0.5,
        marginTop:10,
        marginBottom:10,
        padding:12,
        color:'#6B717C',
    },
    proceed_btn: {
        backgroundColor:'#FF9200',
        borderRadius:24,
        padding:15,
        width: width * 0.3,
    },
    proceed_btn_text: {
        color:'#ffffff',
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:'Roboto-Bold',
        fontSize: 16,
    },
    active_link: {
        color:'#FF9200',
    },
    map_image: {
        width:'100%',
        borderRadius:10,
    },
    all_photos_text: {
        width:'100%',
        textAlign:'left',
        color:'#ffffff',
        fontWeight:'bold',
        paddingLeft:5,
        fontSize:16
    },
    all_photos_container: {
        width:'100%',
        position:'absolute',
        bottom:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
    }
});
