import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';

const SplashScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Drawer');
    }, 3000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground style={styles.imageBackground}>
        <Image
          style={styles.image}
          source={require('../../assets/images/food_splash.png')}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
