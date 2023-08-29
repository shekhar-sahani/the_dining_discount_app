import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
// import Onboarding from 'react-native-onboarding-swiper';
// import { OnboardFlow } from 'react-native-onboard';
import Swiper from 'react-native-swiper';
import { GestureHandlerRootView, FlatList } from 'react-native-gesture-handler';
import { isNewBackTitleImplementation } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const COLORS = {primary:'#FF9200', white:'#fff'};

const slides = [
    {
        id: 1,
        image: require('../assets/onboarding/img1.png'),
        title: 'Find a restaurant or Cafe?',
        subtitle: 'A table reservation system can increase table turnover by allowing customers to order ahead, guaranteeing a shorter but satisfactory stay at your restaurant.',
    },
    {
        id: 2,
        image: require('../assets/onboarding/img2.png'),
        title: 'Enjoy the best journey',
        subtitle: 'A table reservation system can increase table turnover by allowing customers to order ahead, guaranteeing a shorter but satisfactory stay at your restaurant.',
    },
    {
        id: 3,
        image: require('../assets/onboarding/img1.png'),
        title: 'Instant booking',
        subtitle: 'A table reservation is an arrangement made in advance to have a table available at a restaurant.',
    },
];

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    title: {
        color:'#000000',
        fontSize:22,
        textAlign:'center',
        fontFamily: 'Roboto-Medium',
    },
    subtitle: {
        color:'#606060',
        fontSize:18,
        marginTop:10,
        // maxWidth:'50%',
        // padding:20,
        textAlign:'center',
        lineHeight:23,
        fontFamily:'Roboto-Regular',
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: '#E5E4E2',
        marginHorizontal: 3,
        borderRadius: 50,
    },
    btn: {
        flex: 1,
        height: 40,
        borderRadius: 50,
        borderBlockColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
});

const Slide = ({item}) => {
    return (
        <View style={{alignItems: 'center', justifyContent:'center', flexWrap: 'wrap'}}>
            <Image source={item.image} style={{ height:'70%', width, resizeMode:'contain' }} />
            <Text style={styles.title}>{item.title}</Text>
            <View style={{width: width, flexGrow: 1, flex: 1, paddingHorizontal:10 }}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            {/* <Text style={styles.subtitle}>{item.subtitle}</Text> */}
        </View>
    );
};

const OnBoarding = ({navigation}) => {
    const imgUri = 'https://frigade.com/img/demo.png';
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef(null);

    useEffect(()=>{
        (async () => {
            AsyncStorage.getItem('isLoggedIn').then(async(result) => {
                // console.log("isLoggedIn==========",result);
                if(result == 'true') {
                    // navigation.navigate('LandingPage');
                    navigation.navigate('DrawerHome', { screen: 'BottomTabNavigator' });
                    // navigation.navigate('Login');
                } else {
                    await AsyncStorage.getItem('shouldDisplayWelcome').then((displayOnboarding) => {
                        // console.log("resultttt==========",displayOnboarding);
                        if(displayOnboarding == 'false') {
                            // navigation.navigate('LandingPage');
                            navigation.navigate('Login');
                        } else {
                            setIsLoading(false);
                        }
                    })
                }
            });
        })();
        // await AsyncStorage.getItem('shouldDisplayWelcome').then((result) => {
        //     console.log("resultttt==========",result);
        //     if(result == 'false') {
        //         // navigation.navigate('LandingPage');
        //         navigation.navigate('Login');
        //     } else {
        //         setIsLoading(false);
        //     }
        // })
    },[]);

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goNextSlide = async() => {
        const nextSlideIndex = currentSlideIndex + 1;
        console.log("nextSlideIndex======",nextSlideIndex);
        if(nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex);
        }

        if(nextSlideIndex == 3) {
            await AsyncStorage.setItem(
                'shouldDisplayWelcome',
                'false',
            );
            navigation.navigate('Login');
        }
    }

    const skip = async() => {
        // const lastSlideIndex = slides.length - 1;
        // const offset = lastSlideIndex * width;
        // ref?.current.scrollToOffset({offset});
        // setCurrentSlideIndex(lastSlideIndex);
        await AsyncStorage.setItem(
            'shouldDisplayWelcome',
            'false',
        );
        navigation.navigate('Login', {name: 'Jane'});
    }

    const Footer = () => {
        return (
            <View
                style={{ height: height * 0.20, justifyContent:'space-between', paddingHorizontal: 20}}
            >
                <View style={{ flexDirection:'row', justifyContent:'center', marginTop:20 }}>
                    {slides.map((_,index)=>(
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && {backgroundColor: COLORS.primary, width:35 } ]} />
                    ))}
                </View>

                <View style={{ marginBottom: 20, marginTop: 20, paddingHorizontal:40 }}>
                    <View style={{ flexDirection:'row', marginBottom: 10 }}>
                        <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                            <Text style={{ fontSize:20, fontFamily:'Roboto-Bold', color:'#ffffff' }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    {currentSlideIndex != 2 ? <View style={{ flexDirection:'row', marginTop:5 }}>
                        <TouchableOpacity style={{ justifyContent:"center", alignItems:"center", textAlign:"center", width:"100%" }} onPress={skip}>
                            <Text style={{ fontSize:18, fontFamily:'Roboto-Regular' }}>Skip introduction</Text>
                        </TouchableOpacity> 
                    </View> : null}
                </View>
            </View>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor:COLORS.white }}>
            <SafeAreaView>
                {isLoading ?
                    <View style={{ justifyContent:'center', alignItems:'center', height:height, width:width }}>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} size={100} />
                        <Text>Loading</Text>
                    </View> :
                    <View>
                        <FlatList
                            ref={ref}
                            onMomentumScrollEnd={updateCurrentSlideIndex}
                            pagingEnabled
                            data={slides}
                            contentContainerStyle={{height:height * 0.70 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <Slide item={item} />}
                        />
                        <Footer />
                    </View>
                }
            </SafeAreaView>
        </GestureHandlerRootView>
        // <View style={{flex: 1}}>
        //     {imgUri !== "" ? <OnboardFlow
        //         pages={[
        //             {
        //             title: 'Welcome to my app',
        //             subtitle: 'This is page 1',
        //             imageUri: '../assets/onboarding/img2.png'
        //             },
        //             {
        //             title: 'Page 2 header',
        //             subtitle: 'This is page 2',
        //             imageUri: 'https://frigade.com/img/demo.png'
        //             }
        //         ]}
        //         type={'fullscreen'}
        //     />:null}
        // </View>

        // <Onboarding
        //     bottomBarColor="#FF9200"
        //     pages={[
        //         {
        //             backgroundColor: '#fff',
        //             image: <Image source={require('../assets/onboarding/img1.png')} />,
        //             title: 'Find a restaurant or Cafe?',
        //             subtitle: <View><Text>A table reservation system can increase table turnover by allowing customers to order ahead, guaranteeing a shorter but satisfactory stay at your restaurant.</Text></View>,
        //         },
        //         {
        //             backgroundColor: '#fff',
        //             image: <Image source={require('../assets/onboarding/img2.png')} />,
        //             title: 'Enjoy the best journey',
        //             subtitle: 'A table reservation system can increase table turnover by allowing customers to order ahead, guaranteeing a shorter but satisfactory stay at your restaurant.',
        //         },
        //         {
        //             backgroundColor: '#fff',
        //             image: <Image source={require('../assets/onboarding/img1.png')} />,
        //             title: 'Instant booking',
        //             subtitle: 'A table reservation system can increase table turnover by allowing customers to order ahead, guaranteeing a shorter but satisfactory stay at your restaurant.'
        //         }
        //     ]}
        // />
    );
};

export default OnBoarding;
