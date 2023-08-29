import React, {useState, useRef, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { Text } from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const Profile = ({navigation, route}) => {
    useEffect( () => {
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems:'center', marginTop:20 }}>
                <Text>Profile</Text>
            </View>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff',
    },
});

