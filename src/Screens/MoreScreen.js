import { FlatList, Image, LogBox, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Switch, Modal, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back, Logout, Right } from '../Images'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { URLS } from '../Utilities/urls'
// import { resetNavigationToInitialScreen } from '../../StackNavigator'
import { AppContext } from '../../AppProvider'
import { getPlainMessage } from '../Utilities/Comms'

const CustomAlert = ({ visible, onClose, onOpen }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#rgba(65, 65, 65, 0.50)' }}>
                <View style={{ backgroundColor: COLORS.white, padding: 20, marginHorizontal: 50, borderRadius: 10, alignItems: 'center', height: 200 }}>
                    {/* <Image source={Car1} style={{ width: 100, height: 100 }} /> */}
                    <Text style={{ marginBottom: 20 }}>Logout</Text>
                    <Text style={{ marginBottom: 20, textAlign: 'center' }}>Are you sure you want to logout from this device?</Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={onClose} style={{ backgroundColor: COLORS.blueBorder, alignItems: 'center', width: 50, height: 40, marginRight: 40 }}>
                            <Text style={{ color: COLORS.white, backgroundColor: COLORS.blueBorder, marginTop: 10 }}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onOpen} style={{ backgroundColor: '#rgba(239, 239, 239, 0.70)', alignItems: 'center', width: 50, height: 40 }}>
                            <Text style={{ color: COLORS.blueBorder, marginTop: 10 }}>YES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const MoreScreen = () => {
    const { token, updateLoading } = useContext(AppContext)
    const route = useRoute()
    const navigation = useNavigation()
    const [requests, setRequests] = useState([{ "key": 0, 'id': '1234', 'dealer': 'Suresh', 'type': 'Sales', 'location': 'Hyderabad', 'phone': "+91 9776767676" }, { "key": 1, 'name': 'Trending Cars', 'contact': 'Madhav', 'exp': '5 Years', 'email': 'trendingcars@gmail.com', 'password': "*******" }, { "key": 2, 'id': '1236', 'dealer': 'Ramesh', 'type': 'Sales', 'location': 'Bangalore', 'phone': "+91 9787656568" }])
    const [isEnabled, setIsEnabled] = useState(true)
    const [isAlertVisible, setIsAlertVisible] = useState(false)

    const toggleButton = () => {
        setIsEnabled(!isEnabled)
    }

    const onLogoutAction = async () => {
        var config = {
            headers: {
                Accept: "*/*",
                "Client-Service": "Wheels24r",
                "Auth-Key": "Wheels24r@123",
                "Authorization": token
            },
        };
        updateLoading(true)
        try {
            const response = await axios.post(
                URLS.BASE_URI + URLS.LOGOUT, {},
                config
            );
            console.log(response);
            let resposne = response['data'];
            if (resposne.status === 200) {
                // resetNavigationToInitialScreen()
                navigation.navigate('Login')

                removeData('isLogin')
                removeData('token')
            }
            updateLoading(false)
        } catch (error) {
            console.log(error)
            updateLoading(false)
            Alert.alert("Failure", getPlainMessage(error.response.data.message), [
                { text: "OK", onPress: () => { } }
            ])
        }
    };

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

            <View style={styles.supportView}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }} onPress={() => {
                    navigation.navigate('Onboard')
                }}>
                    <Text style={styles.supportText}>Onboard Dealers</Text>
                    <Image source={Right} style={styles.supportImg} />
                </Pressable>
            </View>

            <View style={styles.supportView}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }} >
                    <Text style={styles.supportText}>Notifications</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#0F73EE' }}
                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleButton}
                        value={isEnabled}
                    />
                </Pressable>
            </View>

            <View style={styles.supportView}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }} onPress={() => {
                    setIsAlertVisible(true)
                }}>
                    <Text style={styles.supportText}>Logout</Text>
                    <Image source={Logout} style={styles.supportImg} />
                </Pressable>
            </View>
            <CustomAlert visible={isAlertVisible} onClose={() => {
                setIsAlertVisible(false)
            }} onOpen={() => {
                setIsAlertVisible(false)
                onLogoutAction()
            }} />
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
    supportView: {
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        marginTop: 20,
        marginHorizontal: 16,
        shadowColor: COLORS.viewShadow,
        shadowOffset: {
            width: 0,
            height: 6
        },
        elevation: 5,
        shadowRadius: 3,
        shadowOpacity: 0.8,
    },
    supportImg: {
        width: 24,
        height: 24,
        tintColor: 'black'
    },
    supportText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },

})