import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { imageSlider } from '../../data/data'
import { CategoryList } from '../../data/data'


const HomeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <SliderBox
                image={imageSlider}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={40}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Categories
                </Text>
            </View>
            <FlatList
                data={CategoryList}
                key={3}
                numColumns={3}
                keyExtractor={(item) => item.id}/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})