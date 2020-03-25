import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import firebase from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import * as ImageManipulator from 'expo-image-manipulator';


import Scraper from './Search.js';


export default class HomeSreen extends Component {
    

    constructor(props) {
        super(props)

    }


    takePicture = async () => {
        if (this.camera) {
            let picture = await this.camera.takePictureAsync({ quality: 0.5, base64: true })
            console.log(picture.uri);
            this.processPictureManipulateBlock(picture.uri);
            // here going to the next screen logic.
            console.log("Props ",this.props)

            
        }
    };


    processPictureManipulateBlock = async (pictPath) => {
        const manipResult = await ImageManipulator.manipulateAsync(pictPath);
        const processPictureManipulateBlock = await vision().textRecognizerProcessImage(manipResult.uri); //change path to latest image in library
        console.log("this is from Manipulate block\n", "===========");

        // console.log(manipResult) 
        console.log("text:", processPictureManipulateBlock.text); // text result = processPictureManipulateBlock.text

        var string = "";
        string = processPictureManipulateBlock.text;
        console.log("typeof string var: " + typeof string);
        string = string.split('\n');
        console.log("typeof string var: " + typeof string);

        this.searchYa(string);
    }

    searchYa = async (stringArray) => {
        for (var i in stringArray) {
            stringArray[i] = stringArray[i].replace(/\s/g, '%20')
            stringArray[i] = stringArray[i].replace(/\W|[_]/g, '') // check again your regex syntax :)
            // 1) remove all unsued string that tarn doesnt want. 2) check it, if its empty skip it but if its available process it with scrapper and audio 
            if (stringArray[i] == '')
                console.log("skip it Andre said") //its not a string so it will be
            else {
                var result = await Scraper(stringArray[i])
                console.log(stringArray[i] + "with the result: " + result)
                if (result != undefined || result != null)
                    console.log("available text")
                    
              this.props.navigation.navigate('Audio', {
                  Result: result

               })
                // this.playAudio(result); // think it later
            }
        }
    };
    
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Camera
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={{ flex: 3 }}
                    type={Camera.Constants.Type.back}
                    autoFocus={Camera.Constants.AutoFocus.on}
                />
                <View style="{{ flex: 1; backgroundColor: 'white'; }}">
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={{ alignItems: 'center' }}
                    >
                        <Ionicons name="ios-radio-button-on" size={64} color="black" />
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
