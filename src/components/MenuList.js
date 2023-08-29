import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { Text } from 'react-native-paper';
  
const {width, height} = Dimensions.get('window');

const SPACING = 5;
const ITEM_WIDTH = width * 0.9; // Item is a square. Therefore, its height and width are of the same length.
const ITEM_LENGTH = width * 0.3; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;
  
  const MenuList = ({ data }) => {
    //   console.log("Menulist==========",data);
    return (
      <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                console.log("menu_image===========",item?.menu_image)
                return (
                    <View style={{justifyContent:'center'}}>
                        <View style={[styles.itemContent]}>
                            <Image
                                // source={item?.menu_image}
                                source={{uri: item?.menu_image}}
                                style={styles.itemImage}
                            />
                        </View>
                    </View>
                );
            }}
            vertical
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
        />
      </View>
    );
  };
  
  export default MenuList;
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
        // height:height,
        paddingHorizontal:5,
        marginTop:30
    },
    itemContent: {
        height:height*0.8,
        // marginHorizontal: SPACING * 3,
        marginBottom: SPACING * 3,
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        // justifyContent:'center',
        // alignItems:'center'
        // overflow: 'hidden',
        // height:height*0.2,
        // width:width*0.65
    },
    itemImage: {
        width: '100%',
        height: height*0.8,
        borderRadius: 8,
        resizeMode: 'cover',
        objectFit:'fill',
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