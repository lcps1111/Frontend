import React from "react";
import { View, Text } from "react-native";

import LottieView from 'lottie-react-native';
import Styles from '../Styles';


export default LoadingAnimation = ({ processing }) => {
    return (
        <View style={[Styles.containerL, { zIndex: 9999 }]}>
            {processing ?
                <View style={[Styles.animationContainer, { marginTop: 20, zIndex: 9999 }]}>
                    <Text style={Styles.loadingText}>AI Generating Itinerary…</Text>
                    <LottieView
                        style={Styles.lottie}
                        source={require('../assets/110340-red-bounce-loading-animation.json')}
                        autoPlay
                        loop
                    />
                </View>
                :
                null
            }
        </View>);
}
