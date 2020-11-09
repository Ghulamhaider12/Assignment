import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {
 Image
} from 'react-native';
import  Home  from   '../Screens/Home';
import  Feed  from    '../Screens/NewsFeed';
import  Notifications from  '../Screens/Notification';
import  Profile   from   '../Screens/Profile';

import React from 'react';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
   <NavigationContainer independent={true}>
    <Tab.Navigator
      initialRouteName="Home"
       
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
         <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../Assets/Images/home.png')} style={{tintColor:color,height:size,width:size}}   />
            // <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../Assets/Images/feeds.png')} style={{tintColor:color,height:size,width:size}}   />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../Assets/Images/bell.png')} style={{tintColor:color,height:size,width:size}}   />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../Assets/Images/user.jpg')} style={{tintColor:color,height:size,width:size,borderRadius:size/2 }}   />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MyTabs;