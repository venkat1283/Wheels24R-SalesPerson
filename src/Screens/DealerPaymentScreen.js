import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, LogBox, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back, DropDown, LoginWheel, QRCode, Radio, RadioSelect } from '../Images'
import Request from '../Component/Request'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomView from '../Component/BottomView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { URLS } from '../Utilities/urls'
import axios from 'axios'
import { AppContext } from '../../AppProvider'
import { getPlainMessage } from '../Utilities/Comms'

const DealerPaymentScreen = () => {
    const { updateLoading, token } = useContext(AppContext)
    const route = useRoute()
    const navigation = useNavigation()
    const [options, setOptions] = useState([])
    const [optionIndex, setOptionInndex] = useState(0)

    const getSubscriptionDetails = async () => {
        var config = {
            headers: {
                "Content-Type": "text/plain",
                Accept: "*/*",
                'Client-Service': 'Wheels24r',
                'Auth-Key': 'Wheels24r@123',
                'Authorization': token,
            },
        };
        updateLoading(true)
        // alert(URLS.BASE_URI + URLS.RECENTADDCARS + token)
        try {
            const response = await axios.get(URLS.BASE_URI + URLS.SUBSCRIBE_DETAILS,
                config
            );
            let responseData = response['data'];
            console.log("Request details:", responseData['subscription_details'])
            if (response.status === 200) {
                setOptions(responseData['subscription_details'])
            }
            updateLoading(false)
        } catch (error) {
            console.log("Error is", error)
            updateLoading(false)
            // Alert.alert("Failure", getPlainMessage(error.response.data.message), [
            //   { text: "OK", onPress: () => { } }
            // ])
        }
    }

    const submitDetails = async () => {
        var config = {
            headers: {
                "Content-Type": "text/plain",
                Accept: "*/*",
                'Client-Service': 'Wheels24r',
                'Auth-Key': 'Wheels24r@123',
                'Authorization': token,
            },
        };
        updateLoading(true)
        console.log(route.params.dealerDetails['id'] + ' ' + route.params.dealerDetails["dealer"] + ' ' + route.params.dealerDetails["businessName"] + ' ' + route.params.dealerDetails["phone"]
            + ' ' + route.params.dealerDetails["location"] + ' ' + route.params.dealerDetails["contact"] + ' ' + route.params.dealerDetails["type"] + ' ' + route.params.dealerDetails["experience"] + ' ' + route.params.dealerDetails["emailid"]
            + ' ' + route.params.dealerDetails["password"] + ' ' + route.params.dealerDetails["confirmpassword"] + ' ' + optionIndex)

        try {
            const response = await axios.post(URLS.BASE_URI + URLS.ADD_DEALER,
                {
                    "dealer_request_id": route.params.dealerDetails["id"],
                    "dealer_name": route.params.dealerDetails["dealer"],
                    "business_name": route.params.dealerDetails["businessName"],
                    "mobile_number": route.params.dealerDetails["phone"],
                    "address": route.params.dealerDetails["location"],
                    "contact_person": route.params.dealerDetails["contact"],
                    "dealer_type": route.params.dealerDetails["type"],
                    "experiance": route.params.dealerDetails["experience"],
                    "email_id": route.params.dealerDetails["emailid"],
                    "password": route.params.dealerDetails["password"],
                    "confirm_password": route.params.dealerDetails["confirmpassword"],
                    "subscription_plan": optionIndex
                },
                config
            );

            let responseData = response['data'];
            console.log("Request details:", responseData['details'])
            if (response.status === 200) {
                Alert.alert("Success", getPlainMessage(response.data.message), [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('Home')
                        }
                    }
                ])
            }
            updateLoading(false)
        } catch (error) {
            console.log("Error is", error)
            updateLoading(false)
            Alert.alert("Failure", getPlainMessage(error.response.data.message), [
                {
                    text: "OK", onPress: () => {
                        // navigation.navigate('Home')
                    }
                }
            ])
        }
    }
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        getSubscriptionDetails()
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
                        <Text style={[GlobalStyles.headerTitle, { marginRight: 25 }]}>Add Dealer</Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView style={{ marginBottom: 100 }}>
                <Text style={styles.heading}>Subscription Plans</Text>
                <FlatList
                    data={options}
                    style={{ marginTop: 15, flex: 1 }}
                    renderItem={({ item }) => {
                        return (
                            <Pressable style={styles.optionView} onPress={() => {
                                setOptionInndex(item.id)
                            }}>
                                <Image source={optionIndex == item.id ? RadioSelect : Radio} style={styles.radioImgStyle} />
                                <View style={styles.optionSubview}>
                                    <Text style={styles.category}>{item.plan_name}</Text>
                                    <Text style={styles.amount}> {item.plan_amount}/</Text>
                                    <Text style={styles.days}>{item.plan_total_days}</Text>
                                </View>
                                <Image source={DropDown} style={styles.downImgStyle} />
                            </Pressable>
                        )
                    }}
                />
                {optionIndex >= 1 && <View style={styles.qrcodeMain}>
                    <Text style={styles.scan}>Scan QR code to pay</Text>
                    <View style={styles.qrcodeSub}>
                        <Image source={{ uri: options[optionIndex - 1].plan_scanner }} style={styles.qrcode} />
                    </View>

                </View>}
            </KeyboardAwareScrollView>
            {/* <BottomView sndBtnTitle="SUBMIT" buttonCount={1} sndAction={() => {
                navigation.navigate('requestDlrDetails', { dealerDetails: route.params.dealerDetails })
            }} /> */}
            <BottomView sndBtnTitle="SUBMIT" buttonCount={1} sndAction={submitDetails} />
        </SafeAreaView>
    )
}
export default DealerPaymentScreen
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
        marginTop: 20,
        color: '#414141',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        marginHorizontal: 16
    },
    optionView: {
        flexDirection: 'row',
        marginHorizontal: 16,
        height: 50,
        backgroundColor: COLORS.white,
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 4
    },
    optionSubview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    radioImgStyle: {
        width: 20,
        height: 17
    },
    downImgStyle: {
        width: 24,
        height: 24,
    },
    qrcodeMain: {
        flex: 1.5,
        marginHorizontal: 20
    },
    scan: {
        color: '#414141',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
    },
    qrcode: {
        width: 180,
        height: 180
    },
    qrcodeSub: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    category: {
        color: '#rgba(39, 38, 35, 0.80)',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    amount: {
        color: '#rgba(39, 38, 35, 0.80)',
        fontFamily: 'Roboto-Bold',
        fontSize: 17,
    },
    days: {
        color: '#rgba(39, 38, 35, 0.60)',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
    },
})