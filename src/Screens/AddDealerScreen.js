import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Alert, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'
import { Back, DropDown, LoginWheel } from '../Images'
import Request from '../Component/Request'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomView from '../Component/BottomView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddDealerScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [dealerName, setDealerName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [type, setType] = useState('')
    const [emailId, setEmailId] = useState('')
    const [typeIndex, setTypeIndex] = useState(-1)
    const [openType, setOpenType] = useState(false)
    const [exp, setExp] = useState('')
    const [pwd, setPwd] = useState('')
    const [cnfmPwd, setCnfmPwd] = useState('')

    const [fields, setFields] = useState([{ 'key': 0, 'value': 'Dealer Name', 'placeholder': 'Enter Dealer Name' },
    { 'key': 1, 'value': 'Business Name', 'placeholder': 'Enter Business Name' },
    { 'key': 2, 'value': 'Phone Number', 'placeholder': 'Enter Phone Number' },
    { 'key': 3, 'value': 'Address', 'placeholder': 'Enter Address' },
    { 'key': 4, 'value': 'Contact Person', 'placeholder': 'Enter Person Name' },
    { 'key': 5, 'value': 'Dealer Type', 'placeholder': 'Select Dealer Type' },
    { 'key': 6, 'value': 'Experience', 'placeholder': 'Enter Experience' },
    { 'key': 7, 'value': 'Email ID', 'placeholder': 'Enter Email Id' },
    { 'key': 8, 'value': 'Password', 'placeholder': 'Enter Password' },
    { 'key': 9, 'value': 'Confirm Password', 'placeholder': 'Enter Confirm Password' }])

    const moveToPayment = () => {
        if (dealerName !== '') {
            if (businessName !== '') {
                if (phone !== '') {
                    if (address !== '') {
                        if (contact !== '') {
                            if (type !== '') {
                                if (exp !== '') {
                                    if (emailId !== '') {
                                        if (pwd !== '') {
                                            if (cnfmPwd !== '') {
                                                if (pwd == cnfmPwd) {
                                                    console.log(route.params.details)
                                                    navigation.navigate('Payment', { dealerDetails: { 'id': route.params.details['id'], 'dealer': dealerName, 'businessName': businessName, 'phone': phone, 'location': address, 'contact': contact, 'type': type, 'experience': exp, 'emailid': emailId, 'password': pwd, 'confirmpassword': cnfmPwd } })
                                                } else {
                                                    Alert.alert('Alert', "Password and confirm password should be same", [
                                                        { text: 'Ok', onPress: {} }
                                                    ])
                                                }
                                            } else {
                                                Alert.alert('Alert', "Plase enter Confirm Password", [
                                                    { text: 'Ok', onPress: {} }
                                                ])
                                            }
                                        } else {
                                            Alert.alert('Alert', "Plase enter Password", [
                                                { text: 'Ok', onPress: {} }
                                            ])
                                        }
                                    } else {
                                        Alert.alert('Alert', "Plase enter Email ID", [
                                            { text: 'Ok', onPress: {} }
                                        ])
                                    }
                                } else {
                                    Alert.alert('Alert', "Plase enter Experience", [
                                        { text: 'Ok', onPress: {} }
                                    ])
                                }
                            } else {
                                Alert.alert('Alert', "Plase select Dealer Type", [
                                    { text: 'Ok', onPress: {} }
                                ])
                            }
                        } else {
                            Alert.alert('Alert', "Plase enter Contact person name", [
                                { text: 'Ok', onPress: {} }
                            ])
                        }
                    } else {
                        Alert.alert('Alert', "Plase enter Address", [
                            { text: 'Ok', onPress: {} }
                        ])
                    }
                } else {
                    Alert.alert('Alert', "Plase enter Phone Number", [
                        { text: 'Ok', onPress: {} }
                    ])
                }
            } else {
                Alert.alert('Alert', "Plase enter Business Name", [
                    { text: 'Ok', onPress: {} }
                ])
            }
        }
        else {
            Alert.alert('Alert', "Plase enter Dealer Name", [
                { text: 'Ok', onPress: {} }
            ])
        }
    }
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
                        <Text style={[GlobalStyles.headerTitle, { marginRight: 25 }]}>Add Dealer</Text>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView style={{ marginBottom: 100 }}>
                <FlatList
                    data={fields}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text style={styles.name}>{item.value}</Text>

                                {item.key == 5 &&
                                    <Pressable style={styles.searchViewStyle} onPress={() => {
                                        setOpenType(!openType)
                                    }}>
                                        <TextInput style={styles.textInput} editable={false} placeholder={item.placeholder} placeholderTextColor='#rgba(39, 38, 35, 0.50)' value={type} />
                                        <Image source={DropDown} style={styles.downImgStyle} />
                                    </Pressable>
                                }

                                {(openType && item.key == 5) && <View style={styles.typesView}>
                                    <Pressable style={styles.types} onPress={() => {
                                        setType('Individual')
                                        setOpenType(!openType)
                                    }}>
                                        <Text style={styles.typeText}>Individual</Text>
                                    </Pressable>
                                    <Pressable style={styles.types} onPress={() => {
                                        setType('Inspection')
                                        setOpenType(!openType)
                                    }}>
                                        <Text style={styles.typeText}>Inspection</Text>
                                    </Pressable>
                                    <Pressable style={styles.types} onPress={() => {
                                        setType('Sales')
                                        setOpenType(!openType)
                                    }}>
                                        <Text style={styles.typeText}>Sales</Text>
                                    </Pressable>
                                </View>}

                                {item.key !== 5 && <View style={styles.searchViewStyle}>
                                    <TextInput style={styles.textInput}
                                        placeholder={item.placeholder}
                                        placeholderTextColor='#rgba(39, 38, 35, 0.50)'
                                        value={
                                            item.key == 0 ? dealerName :
                                                item.key == 1 ? businessName :
                                                    item.key == 2 ? phone :
                                                        item.key == 3 ? address :
                                                            item.key == 4 ? contact :
                                                                item.key == 5 ? type :
                                                                    item.key == 6 ? exp :
                                                                        item.key == 7 ? emailId :
                                                                            item.key == 8 ? pwd : cnfmPwd
                                        }
                                        keyboardType={item.key == 2 ? 'number-pad' : item.key == 7 ? 'email-address' : 'ascii-capable'}
                                        secureTextEntry={item.key > 7 ? true : false}
                                        onChangeText={(value) => {
                                            if (item.key == 0) {
                                                setDealerName(value)
                                            } else if (item.key == 1) {
                                                setBusinessName(value)
                                            } else if (item.key == 2) {
                                                if (phone.length < 10) {
                                                    setPhone(value)
                                                }
                                            } else if (item.key == 3) {
                                                setAddress(value)
                                            } else if (item.key == 4) {
                                                setContact(value)
                                            } else if (item.key == 5) {
                                                setType(value)
                                            } else if (item.key == 6) {
                                                setExp(value)
                                            } else if (item.key == 7) {
                                                setEmailId(value)
                                            } else if (item.key == 8) {
                                                setPwd(value)
                                            } else if (item.key == 9) {
                                                setCnfmPwd(value)
                                            }
                                        }} />
                                </View>}
                            </View>
                        )
                    }}
                    keyExtractor={(item) => { return item.key }}
                />

            </KeyboardAwareScrollView>
            <BottomView sndBtnTitle="NEXT" buttonCount={1} sndAction={moveToPayment} />
        </SafeAreaView>
    )
}
export default AddDealerScreen
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
    searchViewStyle: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 4,
        backgroundColor: '#rgba(239, 239, 239, 0.70)',
        alignItems: 'center',
        paddingLeft: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'space-between'
    },
    textInput: {
        flex: 1,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        paddingLeft: 5,
        marginHorizontal: 5
    },
    name: {
        color: '#414141',
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        marginHorizontal: 16,
        marginTop: 20
    },
    downImgStyle: {
        width: 24,
        height: 24,
    },
    typesView: {
        backgroundColor: COLORS.white,
        marginHorizontal: 18,
        padding: 10,
        shadowColor: COLORS.headerShadow,
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 4,
        shadowRadius: 3,
        shadowOpacity: 0.7,
    },
    types: {

    },
    typeText: {
        color: '#414141',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginBottom: 10,
    }
})