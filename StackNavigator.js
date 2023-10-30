import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/Screens/HomeScreen'
import LoginScreen from './src/Screens/LoginScreen'
import DetailsScreen from './src/Screens/DetailsScreen'
import { AppContext } from './AppProvider'
import LoadingOverlay from './src/Utilities/LoadingOverlay'
import MoreScreen from './src/Screens/MoreScreen'
import DealersScreen from './src/Screens/DealersScreen'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import { Dealers, DealersSelect, Home, HomeSelect, More, MoreSelect } from './src/Images'
import AddDealerScreen from './src/Screens/AddDealerScreen'
import DealerPaymentScreen from './src/Screens/DealerPaymentScreen'
import DealerDetails from './src/Screens/DealerDetails'
import { getData, storeData } from './src/Utilities/AsyncStorage_'
import { URLS } from './src/Utilities/urls'
import axios from 'axios'

const Stack = createStackNavigator()
const tab = createBottomTabNavigator()
const navigationRef = React.createRef();
function CustomTabBar(props) {
    return (
        <View style={styles.tabBarWrapper}>
            <View style={styles.tabBarContainer}>
                <BottomTabBar {...props} style={styles.tabBar} />
            </View>
        </View>
    );
}

function TabScreens() {
    return (
        <tab.Navigator
            screenOptions={{
                headerShown: false,
                borderTopWidth: 0,
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0
                }
            }}
            tabBar={(props) => (
                <CustomTabBar {...props} />
            )}
        >

            <tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <View>
                            <Image
                                source={focused ? HomeSelect : Home}
                                style={{ width: 24, height: 24 }}
                            />
                            // </View>/
                        );
                    },
                    tabBarLabel: ({ focused, color, size }) => (
                        <View
                            style={{
                                // borderBottomWidth: focused ? 3 : 0,
                                // borderBottomColor: "#053F5E",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 10,
                                    color: focused ? "#00608B" : "#202020",
                                    marginBottom: 5,
                                    textAlign: 'center',
                                    textAlignVertical: 'top'
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    ),

                }}
            />

            <tab.Screen
                name="Dealers"
                component={DealersScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Image
                                    source={focused ? DealersSelect : Dealers}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>
                        );
                    },
                    tabBarLabel: ({ focused, color, size }) => (
                        <View
                            style={{
                                // borderBottomWidth: focused ? 3 : 0,
                                // borderBottomColor: "#053F5E",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 10,
                                    color: focused ? "#00608B" : "#202020",
                                    marginBottom: 5,
                                    textAlign: 'center',
                                    textAlignVertical: 'top'
                                }}
                            >
                                Dealers
                            </Text>
                        </View>
                    ),
                }}
            />
            <tab.Screen
                name="More"
                component={MoreScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Image
                                    source={focused ? MoreSelect : More}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>
                        );
                    },
                    tabBarLabel: ({ focused, color, size }) => (
                        <View
                            style={{
                                // borderBottomWidth: focused ? 3 : 0,
                                // borderBottomColor: "#053F5E",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 10,
                                    color: focused ? "#00608B" : "#202020",
                                    marginBottom: 5,
                                    textAlign: 'center',
                                    textAlignVertical: 'top'
                                }}
                            >
                                More
                            </Text>
                        </View>
                    ),
                }}
            />
        </tab.Navigator>
    );
}

const StackNavigator = () => {
    const { loading, updateLoading, updateToken } = useContext(AppContext)
    const [resData, setResData] = useState(null)
    const [loginCheck, setLoginCheck] = useState();

    const getCommonData = async () => {
        updateLoading(true)
        var config = {
            headers: {
                "Content-Type": "text/plain",
                Accept: "*/*",
                "Client-Service": "Wheels24r",
                "Auth-Key": "Wheels24r@123",
            },
        };
        let responseData = ''
        try {
            const response = await axios.get(
                URLS.BASE_URI + URLS.COMMON,
                config
            );
            responseData = response['data'];
            console.log(responseData)
            if (response.status === 200) {
                // navigation.navigate('Tabs')
                storeData('types', responseData['inspection_types'])
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            getData('isLogin')
                .then((value) => {
                    if (value == '1') {
                        getData('token')
                            .then((value) => {
                                updateToken(value)
                                setLoginCheck(1)
                                setResData(responseData)
                            })
                    } else {
                        setLoginCheck(0)
                        setResData(responseData)
                    }
                })
            updateLoading(false)
        }
    };
    useEffect(() => {
        getCommonData()
    }, [])
    if (!resData) {
        return null
    }

    return (
        <View style={{ flex: 1 }}>
            {resData == null ? ( // Show a loading indicator while waiting for the API call
                <ActivityIndicator size="large" color="blue" />
            ) : <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={loginCheck == 1 ? 'Tabs' : loginCheck == 1 ? 'Login' : ''}>
                    <Stack.Screen name="Login" component={LoginScreen} options={{
                        headerShown: false
                    }} />
                    {/* <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerShown: false
                }} /> */}
                    <Stack.Screen name='Tabs' component={TabScreens} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="Details" component={DetailsScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="AddDealer" component={AddDealerScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="Payment" component={DealerPaymentScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="requestDlrDetails" component={DealerDetails} options={{
                        headerShown: false
                    }} />
                </Stack.Navigator>
                {/* {loading && <LoadingOverlay />} */}
                {loading && <LoadingOverlay />}
            </NavigationContainer>}
        </View>
    )
}

export default StackNavigator

const styles = StyleSheet.create({
    tabBarWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent', // Adjust background color as needed
        elevation: 5, // Adjust shadow elevation as needed
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabBarContainer: {
        backgroundColor: 'white',
        height: 80, // Adjust the height as needed
        justifyContent: 'center'
    },
    tabBar: {
        borderTopWidth: 0, // Remove the default top border of BottomTabBar
        elevation: 0,
        borderColor: 'white'
    },

})