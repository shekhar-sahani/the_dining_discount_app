import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NGROK_URL} from "@env";
import Config from "react-native-config";

const styles = StyleSheet.create({
    title: {
        color:'#000000',
        fontSize:22,
        fontWeight:'medium',
        textAlign:'center',
        marginBottom:15,
        fontFamily: 'Roboto-Medium',
    },
    subtitle: {
        color:'#000000',
        fontSize:16,
        fontWeight:'medium',
        textAlign:'center',
        marginBottom:25,
        fontFamily:'Roboto-Regular',
        paddingHorizontal:10
    },
    btn: {
        height: 50,
        borderRadius: 50,
        borderBlockColor: '#FF9200',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9200',
        width:'70%',
        marginTop:20,
        fontFamily:'Roboto',
    },
});

const Login = ({navigation, route}) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    useEffect( () => {
        console.log("ENV_VAR==============",NGROK_URL);
    }, []);

    const handleSendOtp = () => {
        const checkValid = phoneInput.current?.isValidNumber(value);
        console.log("checkValid===========",checkValid);
        if(formattedValue == "" || !checkValid) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Contact No.',
                // text2: 'This is some something 👋'
            });
        } else {
            // fetch('https://jellyfish-app-up8m8.ondigitalocean.app/login/generateOTP', {
            fetch(NGROK_URL+'/login/generateOTP', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile_no: formattedValue,
                }),
            })
            .then(response => response.json())
            .then(json => {
                console.log("otp_json=========",json);
                navigation.navigate('VerifyOtp', {mobileNo:formattedValue });
            })
            .catch(error => {
                console.error("loginerror=================",error);
            });

            // navigation.navigate('VerifyOtp', {otp: '123123'});
        }
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'#ffffff', alignItems:'center' }}>
            <Toast
                position='top'
                bottomOffset={20}
            />

            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width: '80%', marginBottom:30, marginTop:50 }}
                    source={require('../assets/onboarding/img2.png')}
                    resizeMode={'contain'}
                />

                <Text style={styles.title}>Enter your mobile Number</Text>
                <Text style={styles.subtitle}>Enter your mobile number we will send you the 4 digit verification code.</Text>
            </View>

            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}
                autoFocus
                containerStyle={{ backgroundColor:'#ffffff', borderWidth:2, borderRadius:10, borderColor:'#E5E4E2', padding:2 }}
                textContainerStyle={{ backgroundColor:'#ffffff' }}
            />

            <TouchableOpacity style={[styles.btn]} onPress={handleSendOtp} >
                <Text style={{ fontSize:20, fontWeight:'bold', color:'#ffffff' }}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Login;