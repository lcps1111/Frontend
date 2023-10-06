import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from '../Styles';


export default SearchAndResetButtons = ({ handleSubmit,
    resetForm }) => {
    return (

        <View style={Styles.buttonContainer}>
            <TouchableOpacity style={Styles.searchButton} onPress={handleSubmit}>
                <Text style={Styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.resetButton} onPress={resetForm}>
                <Text style={Styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );

}