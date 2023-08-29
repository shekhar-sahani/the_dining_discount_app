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
  import {Calendar, LocaleConfig} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Divider } from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const CalendarComponent = (props) => {
    const [selected, setSelected] = useState('');

    return (
        <View style={[styles.calendar_view, styles.shadowProp]}>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
                theme={{
                    todayTextColor: '#FF9200',
                    calendarBackground: '#ffffff',
                    selectedDayBackgroundColor: '#FF9200',
                    selectedDayTextColor: '#ffffff',
                    textSectionTitleColor: '#FF9200',
                    // dayTextColor: 'green',
                    // textDisabledColor: 'red'
                }}
                style={{
                    color: '#FF9200',
                }}
            />
        </View>
    );
};

export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom:30,
    },
    calendar_view: {
        padding:10,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        // shadowOpacity: 0.05,
        shadowRadius: 50,
        elevation: 3,
    },
});
