import { FlatList, Image, LogBox, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back } from '../Images'
import Request from '../Component/Request'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomView from '../Component/BottomView'

const OnboardDealerDetails = () => {
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
                        <Text></Text>
                        <Text></Text>
                    </View>
                </View>
            </View>

            <View style={styles.expView}>
                <Text style={styles.expMsg}>{route.params.details.exp_message}</Text>
            </View>
            <Request request={route.params.details} showId={false} action={() => { }} type='onboarddetail' />

            <Text style={styles.heading}>Business Details</Text>
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
                    {route.params.onboard &&
                        <View style={GlobalStyles.subView}>
                            <Text style={GlobalStyles.heads}>Registered on</Text>
                        </View>
                    }
                </View>
                <View style={[GlobalStyles.secondView]}>
                    <Text style={GlobalStyles.heads}>: {route.params.details.business_name}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.contact_person}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.experiance}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.email_id}</Text>
                    <Text style={GlobalStyles.heads}>: {route.params.details.password}</Text>
                    {route.params.onboard && <Text style={GlobalStyles.heads}>: {route.params.details.submit_date}</Text>}
                </View>
            </Pressable>
            <View>
                <Text style={styles.heading}>Plan Details</Text>
                <Pressable style={GlobalStyles.mainView} onPress={() => {

                }}>
                    <View style={GlobalStyles.firstView}>
                        <View style={GlobalStyles.subView}>
                            <Text style={GlobalStyles.heads}>Subscribed On</Text>
                        </View>
                        <View style={GlobalStyles.subView}>
                            <Text style={GlobalStyles.heads}>Plan Name</Text>
                        </View>
                        <View style={GlobalStyles.subView}>
                            <Text style={GlobalStyles.heads}>Expired On</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyles.secondView]}>
                        <Text style={GlobalStyles.heads}>: {route.params.details.date_of_join}</Text>
                        <Text style={GlobalStyles.heads}>: {route.params.details.plan_name}</Text>
                        <Text style={GlobalStyles.heads}>: {route.params.details.plan_to_date}</Text>
                    </View>
                </Pressable>
            </View>


        </SafeAreaView>
    )
}
export default OnboardDealerDetails
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
    heading: {
        marginHorizontal: 16,
        marginTop: 10,
        fontFamily: 'Roboto-Medium',
        fontSize: 15
    },
    expView: {
        marginHorizontal: 16,
        marginTop: 20,
        height: 40,
        backgroundColor: '#FFEDED',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    expMsg: {
        textAlignVertical: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: '#E00000'
    }

})