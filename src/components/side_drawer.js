import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Button, Text, Drawer } from 'react-native-paper';
// import Location from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const SideDrawer = ({props}) => {
    const [active, setActive] = useState('');

    return (
        <Drawer.Section title="Some title">
          <Drawer.Item
            label="First Item"
            active={active === 'first'}
            onPress={() => setActive('first')}
          />
          <Drawer.Item
            label="Second Item"
            active={active === 'second'}
            onPress={() => setActive('second')}
          />
        </Drawer.Section>
      );
};

export default SideDrawer;
