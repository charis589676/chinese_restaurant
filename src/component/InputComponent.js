import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import { color } from 'react-native-reanimated'

export const InputComponent = (props) => {
    const {isDescription, isIcon} = props
    return(
        <View style={styles.mainContainer}>
            {
                isIcon ?
                <Icon size={20} {...props} /> : null
            }
            <TextInput style={[styles.input, {height: isDescription ? 100 : 40}]} multiline={true} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 8,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    }, input : {
        borderWidth : 1,
        textAlignVertical: 'bottom',
        fontSize: 16,
        width: '100%',
        color: '#F97B22',
        backgroundColor: '#F2EAD3',
        borderRadius:20,
        padding: 10
    }
})