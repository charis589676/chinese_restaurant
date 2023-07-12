import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import HomeScreen from '../screen/HomeScreen';
import AddProductScreen from '../screen/AddProductScreen';
import ShowProductScreen from '../screen/ShowProductScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Chinese food',
          headerStyle: {
            backgroundColor: '#A8A196',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'Add food',
          headerStyle: {
            backgroundColor: '#A8A196',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowProduct"
          component={ShowProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
