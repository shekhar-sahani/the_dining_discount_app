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

const AppHeader = (props) => {
    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');
    const [expanded, setExpanded] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    // const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const openMenu = () => {
        console.log("propsssssssss-----------------",props);
        props.openDrawer();
    }

    return (
    <Appbar.Header style={{ backgroundColor:"#ffffff" }}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        {/* <Appbar.Content title={
            <List.Section title="Accordions">
                <List.Accordion
                    title="Uncontrolled Accordion"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section>
        } /> */}
        {/* <View
            style={{
                // paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Show menu</Button>}
            >
                <Menu.Item onPress={() => {}} title="Item 1" />
                <Menu.Item onPress={() => {}} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
        </View> */}
        <View style={{ alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
            <Icon name="location-outline" size={25} color="red" />
            <Text style={{ fontSize:20 }}>
                 Pune
            </Text>
        </View>
        <Appbar.Content style={{ alignItems: 'center' }} title={
            <Image source={require('../assets/images/the_dining_discount_logo.png')} />
        } />

        <View style={{ alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
            <FontAwesomeIcon name="barcode" size={25} color="black" />
        </View>
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
    </Appbar.Header>
    );
  };
export default AppHeader;