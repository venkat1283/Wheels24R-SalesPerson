import { FlatList, Image, LogBox, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back } from '../Images'
import { useNavigation, useRoute } from '@react-navigation/native'

const MoreScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [requests, setRequests] = useState([{ "key": 0, 'id': '1234', 'dealer': 'Suresh', 'type': 'Sales', 'location': 'Hyderabad', 'phone': "+91 9776767676" }, { "key": 1, 'name': 'Trending Cars', 'contact': 'Madhav', 'exp': '5 Years', 'email': 'trendingcars@gmail.com', 'password': "*******" }, { "key": 2, 'id': '1236', 'dealer': 'Ramesh', 'type': 'Sales', 'location': 'Bangalore', 'phone': "+91 9787656568" }])
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    return (
        <SafeAreaView style={[GlobalStyles.container, { paddingTop: Platform.OS == 'android' ? 0 : 0 }]}>
            {/* <View style={styles.subContainer}> */}
            <StatusBar backgroundColor="#0178DC" />
            {/* header */}
            <View style={{ backgroundColor: COLORS.header }}>
                <View style={[GlobalStyles.header, {
                    paddingHorizontal: 16, shadowColor: "#000000"
                }]}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={[GlobalStyles.headerTitle, { marginRight: 25 }]}>More</Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default MoreScreen
// 
const styles = StyleSheet.create({
    logoImgStyle: {
        width: 30,
        height: 30,
    },
    addDealer: {
        color: COLORS.white,
        fontFamily: 'Roboto-Medium',
        fontSize: 15
    },

})