import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Book Detail', headerBackTitle: 'Back', tabBarStyle: { display: 'none' } }} />
  </Stack.Navigator>
);

export default HomeStack;
