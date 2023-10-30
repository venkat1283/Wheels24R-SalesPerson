import { Alert, Dimensions, FlatList, Image, LogBox, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { LoginWheel } from '../Images'
import Request from '../Component/Request'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import DealerInfo from '../Component/DealerInfo'
import { URLS } from '../Utilities/urls'
import axios from 'axios'
import { getPlainMessage } from '../Utilities/Comms'
import { AppContext } from '../../AppProvider'

const DealersScreen = () => {
    const { updateLoading, token } = useContext(AppContext)
    const [requests, setRequests] = useState([])
    const [btnIndex, setBtnIndex] = useState(0)
    const navigation = useNavigation()

    const getRequests = async (index) => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.FILTER_REQUESTS,
                {
                    "inspection_filter": "",
                    "select_date": "",
                    "request_status": index == 0 ? "Completed" : index == 1 ? "Reject" : "Hold"
                },
                config
            );
            let responseData = response['data'];
            console.log("Requests :", responseData)
            if (response.status === 200) {
                setRequests(responseData['dealer_requests'])
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

    const rejectRequest = async (idValue) => {
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
                    "dealer_request_id": idValue,
                },
                config
            );
            let responseData = response['data'];
            console.log("Reject Request details:", responseData)
            if (response.status === 200) {
                Alert.alert("Success", getPlainMessage(responseData.message), [
                    {
                        text: "OK", onPress: () => {
                            getRequests(2)
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

    const reinitiateRequest = async (idValue) => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.RE_INITIATE,
                {
                    "dealer_request_id": idValue,
                },
                config
            );
            let responseData = response['data'];
            console.log("Reintiate Request details:", responseData['details'])
            if (response.status === 200) {
                Alert.alert("Success", getPlainMessage(responseData.message), [
                    {
                        text: "OK", onPress: () => {
                            getRequests(btnIndex)
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

    useFocusEffect(
        React.useCallback(() => {
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
            setBtnIndex(0)
            getRequests(0)
        }, [])
    )
    // useEffect(() => {
    //     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    //     getRequests(0)
    // }, [])

    return (
        <SafeAreaView style={[GlobalStyles.container, { paddingTop: Platform.OS == 'android' ? 0 : 0 }]}>
            {/* <View style={styles.subContainer}> */}
            <StatusBar backgroundColor="#0178DC" />
            {/* header */}
            <View style={{ backgroundColor: COLORS.header, marginBottom: 20 }}>
                <View style={[GlobalStyles.header, {
                    paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', shadowColor: "#000000"
                }]}>
                    <Text style={GlobalStyles.headerTitle}>Dealers</Text>
                </View>
            </View>

            <View style={styles.headingView}>
                <Pressable style={[styles.btn, { borderColor: btnIndex == 0 ? COLORS.blueBorder : COLORS.viewShadow }]} onPress={() => {
                    setBtnIndex(0)
                    getRequests(0)
                }}>
                    <Text style={[styles.btnText, { color: btnIndex == 0 ? COLORS.blueBorder : '#414141' }]}>Completed</Text>
                </Pressable>
                <Pressable style={[styles.btn, { borderColor: btnIndex == 1 ? COLORS.blueBorder : COLORS.viewShadow }]} onPress={() => {
                    setBtnIndex(1)
                    getRequests(1)
                }}>
                    <Text style={[styles.btnText, { color: btnIndex == 1 ? COLORS.blueBorder : '#414141' }]}>Rejected</Text>
                </Pressable>
                <Pressable style={[styles.btn, { borderColor: btnIndex == 2 ? COLORS.blueBorder : COLORS.viewShadow }]} onPress={() => {
                    setBtnIndex(2)
                    getRequests(2)
                }}>
                    <Text style={[styles.btnText, { color: btnIndex == 2 ? COLORS.blueBorder : '#414141' }]}>Hold</Text>
                </Pressable>
            </View>

            {requests.length > 0 && <FlatList
                style={{ marginBottom: 80 }}
                data={requests}
                renderItem={({ item }) => {
                    return <DealerInfo request={item} showButtons={btnIndex >= 1 ? true : false} buttonIndex={btnIndex} action={() => {
                        { btnIndex == 0 && navigation.navigate('requestDlrDetails', { 'details': item }) }
                    }
                    } act1={() => { rejectRequest(item.id) }} act2={() => { reinitiateRequest(item.id) }} />
                }} />}
            {requests.length == 0 && <View style={styles.message}>
                <Text style={styles.messageText}>{btnIndex == 0 ? "No completed requests" : btnIndex == 1 ? "No Reject requests" : "No Hold requests"}</Text>
            </View>}
        </SafeAreaView>
    )
}
export default DealersScreen
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
    headingView: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    heading1: {
        color: "#414141",
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },
    heading2: {
        color: "#rgba(39, 38, 35, 0.60)",
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },
    date: {
        color: "#414141",
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginHorizontal: 16,
    },
    btn: {
        width: (Dimensions.get('window').width / 3) - 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5
    },
    btnText: {
        color: "#414141",
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
    },
    message: {
        flex: 1,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15
    }
})