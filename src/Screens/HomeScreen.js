import { FlatList, Image, LogBox, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { LoginWheel } from '../Images'
import Request from '../Component/Request'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { URLS } from '../Utilities/urls'
import axios from 'axios'
import { getData } from '../Utilities/AsyncStorage_'
import { AppContext } from '../../AppProvider'

const HomeScreen = () => {
    const { updateLoading, token } = useContext(AppContext)
    const [requests, setRequests] = useState([])
    const [count, setCount] = useState([])
    const navigation = useNavigation()
    const getRequests = async () => {
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
            const response = await axios.post(URLS.BASE_URI + URLS.REQUESTS,
                {
                    "inspection_filter": "",
                    "select_date": ""
                },
                config
            );
            let responseData = response['data'];
            console.log("Added requests:", responseData['alldealer_requests'])
            if (response.status === 200) {
                setCount(responseData['alldealer_requests'].length)
                reArrageRequests(responseData['alldealer_requests'])
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

    const reArrageRequests = (data) => {
        const groupedData = [];

        data.forEach((item) => {
            const { submit_date } = item;

            // Check if there is an existing group with the same add_date
            const existingGroup = groupedData.find((group) => group.date === submit_date);

            // If an existing group is found, add the item to its list
            if (existingGroup) {
                existingGroup.List.push(item);
            } else {
                // If no existing group is found, create a new group
                groupedData.push({
                    date: submit_date,
                    key: groupedData.length,
                    List: [item],
                });
            }
        });
        console.log("Refactor array", groupedData);
        setRequests(groupedData)
    }
    useFocusEffect(
        React.useCallback(() => {
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
            getRequests()
        }, [])
    )
    // useEffect(() => {
    //     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    //     getData('token')
    //         .then((value) => {
    //             setToken(value)
    //             getRequests()
    //         })
    // }, [])
    return (
        <SafeAreaView style={[GlobalStyles.container, { paddingTop: Platform.OS == 'android' ? 0 : 0 }]}>
            {/* <View style={styles.subContainer}> */}
            <StatusBar backgroundColor="#0178DC" />
            {/* header */}
            <View style={{ backgroundColor: COLORS.header, marginBottom: 20 }}>
                <View style={[GlobalStyles.header, {
                    paddingHorizontal: 16, shadowColor: "#000000", justifyContent: 'space-between', flexDirection: 'row'
                }]}>
                    <TouchableOpacity style={{ alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 10, padding: 5 }} onPress={() => {
                    }}>
                        <Image source={LoginWheel} style={styles.logoImgStyle} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        navigation.navigate('AddDealer')
                    }}>
                        <Text style={styles.addDealer}>+ ADD DEALER</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style={styles.headingView}>
                <Text style={styles.heading1}>All Requests</Text>
                <Text style={styles.heading2}>({count})</Text>
            </View>
            <FlatList
                style={{ marginBottom: 80 }}
                data={requests}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.dateNotif}>
                            <Text style={styles.date}>{item.date}</Text>
                            <FlatList
                                data={item.List}
                                renderItem={({ item }) => {
                                    return <Request request={item} action={() => {
                                        navigation.navigate('Details', { 'dealerDetails': item })
                                    }} />
                                }} />
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}
export default HomeScreen
// 
const styles = StyleSheet.create({
    logoImgStyle: {
        width: 30,
        height: 30,
    },
    addDealer: {
        color: COLORS.white,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },
    headingView: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    }
})