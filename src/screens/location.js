import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    
});

const Location = ({navigation, route}) => {
    useEffect( () => {
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
                        console.log("position===========");
                        console.log(location);
                        console.log("position===========");
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

    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'#fff', alignItems:'center', padding:0, margin:0 }}>
            <Image source={require('../assets/images/landingPage.png')} resizeMode={'contain'} style={{ width:width-25, height:height }}  />
        </SafeAreaView>
    );
}

export default Location;