import React from "react";
import { View, TextInput } from "react-native";
import { GlobeAsiaAustraliaIcon } from "react-native-heroicons/solid";
import Styles from '../Styles';



export default function TitleBox({ tripTitle, onChangeTripTitle }) {


    return (<View style={[Styles.inputContainer, { zIndex: 9999 }]}>
        <GlobeAsiaAustraliaIcon style={Styles.icon} size={30} color="#B00326" />

        {/* set the trip title */}
        <TextInput
            style={Styles.input}
            placeholder="Trip Title"
            onChangeText={onChangeTripTitle}
            value={tripTitle}
        />

        {/* Set the Departure location*/}
    </View>)
}