
// Main.js
import React from 'react';
import { Image } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeStack';
import CartScreen from './screens/CartScreen';
import Images from './assets/index';

const Tab = createBottomTabNavigator();


const iconForRoute = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return focused ? Images.HomeSel : Images.Home;
    case 'Cart':
      return focused ? Images.shopping_cartSel : Images.shopping_cart;
    default:
      return null;
  }
};

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconForRoute(route.name, focused)}
              style={{ width: 64, height: 32, resizeMode: 'contain' }}
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => {
           
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

           
            return {
              tabBarStyle:
                routeName === 'BookDetail'
                  ? { display: 'none' }
                  : undefined, // use default style
            };
          }}
        />

        
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
