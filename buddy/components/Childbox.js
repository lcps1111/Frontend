import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

import { UserIcon, } from "react-native-heroicons/solid";

import Styles from '../Styles';


export default function Childboxes({ children, setChildren }) {
    return (<View style={[Styles.inputContainerPerson, { zIndex: 1 }]}>

        <UserIcon style={Styles.icon} size={30} color="#B00326" />
        <Text style={{ color: "black" }}>Childs: </Text>

        <View style={[Styles.guestContainer, { alignItems: 'center', }]}>

            <TextInput // Number of guests
                style={Styles.input}
                placeholder="No. of Child"
                value={children}
                onChangeText={(text) => {
                    let newText = '';
                    let numbers = '0123456789';

                    for (let i = 0; i < text.length; i++) {
                        if (numbers.indexOf(text[i]) > -1) {
                            newText = newText + text[i];
                        }
                    }
                    setChildren(newText);
                }}
                keyboardType="numeric" // Ensure numeric input
                underlineColorAndroid="transparent"
                autoFocus={false} // Activate the keyboard automatically
                returnKeyType="done" // Set the return key type to "done"
            />

            {/* set the button to increase or decrease the number of children */}
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setChildren((prevChildren) => (parseInt(prevChildren) + 1).toString())} // increase number of guests
                >
                    <Text style={Styles.guestButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (parseInt(children) > 1) {
                            setChildren((prevChildren) => (parseInt(prevChildren) - 1).toString()); // decrease number of guests, not below 1
                        }
                    }}
                >
                    <Text style={Styles.guestButtonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>)
};