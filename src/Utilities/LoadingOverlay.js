
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

const LoadingOverlay = () => {
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate a 5-second loading process
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 5000); // 5000 milliseconds (5 seconds)
    // }, []);

    return (
        <View style={styles.overlay}>
            {isLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator size={50} color="#007AFF" />
                    <Text style={styles.loading}>Loading.....</Text>
                </View>
            ) : null}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
export default LoadingOverlay;
