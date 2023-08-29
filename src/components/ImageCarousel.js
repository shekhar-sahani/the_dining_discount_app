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
  const ITEM_WIDTH = width * 0.6; // Item is a square. Therefore, its height and width are of the same length.
  const ITEM_LENGTH = height * 0.2; // Item is a square. Therefore, its height and width are of the same length.
  const BORDER_RADIUS = 20;
  
  const ImageCarousel = ({ data }) => {
    return (
      <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                return (
                    <View style={{width: ITEM_WIDTH}}>
                        <View style={[styles.itemContent, styles.shadowProp]}>
                            <Image
                                // source={item?.offer_image}
                                source={{uri: item?.offer_image}}
                                // source={{uri: item.uri}}
                                style={styles.itemImage}
                            />
                            <View style={styles.cardContentView}>
                                <Text style={{ fontSize:12, fontWeight:700, color:'#5A5A5A', fontFamily:'Roboto-Bold', }}>
                                    {item?.offer_title}
                                </Text>
                                <Text style={{ fontSize:16, color:'#FF9200', fontWeight:700, fontFamily:'Roboto-Bold' }}>
                                    {item?.offer_description}
                                </Text>
                                {/* <Text style={{ fontSize:8, color:'#5A5A5A' }}>
                                    Get maximum discount on all restaurants
                                </Text> */}
                                {/* <Text style={styles.itemText} numberOfLines={1}>
                                    {item.title}aaaa
                                </Text>  */}
                            </View>
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
  
  export default ImageCarousel;
  
  const styles = StyleSheet.create({
    container: {
        // flex:1,
        height:height*0.23,
        paddingHorizontal:5
    },
    itemContent: {
        // marginHorizontal: SPACING * 3,
        marginRight: SPACING * 3,
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        height:height*0.2,
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
        width: '100%',
        height: ITEM_LENGTH,
        borderRadius: 8,
        // resizeMode: 'cover',
        objectFit:'cover'
    },
    cardContentView: {
        backgroundColor:'#ffffff',
        width:'100%',
        padding:10,
        overflow:'hidden',
        position:'absolute',
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