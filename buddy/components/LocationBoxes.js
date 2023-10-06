import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import Styles from '../Styles';



// Autocomplete input component
const AutocompleteInput = ({ placeholder, value, onChangeText, data, renderItem }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const handleInputChange = (text) => {
        onChangeText(text);
    };

    const handleItemPress = (item) => {
        onChangeText(item.City);
        setIsFocused(false);
    };

    useEffect(() => {
        if (isFocused) {
            dropdownRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
    }, [isFocused]);

    useEffect(() => {
        if (!value) {
            setIsFocused(false);
        }
    }, [value]);



    return (
        // Hide the keyboard when the user taps the Autocomplete input
        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()} accessible={false}>
            <View style={[Styles.autocompleteContainer, isFocused && Styles.autocompleteContainerFocused]}>
                <TextInput
                    ref={inputRef}
                    style={[Styles.autocompleteInput, isFocused && Styles.autocompleteInputFocused]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    textAlign="left"

                />
                {isFocused && value && (
                    <View style={Styles.autocompleteDropdownContainer}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleItemPress(item)} style={Styles.autocompleteItemTouchable}>
                                    <Text style={Styles.autocompleteItemText}>{item.City}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.City}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={Styles.autocompleteDropdownContent}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );

};


export default function LocationBoxes({ departure, setDeparture, destination, setDestination, filterCities, renderAutocompleteDeparture, renderAutocompleteDestination }) {

    return (<View style={[Styles.inputContainer, { zIndex: 9999 }]}>
        <MapPinIcon style={Styles.icon} size={30} color="#B00326" />
        <AutocompleteInput
            placeholder="Departure"
            value={departure}
            onChangeText={setDeparture}
            data={filterCities(departure)}
            renderItem={renderAutocompleteDeparture}
        />
        {/* set the destination location */}
        <AutocompleteInput
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
            data={filterCities(destination)}
            renderItem={renderAutocompleteDestination}
        />
    </View>)
}