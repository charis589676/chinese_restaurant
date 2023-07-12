import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'
import HomeScreen from '../screen/HomeScreen'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
            name='Home'
            component={HomeScreen}
            options={{
                title: 'Chineesee Food',
                headerStyle: {
                    backgroundColor: '#D3E5C2'
                },
                headerTitleAlign: 'center',
                drawerIcon: config =>
                <Icon
                    name='home'
                    type='antdesign'
                />

            }}/>

        </Drawer.Navigator>
    )
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Drawer'>
                <Stack.Screen
                    name='Drawer'
                    component={DrawerNav}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

