import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

import { UsersIcon, } from "react-native-heroicons/solid";

import Styles from '../Styles';


export default function Adultboxes({ guest, setGuest }) {
    return (<View style={[Styles.inputContainerPerson, { zIndex: 1 }]}>
        <UsersIcon style={Styles.icon} size={30} color="#B00326" />
        <Text style={{ color: "black" }}>Adults: </Text>
        <View style={[Styles.guestContainer, { alignItems: 'center', }]}>
            <TextInput // Number of Adults
                style={Styles.input}
                placeholder="No. of Adults"
                value={guest}
                onChangeText={(text) => {
                    let newText = '';
                    let numbers = '0123456789';

                    for (let i = 0; i < text.length; i++) {
                        if (numbers.indexOf(text[i]) > -1) {
                            newText = newText + text[i]; W
                        }
                    }
                    setGuest(newText);
                }}
                keyboardType="numeric" // Ensure numeric input
                underlineColorAndroid="transparent"
                autoFocus={false} // Activate the keyboard automatically
                returnKeyType="done" // Set the return key type to "done"
            />

            {/* set the button to increase or decrease the number of adults */}
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setGuest((prevGuest) => (parseInt(prevGuest) + 1).toString())} // increase number 
                >
                    <Text style={Styles.guestButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (parseInt(guest) > 1) {
                            setGuest((prevGuest) => (parseInt(prevGuest) - 1).toString()); // decrease number, not below 1
                        }
                    }}
                >
                    <Text style={Styles.guestButtonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>)
};