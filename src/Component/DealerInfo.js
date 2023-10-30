import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dealer, DealerLocation, DealerPhone, Job } from '../Images'
import { COLORS } from '../Utilities/COLORS'
import BottomView from './BottomView'

const DealerInfo = ({ request, action, showButtons = false, buttonIndex, act1, act2 }) => {
    return (
        <View style={styles.superView}>
            <Pressable style={styles.mainView} onPress={action}>
                <View style={styles.firstView}>
                    <View style={styles.requestidView}>
                        <Text style={styles.requestid}>{request.name}</Text>
                    </View>
                    <View style={styles.subView}>
                        <Image source={DealerPhone} style={styles.dealerimg} />
                        <Text style={styles.header}>Phone number</Text>
                    </View>
                    <View style={styles.subView}>
                        <Image source={DealerLocation} style={styles.dealerimg} />
                        <Text style={styles.header}>Location</Text>
                    </View>
                    {!showButtons && <View style={styles.subView}>
                        <Image source={Job} style={styles.dealerimg} />
                        <Text style={styles.header}>Experience</Text>
                    </View>}
                </View>
                <View style={styles.secondView}>
                    <View style={[styles.requestidView, { justifyContent: 'flex-end' }]}>
                        <Text style={styles.request}> {request.submit_date}</Text>
                    </View>
                    <Text style={styles.header}>: {request.mobile_no}</Text>
                    <Text style={styles.header}>: {request.pincode}</Text>
                    {!showButtons && <Text style={styles.header}>: {request.experiance}</Text>}
                </View>
            </Pressable>
            {showButtons && <View style={{ height: 1, width: '100%', backgroundColor: COLORS.viewShadow, marginTop: 0, marginBottom: 14, alignSelf: 'center' }}></View>}
            {showButtons && <BottomView fstBtnTitle="REJECT" sndBtnTitle="RE-INITIATE" fstAction={act1} sndAction={act2} buttonCount={buttonIndex} extraStyle={{ position: 'relative', height: 40, paddingVertical: 5, marginBottom: 10, alignItems: 'flex-end', shadowColor: 'white' }} />}
        </View>
    )
}

export default DealerInfo

const styles = StyleSheet.create({
    superView: {
        backgroundColor: COLORS.white,
        marginBottom: 10,
        marginHorizontal: 16,
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
    mainView: {
        flexDirection: 'row',
        padding: 6,
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
        marginTop: 5
    },
    request: {
        color: '#414141',
        fontFamily: 'Roboto-Regular',
        fontSize: 11,
    },
    requestid: {
        color: '#414141',
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },
    requestidView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        color: '#rgba(39, 38, 35, 0.80)',
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        margin: 6
    },
    dealerimg: {
        width: 12,
        height: 12
    }
})