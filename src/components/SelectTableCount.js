import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.2 ;

const SelectTableCount = (props) => {
    return (
        <View style={styles.viewWidth}>
            <FlatList
                data={props.tableData}
                renderItem={({item, index}) => {
                    return (
                        <View style={{width: ITEM_WIDTH}}>
                            <View style={styles.number_container} >
                                <Text style={styles.table_no_text}>{item+1}</Text>
                            </View>
                        </View>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
            />
        </View>
    );
};

export default SelectTableCount;

const styles = StyleSheet.create({
    viewWidth: {
        // flex:1,
        width:width * 0.9,
    },
    table_no_text: {
        textAlign: 'center',
    },
    number_container: {
        width: width * 0.1,
        height: width * 0.1,
        borderWidth:2,
        borderColor:'#FF9200',
        borderRadius:50,
        justifyContent:'center',
    },
});
