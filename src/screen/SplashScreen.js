import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Image, StyleSheet } from 'react-native'

const SplashScreen = (props) => {
    const { navigation } = props
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Drawer')
        }, 3000)
    }, [])

    return (
        <View style={styles.mainContainer}>
            <ImageBackground style={styles.imageBackground} source={require('../../assets/images/food_splash.pnh')} >
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }, imageBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    }, image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default SplashScreen