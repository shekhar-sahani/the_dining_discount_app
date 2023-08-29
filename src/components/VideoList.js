import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const {width, height} = Dimensions.get('window');

const SPACING = 5;
const ITEM_WIDTH = width * 0.9; // Item is a square. Therefore, its height and width are of the same length.
const ITEM_LENGTH = width * 0.3; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;
  
const VideoList = ({ data, nav_props }) => {
    const ref = useRef(null);

    useEffect(()=> {
        console.log("data===========",data[0]);
        // console.log("nav_props===========",nav_props)
    },[data])
    
    return (
      <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                return (
                    <View style={{justifyContent:'center'}}>
                        <View style={[styles.itemContent]}>
                            <VideoPlayer
                                source={{uri: item?.video_url}}
                                navigator={data.navigator}
                                paused
                                disableVolume
                                disableBack
                                style={{ borderRadius:10 }}
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
  
  export default VideoList;
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
        // height:height,
        paddingHorizontal:5,
        marginTop:30
    },
    itemContent: {
        // marginHorizontal: SPACING * 3,
        marginBottom: SPACING * 3,
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center',
        // overflow: 'hidden',
        // height:height*0.2,
        // width:width*0.65,
    },
    itemImage: {
        // width: '100%',
        // height: ITEM_LENGTH,
        borderRadius: 8,
        resizeMode: 'cover',
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
  });