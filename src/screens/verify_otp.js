import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';
import {NGROK_URL} from "@env";

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    underlineStyleBase: {
        width: 50,
        height: 45,
        borderWidth: 0,
        borderWidth: 1,
        borderRadius:10,
        color:'#000000'
    },
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
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
    },
});

const VerifyOtp = ({navigation, route}) => {

    const [resendTimer, setResendTimer] = useState('0:30');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [correctOtp, setCorrectOtp] = useState('0:30');
    const [authState, setAuthState] = useContext(AuthContext);

    useEffect(() => {
        // console.log("params==========",route?.params);
        // if(route?.params?.otp) {
        //     setCorrectOtp(route?.params?.otp);
        // }

        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                setSeconds(59);
                setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
      }, [minutes, seconds]);

    const verifyOtpCode = async(code) => {
        // fetch('https://jellyfish-app-up8m8.ondigitalocean.app/login/verifyOtp', {
        // fetch(NGROK_URL+'/login/verifyOtp', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         mobile_no: route?.params?.mobileNo,
        //         otp: code
        //     }),
        // })
        // .then(response => response.json())
        // .then(async(json) => {
        //     console.log("otp_json=========",json);
        //     console.log("user_id=========",json[0]?.user_id);
        //     if(json?.length > 0) {
        //         await AsyncStorage.setItem('isLoggedIn','true');
        //         await AsyncStorage.setItem('loggedin_no',route?.params?.mobileNo);
        //         setAuthState({
        //             signedIn:true, id:json[0]?.user_id, mobile_no:json[0]?.user_mobile_no
        //         });
        //         navigation.navigate('DrawerHome', { screen: 'BottomTabNavigator' });
        //         // navigation.navigate('LandingPage');
        //     } else {
        //         Toast.show({
        //             type: 'error',
        //             text1: 'Invalid OTP',
        //         });
        //     }
        // })
        // .catch(error => {
        //     console.error("Verify error====================",error);
        // });

        // Static otp code
        if(code == 1234) {
            await AsyncStorage.setItem('isLoggedIn','true');
            await AsyncStorage.setItem('loggedin_no',route?.params?.mobileNo);
            setAuthState({
                signedIn:true
            });
            navigation.navigate('DrawerHome', { screen: 'BottomTabNavigator' });
        // if (code == correctOtp) {
        //     navigation.navigate('Location');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
            });
        }
    };

    const resendOTP = () => {
        // fetch('https://jellyfish-app-up8m8.ondigitalocean.app/login/generateOTP', {
        fetch(NGROK_URL+'/login/generateOTP', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile_no: route?.params?.mobileNo,
            }),
        })
        .then(response => response.json())
        .then(json => {
            console.log("otp_json=========",json);
            Toast.show({
                type: 'success',
                text1: 'OTP resent',
            });
            setSeconds(30);
            // setCorrectOtp(json);
            // navigation.navigate('VerifyOtp', {otp: json});
        })
        .catch(error => {
            console.error(error);
        });
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

                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter 4 digit verification code sent to your number</Text>
            </View>
            <OTPInputView
                style={{width: '80%', height: 200}}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => {
                    verifyOtpCode(code)
                })}
            />
            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                
                {seconds > 0 || minutes > 0 ? (
                    <Text>
                    Resend OTP in: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                    </Text>
                ) : (
                    <TouchableOpacity onPress={resendOTP}>
                        <Text style={{ color:'#117EFF' }}>Resend OTP</Text>
                    </TouchableOpacity>
                )}
                    {/* <Text style={{ color:'#117EFF' }}>Resend OTP in {resendTimer}</Text> */}
            </View>
        </SafeAreaView>
    );
}

export default VerifyOtp;