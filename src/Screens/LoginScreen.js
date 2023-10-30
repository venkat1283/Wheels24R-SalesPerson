import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    Pressable,
    Image,
    TextInput,
    Dimensions,
    Platform,
    TouchableOpacity
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import GlobalStyles from "../Utilities/GlobalStyles"
import { WelcomeBack, LoginWheel, DownArrow, Edit, Eye } from "../Images";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Utilities/COLORS";
import axios from "axios";
import { AppContext } from '../../AppProvider'
import { getData, storeData } from '../Utilities/AsyncStorage_'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URLS } from "../Utilities/urls";


const LoginScreen = () => {
    const { updateLoading, updateToken } = useContext(AppContext);
    const deviceHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const [showSecure, setShowSecure] = useState(true);
    const [secondsTime, setSecondsTime] = useState(30);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    //Login
    const onLoginAction = async () => {
        var config = {
            method: "POST",
            body: JSON.stringify({
                "username": userName,
                "password": password,
                "firebase_token": "",
                "device_name": ""
            }),
            headers: {
                "Content-Type": "text/plain",
                Accept: "*/*",
                "Client-Service": "Wheels24r",
                "Auth-Key": "Wheels24r@123",
            },
        };
        updateLoading(true)
        try {
            const response = await fetch(
                URLS.BASE_URI + URLS.LOGIN, config
            );
            const data = await response.json();
            console.log(data);
            // alert("Response: " + JSON.stringify(data))
            if (data.status === 200) {
                storeData('token', data.token);
                storeData('isLogin', 1)
                updateToken(data.token);
                navigation.navigate('Tabs')
            }
        } catch (error) {
            console.log(error)
            alert("Error: " + error)
            // updateLoading(false)
        }
        updateLoading(false)
    };

    return (
        // <SafeAreaView style={GlobalStyles.container}>
        <ImageBackground source={WelcomeBack} style={GlobalStyles.backgroundImage}>
            <SafeAreaView style={styles.subContainer}>
                <View
                    style={[styles.firstView, { height: (deviceHeight - 200) / 2 }]}
                >
                    <View style={styles.imageBackView}>
                        <Image source={LoginWheel} style={styles.image} />
                    </View>
                </View>
                <View style={[styles.middleView, { height: 270 }]}>
                    <View style={styles.midFirstView}>
                        <Text style={styles.phoneText}>User Name</Text>
                        <View style={styles.textInputview}>
                            <TextInput style={styles.textInput} placeholder="Enter User Name" value={userName} onChangeText={(value) => {
                                setUserName(value)
                            }} />
                        </View>
                        <Text style={styles.phoneText}>Password</Text>
                        <View style={styles.textInputview}>
                            <TextInput style={styles.textInput} secureTextEntry={showSecure} placeholder="Enter Password" value={password} onChangeText={(value) => {
                                setPassword(value)
                            }} />
                            <Pressable onPress={() => {
                                setShowSecure(!showSecure);
                            }}>
                                <Image source={Eye} style={styles.eyeImage} />
                            </Pressable>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.verifyButton, { opacity: (userName.length > 0 && password.length > 0) ? 1 : 0.5 }]}
                        onPress={() => {
                            if (userName.length > 0 && password.length > 0) {
                                // setVerify(true);
                                onLoginAction()
                                // navigation.navigate('Tabs')
                            }
                        }}
                    >
                        <Text style={styles.verifyText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.thirdView, { height: (deviceHeight - 200) / 2 }]}
                ></View>
            </SafeAreaView>
        </ImageBackground>
        // </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    firstView: {
        alignItems: "center",
        justifyContent: "center",
        position: 'relative'
    },
    imageBackView: {
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: 75,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginBottom: 10
    },
    image: {
        width: 54,
        height: 57,
    },
    textInput: {
        flex: 1,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontStyle: 'normal',
        paddingLeft: 5,
        marginHorizontal: 5
    },
    welcomeText: {
        color: COLORS.white,
        fontFamily: "Roboto-Medium",
        fontSize: 28,
        textAlign: "center",
        position: 'absolute',
        bottom: 16
    },
    middleView: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    thirdView: {
    },
    midFirstView: {
        flex: 1,
        justifyContent: "flex-start",
        marginHorizontal: 10,
        marginTop: 5,
    },
    phoneText: {
        color: "#272623",
        fontFamily: "Roboto-Medium",

        fontSize: 15,
        textAlign: "left",
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 5,
    },
    textInputview: {
        backgroundColor: "#EFEFEF",
        flexDirection: "row",
        marginHorizontal: 10,
        borderRadius: 4,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    eyeImage: {
        width: 24,
        height: 24,
    },
    verifyButton: {
        backgroundColor: COLORS.button,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 4,
        height: 45,
        justifyContent: "center",
        alignItems: "center",

    },
    verifyText: {
        color: COLORS.white,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        textAlign: "center",
        width: '100%',
    },
    midFirstSubView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    otpText: {
        textAlign: "center",
        color: "#272623",
        fontFamily: "Roboto-Regular",
        fontSize: 15,
    },
    mobileNumber: {
        color: "#272623",
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        textAlign: "center",
    },
    editImage: {
        width: 16,
        height: 16,
        marginLeft: 5,
    },
    otpTextInputview: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderRadius: 4,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 35,
    },
    otpTextView: {
        backgroundColor: "#EFEFEF",
        width: 40,
        height: 40,
        textAlign: "center",
        color: "#272623",
        fontFamily: "Roboto-Regular",
        fontSize: 15,
        marginRight: 20,
        borderRadius: 5,
    },
    reSendTxt: {
        textAlign: "center",
        color: "#rgba(39,38,35,0.8)",
        fontFamily: "Roboto-Regular",
        fontSize: 13,
    },
    seconds: {
        textAlign: "center",
        color: "#272623",
        fontFamily: "Roboto-Medium",
        fontSize: 13,
    },
});
