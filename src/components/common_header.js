import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
// import Location from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AppCommonHeader = (props) => {
    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');
    const [expanded, setExpanded] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    // const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    
    useEffect(()=>{
        console.log("commonHeader_propsssssssss-----------------",props);
    },[])

    const openMenu = () => {
        console.log("commonHeader_propsssssssss-----------------",props);
        props.openDrawer();
    }

    const goBack = () => {
        props.goBack();
    }

    return (
    <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content style={{ alignItems: 'center', justifyContent:"center" }} title={
            <Text style={{ fontSize:17, fontWeight:"500" }}>{props?.name}</Text>
        } />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={openMenu} /> */}
    </Appbar.Header>
    );
  };
export default AppCommonHeader;