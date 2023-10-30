import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import GlobalStyles from '../Utilities/GlobalStyles'
import { COLORS } from '../Utilities/COLORS'

const BottomView = ({ fstAction, sndAction, trdAction, buttonCount, fstBtnTitle, sndBtnTitle, trdBtnTitle, extraStyle }) => {
    return (
        <View style={[GlobalStyles.bottomView, extraStyle]}>
            {buttonCount >= 2 && <Pressable style={styles.fstBtn} onPress={fstAction}>
                <Text style={styles.fstBtnText}>{fstBtnTitle}</Text>
            </Pressable>}
            <Pressable style={buttonCount >= 2 ? styles.sndBtn : [styles.sndBtn, { width: '90%' }]} onPress={sndAction}>
                <Text style={styles.sndBtnText}>{sndBtnTitle}</Text>
            </Pressable>
            {buttonCount == 3 && <Pressable style={styles.trdBtn} onPress={trdAction}>
                <Text style={styles.fstBtnText}>{trdBtnTitle}</Text>
            </Pressable>}
        </View>
    )
}

export default BottomView
const styles = StyleSheet.create({
    fstBtnText: {
        color: COLORS.redBorder,
        textAlign: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,

    },
    sndBtnText: {
        color: COLORS.white,
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        backgroundColor: COLORS.blueBorder
    },
    fstBtn: {
        backgroundColor: COLORS.white,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderWidth: 1,
        width: '30%',
        borderColor: COLORS.redBorder,
        ...Platform.select({
            ios: {
                marginTop: 20
            }
        })
    },
    sndBtn: {
        backgroundColor: COLORS.button,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        width: '30%',
        ...Platform.select({
            ios: {
                marginTop: 20
            }
        })
    },
    trdBtn: {
        backgroundColor: COLORS.white,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderWidth: 1,
        width: '30%',
        borderColor: COLORS.redBorder,
        ...Platform.select({
            ios: {
                marginTop: 20
            }
        })
    },

})
