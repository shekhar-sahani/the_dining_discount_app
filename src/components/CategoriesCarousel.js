import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  
  const {width, height} = Dimensions.get('window');
  
  const SPACING = 5;
  const ITEM_WIDTH = width * 0.22; // Item is a square. Therefore, its height and width are of the same length.
  const ITEM_LENGTH = width * 0.3; // Item is a square. Therefore, its height and width are of the same length.
  const BORDER_RADIUS = 20;
  
  const CategoriesCarousel = ({ data }) => {
    
    useEffect(()=> {
        // console.log("data=======", data);
    },[data])

    return (
      <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                return (
                    <View style={{width: ITEM_WIDTH}}>
                        <View style={[styles.itemContent, styles.shadowProp, {backgroundColor:item.id == 0 ? '#FF9200' : '#ffffff'}]}>
                            <Image
                                // source={item?.uri}
                                source={{uri: item.category_image}}
                                style={styles.itemImage}
                            />
                            <Text style={{ fontSize:12, fontWeight:400, color:item.id == 0 ? '#fff' : '#5A5A5A', fontFamily:'Roboto', marginTop:10, textAlign:'center' }}>
                                {item.category_name}
                            </Text>
                            {/* <View style={styles.cardContentView}> */}
                                
                                {/* <Text style={{ fontSize:16, color:'#FF9200', fontWeight:700, fontFamily:'Roboto-Bold' }}>
                                    Up to 20% OFF*
                                </Text>
                                <Text style={{ fontSize:8, color:'#5A5A5A' }}>
                                    Get maximum discount on all restaurants
                                </Text> */}
                            {/* </View> */}
                        </View>
                    </View>
                );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
        />
      </View>
    );
  };
  
  export default CategoriesCarousel;
  
  const styles = StyleSheet.create({
    container: {
        // flex:1,
        height:height*0.18,
        // paddingHorizontal:5
    },
    itemContent: {
        // marginHorizontal: SPACING * 3,
        marginRight: SPACING * 3,
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
        height:height*0.15,
        flexDirection:'column',
        alignItems:'center',
        paddingTop:5,
        // padding:10,
        marginLeft:5
        // width:width*0.65
    },
    itemText: {
        fontSize: 24,
        // position: 'absolute',
        bottom: SPACING * 2,
        right: SPACING * 2,
        color: 'white',
        fontWeight: '600',
    },
    itemImage: {
        width: width*0.15,
        height: width*0.15,
        borderRadius: 50,
        resizeMode: 'cover',
        // objectFit:'contain',
    },
    cardContentView: {
        backgroundColor:'#ffffff',
        width:'100%',
        padding:10,
        overflow:'hidden',
        // position:'absolute',
        // top:50,
        bottom:0,
        flexWrap: 'wrap',
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
  });