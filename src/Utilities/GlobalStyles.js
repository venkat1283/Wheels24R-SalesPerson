import { Platform, StyleSheet } from 'react-native'
import { COLORS } from '../Utilities/COLORS'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    subContainer: {
        flex: 1,
        marginHorizontal: 15,
    },
    backImgStyle: {
        width: 24,
        height: 24
    },
    header: {
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 0,
        shadowRadius: 3,
        shadowOpacity: 0.3,
        backgroundColor: COLORS.header,
        // zIndex: 5,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 5,
        shadowColor: COLORS.viewShadow,
        shadowOffset: {
            width: 0,
            height: -6
        },
        ...Platform.select({
            android: {
                elevation: 0,
            }
        }),
        shadowRadius: 3,
        shadowOpacity: 0.8,
        backgroundColor: COLORS.white,
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0


    },
    headerTitle: {
        marginLeft: 5,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: COLORS.white
    },
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
    dealerimg: {
        width: 12,
        height: 12
    }
})