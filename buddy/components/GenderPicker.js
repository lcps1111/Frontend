import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'; // Import Platform
import DropDownPicker from 'react-native-dropdown-picker';
import { FaceSmileIcon } from "react-native-heroicons/solid";
import Styles from '../Styles';

export default function GenderPicker({ gender, setGender }) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Prefer not to Disclose the Gender', value: 'N/A' },
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]);

    return (
        <View style={[Styles.inputContainer2, styles.dropDownContainer]}>
            <FaceSmileIcon style={Styles.icon} size={30} color="#B00326" />
            <DropDownPicker
                open={open}
                value={gender}
                items={items}
                setOpen={setOpen}
                setValue={setGender}
                setItems={setItems}
                containerStyle={{ height: 50, width: 250 }}
                style={{ borderWidth: 0 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
    },
    dropDownContainer: {
        zIndex: 1000, // Use a high zIndex value
        ...Platform.select({
            android: {
                elevation: 1000, // Use a high elevation value for Android
            },
        }),
    },
});
