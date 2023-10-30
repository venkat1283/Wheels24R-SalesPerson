import { Alert, FlatList, Image, LogBox, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back, LoginWheel } from '../Images'
import Request from '../Component/Request'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomView from '../Component/BottomView'
import { URLS } from '../Utilities/urls'
import axios from 'axios'
import { getPlainMessage } from '../Utilities/Comms'
import { AppContext } from '../../AppProvider'

const DetailsScreen = () => {
    const { updateLoading, token } = useContext(AppContext)
    const route = useRoute()
    const navigation = useNavigation()
    const [details, setDetails] = useState({})

    const getRequestDetails = async () => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.REQUEST_DETAILS,
                {
                    "dealer_request_id": route.params.dealerDetails.id,
                },
                config
            );
            let responseData = response['data'];
            console.log("Request details:", responseData['details'])
            if (response.status === 200) {
                setDetails(responseData['details'])
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

    const rejectRequest = async () => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.REJECT,
                {
                    "dealer_request_id": route.params.dealerDetails.id,
                },
                config
            );
            let responseData = response['data'];
            console.log("Reject Request:", responseData)
            if (response.status === 200) {
                Alert.alert("Success", getPlainMessage(responseData.message), [
                    {
                        text: "OK", onPress: () => {
                            navigation.goBack()
                        }
                    }
                ])
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

    const holdRequest = async () => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.HOLD,
                {
                    "dealer_request_id": route.params.dealerDetails.id,
                },
                config
            );
            let responseData = response['data'];
            console.log("Hold Request:", responseData)
            if (response.status === 200) {
                Alert.alert("Success", getPlainMessage(responseData.message), [
                    {
                        text: "OK", onPress: () => {
                            navigation.goBack()
                        }
                    }
                ])
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

    const addRequest = async () => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.ADD_DEALER,
                {
                    "dealer_request_id": route.params.dealerDetails.id,
                },
                config
            );
            let responseData = response['data'];
            console.log("Add Request :", responseData)
            if (response.status === 200) {
                setDetails(responseData)
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

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        setDetails(route.params.dealerDetails)
        // getRequestDetails()
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
                        <Text style={[GlobalStyles.headerTitle, { marginRight: 25 }]}>Request ID : {route.params.dealerDetails.id}</Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <Request request={details} showId={false} action={() => { }} />
            <BottomView fstBtnTitle="REJECT" sndBtnTitle="ADD DEALER" trdBtnTitle="HOLD" buttonCount={3} fstAction={rejectRequest} sndAction={() => {
                navigation.navigate('AddDealer', { 'details': route.params.dealerDetails })
            }} trdAction={holdRequest} />
        </SafeAreaView>
    )
}
export default DetailsScreen
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
    }
})