// This page show the list of itinerary of the user
// The itinerary is stored in the local storage
// The user can delete the itinerary by clicking the delete button
// The user can also click the itinerary to view the detail of the itinerary and edit the itinerary
// The user can also click the add button to add a new itinerary

import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { TrashIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import Styles from '../Styles';

import { retrieveData, removeFromItineraryList } from '../service/dataService';

const ListItineraryScreen = ({ navigation }) => {

    const [itineraryList, setItineraryList] = useState([]);

    retrieveData('itineraryList').then((value) => {
        if (value != null) {
            setItineraryList(value);
        }
    });

    const deleteItinerary = (id) => {

        Alert.alert(
            "Delete Itinerary",
            "Are you sure to delete this itinerary?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

                {
                    text: "OK", onPress: () => {
                        const newList = itineraryList.filter((item) => item.id != id);
                        setItineraryList(newList);
                        removeFromItineraryList(id);
                    }
                }
            ],
            { cancelable: false }
        );

    }

    const renderItem = ({ item }) => {


        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("ResultScreen", { newItinerary: false, ...item })}
            >
                <Text style={styles.title}>{item.tripTitle}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteItinerary(item.id)}
                >
                    <TrashIcon size={25} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={Styles.container}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 25, color: "black", marginTop: 16 }}>
                    My Itinerary
                </Text>
                <Text style={{ fontSize: 15, color: "grey", marginTop: 8 }}>
                    Here are the list of your itinerary
                </Text>
                <FlatList

                    data={itineraryList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#B00326",
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 32,
                        flexDirection: "row", // Use row direction to place icon and text side by side.
                    }}
                    onPress={() => navigation.navigate("HomepageScreen")}
                >
                    <PlusCircleIcon size={50} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#B00326',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        width: 300,
    },
    title: {
        fontSize: 20,
        color: "white",
    },
    deleteButton: {
        backgroundColor: '#B00326',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        width: 50,
    },
});



export default ListItineraryScreen;



