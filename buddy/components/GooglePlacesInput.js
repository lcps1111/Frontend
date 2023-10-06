import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../assets/key/google_api_key';
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";


export const GooglePlacesInput = ({ onAdd, onCancel }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleAdd = () => {
        onAdd(selectedValue);
    };
    const handleCancel = () => {
        onCancel();
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <MagnifyingGlassIcon color={"black"}></MagnifyingGlassIcon>
                <Text style={styles.title}>Search Destination</Text>
            </View>
            <View style={styles.googlePlaceInputcontainer}>
                <GooglePlacesAutocomplete
                    styles={{
                        textInput: {
                            backgroundColor: '#D9D9D9',
                        },
                    }}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        setSelectedValue(data["description"]);
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
                        <Text style={{ color: "white", marginLeft: 1 }}>add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleCancel()}>
                        <Text style={{ color: "white", marginLeft: 1 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#F4F4F4",
    },
    googlePlaceInputcontainer: {
        padding: 10,
        margin: 10,
        height: "80%",
        backgroundColor: "white",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#444",
        marginLeft: 10,
    },
    dayText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    addNewActivityText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#444",
    },
    button: {
        backgroundColor: "#B00326",
        width: '40%',
        height: 50,
        marginLeft: '7%',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
    }
});