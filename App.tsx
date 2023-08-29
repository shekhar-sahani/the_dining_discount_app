/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, createContext} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from "./src/screens/on_boarding";
import Login from "./src/screens/login";
import Services from "./src/screens/services";
import TabsView from "./src/screens/tab_view";
import VerifyOtp from "./src/screens/verify_otp";
import Location from "./src/screens/location";
import LandingPage from "./src/screens/landing_page";
import SplashScreen from 'react-native-splash-screen';
import AppHeader from './src/components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export const AuthContext = createContext({ authState: {id:'', mobile_no:'', signedIn:false}, setAuthState: () => {} });

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const App = (data) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [authState,setAuthState] = useState(
    {
        id:'',
        mobile_no:'',
        signedIn:false
    }
  );

  useEffect( () => {
    setTimeout(()=>{
      SplashScreen.hide();
    },2000)
    // async function prepare(){
    //   try{
    //       // our api calls will be here.
    //       new Promise(resolve => setTimeout(resolve,15000)); // wait for 5 secs
    //   }catch(e){
    //       console.warn(e);
    //   }finally{
    //       SplashScreen.hide();
    //   }
    // }
    // prepare();
  });

  useEffect(()=>{
    console.log("app_props=========",data);
  },[])

  useEffect(()=>{
    console.log("authState=========",authState?.signedIn);
    (async () => {
      AsyncStorage.getItem('isLoggedIn').then(async(result) => {
          console.log('isLoggedIn==========',result);
          if (result == 'true') {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
      });
    })();
  },[authState]);

  const handleLogout = async(props) => {
    console.log("LogoutProps===============",props);
    // alert('Logging out');
    await AsyncStorage.clear();
    props.navigation.navigate("Login");
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={()=>handleLogout(props)} />
      </DrawerContentScrollView>
    );
  }

  const DrawerHome = () => (
    <Drawer.Navigator initialRouteName="BottomTabNavigator" drawerContent={props => <CustomDrawerContent {...props} />}>
    {/* <Drawer.Navigator initialRouteName="BottomTabNavigator" screenOptions={{header: (props) => <AppHeader {...props}  />}}> */}
      <Drawer.Screen name="Home" options={{headerShown: false}} component={BottomTabNavigator} />
      {/* <Drawer.Screen name="LandingPage" options={{headerShown: true}} component={LandingPage} /> */}
      {/* <Drawer.Screen name="Location" options={{headerShown: true}} component={Location} /> */}
    </Drawer.Navigator>
  );

  // const StackHome = () => (
  //   <Stack.Navigator initialRouteName="Login">
  //     <Stack.Screen name="DrawerHome" component={DrawerHome} options={{ headerShown: false }} />
  //     <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
  //     <Stack.Screen name="VerifyOtp" options={{headerShown: false}} component={VerifyOtp} />
  //     <Stack.Screen name="Location" options={{headerShown: false}} component={Location} />
  //     {/* <Stack.Screen name="LandingPage" options={{headerShown: false}} component={LandingPage} /> */}
  //   </Stack.Navigator>
  // );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={[authState,setAuthState]}>
      {/* {authState?.signedIn || isLoggedIn ? <AppHeader /> : null} */}

      <Stack.Navigator initialRouteName={"OnBoarding"}>
        <Stack.Screen
          name="DrawerHome"
          component={DrawerHome}
          options={{headerShown: false}}
          // options={{title: 'Welcome'}}
        />
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="VerifyOtp" options={{headerShown: false}} component={VerifyOtp} />
        <Stack.Screen name="Location" options={{headerShown: false}} component={Location} />
        <Stack.Screen name="TabsView" options={({ route }) => ({ title: route?.params?.restaurant_name })} component={TabsView} />
        <Stack.Screen name="Services"  component={Services} />
        {/* <Stack.Screen name="LandingPage" options={{headerShown: false}} component={LandingPage} /> */}
      </Stack.Navigator>

      {/* <StackHome /> */}
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={OnBoarding}
          options={{headerShown: false}}
          // options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="VerifyOtp" options={{headerShown: false}} component={VerifyOtp} />
        <Stack.Screen name="Location" options={{headerShown: false}} component={Location} />
        <Stack.Screen name="LandingPage" options={{headerShown: false}} component={LandingPage} />
      </Stack.Navigator> */}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;
