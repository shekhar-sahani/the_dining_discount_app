import React, {useState, useEffect, createContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingPage from "../screens/landing_page";
import Services from "../screens/services";
import Favourites from "../screens/favourites";
import Profile from "../screens/profile";
import {
    Image,
    Dimensions,
    View
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeIcon from "../assets/images/home_2.svg";
import ProfileIcon from "../assets/images/profile_icon.svg";
import FavoritesIcon from "../assets/images/heart.svg";
import ServicesIcon from "../assets/images/services.svg";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{}} tabBarOptions ={{activeTintColor: '#FF9200'}}>
            <Tab.Screen name="Home" options={{
                headerShown: false,
                tabBarLabel: 'Home',
                activeTabColor: '#FF9200',
                tabBarIcon: ({size, color}) => (
                    // <MaterialCommunityIcons name="home" color={color} size={size} />
                    <View style={{ }}>
                        <HomeIcon width="40%" stroke={color} width={100} />
                    </View>
                ),
                
            }} component={LandingPage} />
            <Tab.Screen name="Services" options={{
                headerShown: false,
                tabBarLabel: 'Services',
                tabBarIcon: ({size, color}) => (
                    <View style={{ }}>
                        <ServicesIcon width="40%" stroke={color} width={100} />
                    </View>
                    // <MaterialCommunityIcons name="room-service" color={color} size={size} />
                ),
                tabBarOptions: {
                    activeTintColor: '#FF9200',
                },
            }}  component={Services} />
            <Tab.Screen name="Favourites" options={{
                headerShown: false,
                tabBarLabel: 'Favourites',
                tabBarIcon: ({size, color}) => (
                    // <MaterialCommunityIcons name="heart" color={color} size={size} />
                    <View style={{ }}>
                        <FavoritesIcon width="40%" stroke={color} width={100} />
                    </View>
                ),
            }} component={Favourites} />
            <Tab.Screen name="Profile" options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({size, color}) => (
                    <View style={{ }}>
                        <ProfileIcon width="40%" stroke={color} width={100} />
                    </View>
                    // <MaterialCommunityIcons name="face-man-profile" color={color} size={size} />
                ),
            }} component={Profile} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
