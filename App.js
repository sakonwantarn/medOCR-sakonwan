import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import firebase from '@react-native-firebase/app';
import { Ionicons } from '@expo/vector-icons';
import vision from '@react-native-firebase/ml-vision';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { Audio } from 'expo-av';

import { render } from 'react-dom';

import HomeScreen from './src/HomeScreen';
import showAudio from './src/ShowAudio';

const Stack = createStackNavigator();


export default class App extends Component {

  constructor() {
    super();

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Audio" component={showAudio} />
        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



