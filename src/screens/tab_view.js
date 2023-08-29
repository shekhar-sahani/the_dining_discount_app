/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Image,
    Dimensions,
    useWindowDimensions 
} from 'react-native';
import { Text } from 'react-native-paper';
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import ImageCarousel from '../components/ImageCarousel';
import MenuList from '../components/MenuList';
import VideoList from '../components/VideoList';
import RatingView from '../components/RatingView';
import {NGROK_URL} from "@env";

const {height, width} = Dimensions.get('window');

const data = [
    {
      id: 0,
    //   uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
      uri: require('../assets/images/food_banner.png'),
      title: 'Dahlia',
    },
    {
        id: 1,
        uri: require('../assets/images/food_banner.png'),
        title: 'Dahlia',
    },
    {
        id: 2,
        uri: require('../assets/images/food_banner.png'),
        title: 'Dahlia',
    },
];

const menu_data = [
    {
      id: 0,
    //   uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
      uri: require('../assets/images/menu_img1.png'),
      title: 'Dahlia',
    },
    {
        id: 1,
        uri: require('../assets/images/menu_img1.png'),
        title: 'Dahlia',
    },
    {
        id: 2,
        uri: require('../assets/images/menu_img1.png'),
        title: 'Dahlia',
    },
];

const OfferRoute = (props) => {
    const [offersArray, setOffersArray] = React.useState([]);
   
    useEffect(() => {
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(data)
        }
    
        fetch(NGROK_URL + `/offers/getGetOfferById/${props.params?.restaurant_data?.id}`, options)
        .then(response => response.json())
        .then(result => {
            console.log('getAllOffers=================',result);
            setOffersArray(result);
        });
    },[props]);
    
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop:30 }} >
            <ImageCarousel data={offersArray} />
        </View>
    );
};
  
const MenuRoute = (props) => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        // console.log('menu_props=================',props.params?.restaurant_data?.id);
        // console.log('menu_data=================',menu_data);
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(data)
        }
        fetch(NGROK_URL + `/menu/getGetMenuById/${props.params?.restaurant_data?.id}`, options)
        .then(response => response.json())
        .then(result => {
            // console.log('getGetMenuById=================',result);
            setMenuData(result);
        });
    },[props]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <MenuList data={menuData} />
        </View>
    )
};

const VideoRoute = (props) => {
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        let options = {
            method: 'get',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
        }
        fetch(NGROK_URL + `/video/getGetVideoById/${props.params?.restaurant_data?.id}`, options)
        .then(response => response.json())
        .then(result => {
            console.log('getGetVideoById=================',result);
            setVideoData(result);
        });
    },[props]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <VideoList data={videoData} nav_props={props} />
        </View>
    )
    
};

const RatingRoute = (props) => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
        <RatingView data={props.params?.restaurant_data} nav_props={props} />
    </View>
);

const TabsView = ({route, navigation}) => {
    const layout = useWindowDimensions();

    const renderScene = SceneMap({
        offer: () => OfferRoute(route),
        menu: () => MenuRoute(route),
        video: () => VideoRoute(route),
        rating: () => RatingRoute(route),
    });

    const [index, setIndex] = React.useState(0);
    const [activeLabel, setActiveLabel] = React.useState('');

    const [routes] = React.useState([
        { key: 'offer', title: 'Offer' },
        { key: 'menu', title: 'Menu' },
        { key: 'video', title: 'Video' },
        { key: 'rating', title: 'Rating' },
    ]);

    useEffect(()=>{
        // console.log("propssssss===========",route?.params?.link_bit);
        // console.log("propsssssssssssssss===================",route?.params?.restaurant_data)

        // console.log("navigation===========",navigation);
        setActiveLabel(route?.params?.link_bit);
        if(route?.params?.link_bit == 'offer') {
            setIndex(0);
        } else if(route?.params?.link_bit == 'menu') {
            setIndex(1);
        } else if(route?.params?.link_bit == 'video') {
            setIndex(2);
        } else if(route?.params?.link_bit == 'rating') {
            setIndex(3);
        }
    },[route?.params?.link_bit]);

    const renderTabBar = (props, link_bit) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#ffffff' }}
            style={{ backgroundColor: '#ffffff', elevation:0}}
            tabBarStyle={{ elevation:0 }}
            renderLabel={({ route, focused, color }) => (
                <View style={{ display:"flex", justifyContent:"center", alignItems:"center", backgroundColor: link_bit == route.key ? '#FF9200' : '#ffffff', height:width*0.09, width:width*0.2, borderRadius:5 }}>
                    <Text style={{ color:link_bit == route.key ? '#ffffff': '#70767E', margin: 5 }}>
                        {route.title}
                    </Text>
                </View>
                
            )}
        />
    );

    const handleIndexChange = (idx) => {
        setIndex(idx);
        if(idx == 0) {
            setActiveLabel('offer');
        } else if(idx == 1) {
            setActiveLabel('menu');
        } else if(idx == 2) {
            setActiveLabel('video');
        } else if(idx == 3) {
            setActiveLabel('rating');
        }
    }

    return (
        <SafeAreaView style={{ flex:1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={(props)=>renderTabBar(props, activeLabel)}
                renderScene={renderScene}
                onIndexChange={handleIndexChange}
                initialLayout={{ width: layout.width }}
                sceneContainerStyle={{ backgroundColor:'red' }}
            />
        </SafeAreaView>
    )
};

export default TabsView;

const styles = StyleSheet.create({

});