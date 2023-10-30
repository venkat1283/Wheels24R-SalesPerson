import { FlatList, Image, LogBox, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back } from '../Images'
import Request from '../Component/Request'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomView from '../Component/BottomView'

const DealerDetails = () => {
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
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }} >
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Image source={Back} style={styles.logoImgStyle} />
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.headerTitle, { marginRight: 25 }]}>Request ID : {route.params.details.id} </Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <Request request={route.params.details} showId={false} action={() => { }} />
            <Pressable style={GlobalStyles.mainView} onPress={() => {

            }}>
                <View style={GlobalStyles.firstView}>
                    <View style={GlobalStyles.subView}>
                        <Text style={GlobalStyles.heads}>Business Name</Text>
                    </View>
                    <View style={GlobalStyles.subView}>
                        <Text style={GlobalStyles.heads}>Contact Person Name</Text>
                    </View>
                    <View style={GlobalStyles.subView}>
                        <Text style={GlobalStyles.heads}>Experience</Text>
                    </View>
                    <View style={styles.subView}>
                        <Text style={GlobalStyles.heads}>Email Id</Text>
                    </View>
                    <View style={GlobalStyles.subView}>
                        <Text style={GlobalStyles.heads}>Password</Text>
                    </View>
                </View>
                <View style={[GlobalStyles.secondView]}>
                    <Text style={GlobalStyles.heads}>: {route.params.details.business_name}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.contact_person}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.experiance}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.email}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.password}</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}
export default DealerDetails
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