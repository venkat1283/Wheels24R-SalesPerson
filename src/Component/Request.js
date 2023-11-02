import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dealer, DealerLocation, DealerPhone, Reg } from '../Images'
import { COLORS } from '../Utilities/COLORS'

const Request = ({ request, action, showId = true, type }) => {
    return (
        <Pressable style={styles.mainView} onPress={action}>
            <View style={styles.firstView}>
                {showId && <View style={styles.requestidView}>
                    <Text style={styles.request}>Request ID :</Text>
                    <Text style={styles.requestid}> {request.id}</Text>
                </View>}
                <View style={styles.subView}>
                    <Image source={Dealer} style={styles.dealerimg} />
                    <Text style={styles.heads}>Dealer</Text>
                </View>
                <View style={styles.subView}>
                    <Image source={Dealer} style={styles.dealerimg} />
                    <Text style={styles.heads}>Dealer Type</Text>
                </View>
                <View style={styles.subView}>
                    <Image source={DealerLocation} style={styles.dealerimg} />
                    <Text style={styles.heads}>Location</Text>
                </View>
                <View style={styles.subView}>
                    <Image source={DealerPhone} style={styles.dealerimg} />
                    <Text style={styles.heads}>Phone Number</Text>
                </View>
                {type == 'onboard' &&
                    <View style={styles.subView}>
                        <Image source={Reg} style={styles.dealerimg} />
                        <Text style={styles.heads}>Registered on</Text>
                    </View>
                }
            </View>
            <View style={showId ? type == 'onboard' ? { flex: 2, marginTop: 18 } : [styles.secondView, { marginTop: 15 }] : styles.secondView}>
                <Text style={styles.heads}>: {request.dealer_name}</Text>
                <Text style={styles.heads}>: {(type == 'onboard' || type == 'onboarddetail') ? request.dealer_type : request.dealer_inspection_type}</Text>
                <Text style={styles.heads}>: {(type == 'onboard' || type == 'onboarddetail') ? request.location : request.pincode}</Text>
                <Text style={styles.heads}>: {(type == 'onboard' || type == 'onboarddetail') ? request.mobile_number : request.mobile_no}</Text>
                {type == 'onboard' && <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.heads}>: {request.plan_from_date}</Text>
                    <Text style={styles.exp}>({request.exp_message})</Text>
                </View>}
            </View>
        </Pressable>
    )
}

export default Request

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 16,
        padding: 6,
        shadowColor: COLORS.headerShadow,
        // shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 4,
        shadowRadius: 3,
        shadowOpacity: 0.7,
    },
    firstView: {
        flex: 1,
    },
    subView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    secondView: {
        flex: 1,
    },
    request: {
        color: '#414141',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
    },
    requestid: {
        color: '#414141',
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
    },
    requestidView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    heads: {
        color: '#rgba(39, 38, 35, 0.80)',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        margin: 6
    },
    exp: {
        color: 'red',
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 11,
        marginLeft: -2
    },
    dealerimg: {
        width: 12,
        height: 12
    }
})