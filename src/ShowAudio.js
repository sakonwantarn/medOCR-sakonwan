import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import vajaAPI from './vajaAPI.js';

export default class showAudio extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log("Andre say now is playig the audio\n")
        this.playAudio();
    }

    playAudio = async () => {
        const { Result } = this.props.route.params;
        result = Result;

        //////unnessary to declare
        var audioData = await vajaAPI(result);
        console.log("audio result", audioData); // you get the audio files here looks >
        // audioData receive data from VajaApi so I can replace it which VajaApi output = playsound/////

        var soundObj = new Audio.Sound();
        var currentIndex = 0;

        var _status = await soundObj.getStatusAsync(); // we miss the loop :( so it doesnt looping the audio files. it should have 7 files that played one by one. will you fix it by yourselft or with me?  
        var totIdx = audioData.length - 1;
        // now lets find the error below 
        while (true) {
            var _status = await soundObj.getStatusAsync();
            var totIdx = audioData.length - 1;
            console.log('currentIndex: ' + currentIndex + ' of ' + totIdx);
            console.log(_status); // first it doesnt contain anything (?)
            if (currentIndex > audioData.length) {
                return;
            }
            if (_status.isLoaded != true) {
                try {
                    await soundObj.loadAsync({ uri: audioData[currentIndex].uri })
                } catch (error) {
                    console.log(error);
                }
            } else
                if (_status.isLoaded == true && _status.isPlaying == false) {
                    if (_status.durationMillis == _status.positionMillis) {
                        try {
                            await soundObj.unloadAsync();
                            currentIndex = currentIndex + 1;
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    try {
                        await soundObj.playAsync();
                    } catch (error) {
                        console.log(error);
                    }
                }
        }
    }

    render() {

        const { Result } = this.props.route.params;

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Show Drug Info</Text>
                    <Text>{Result}</Text>
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
