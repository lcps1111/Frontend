import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import * as Animatable from 'react-native-animatable';
import React from "react";

// this is for rendering the flight title
export const locationTitle = (departure, arrival) => {
    return (

        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.searchFlightText}>Search For Flight</Text>
            </View>
            <Text style={styles.locationText}>{departure}</Text>
        </View>

    );
}
// this is for rendering the flight details
export const renderFlightDetails = (title, departure, arrival) => {
    return (
        <Animatable.View animation="fadeInUp" duration={500} style={[styles.dayContainer, {
            backgroundColor: "#F4F4F4"
        }]}>

            < Text style={styles.flightText} > {title}</Text>
            <Animatable.View animation="bounceIn" duration={1000} style={styles.separateBox}>
                <Text style={styles.activityDescription}>{departure}</Text>
            </Animatable.View>
            <Animatable.View animation="bounceIn" duration={1000} style={styles.separateBox}>
                <Text style={styles.activityDescription}>{arrival}</Text>
            </Animatable.View>
        </Animatable.View >
    );
};

// this is for rendering the flight links
export const renderFlightLinks = (links) => {
    return (
        <Animatable.View animation="fadeInUp" duration={500} style={[styles.dayContainer2, { backgroundColor: "#F4F4F4" }]}>
            <Text style={styles.flightText}> Recommended</Text>
            {(links || []).map((link, index) => (

                <TouchableOpacity onPress={() => handleLinkPress(link.link)} key={index} style={styles.separateBox}>
                    {index === 0 && (
                        <View style={styles.cheapestLabel}>
                            <Text style={styles.cheapestLabelText}>Cheapest</Text>
                        </View>
                    )}
                    <Animatable.View animation="bounceIn" duration={1000} style={styles.activityContainer}>
                        <View style={styles.foContent}>
                            <View style={styles.ftextContainer}>
                                <Text style={styles.activityDescription}>Agent: {link.agentId.toUpperCase()}</Text>
                                <Text style={styles.activityDescription}>Price: HKD${parseFloat(link.amount).toLocaleString()}</Text>
                            </View>

                        </View>
                    </Animatable.View>
                </TouchableOpacity>
            ))}

        </Animatable.View>
    );
};

// this is for navigating to the external link with alert message
const handleLinkPress = (linkUrl) => {
    Alert.alert(
        "External Link",
        "You are about to be redirected to an external website. Are you sure you want to continue?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("User cancelled"),
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => Linking.openURL(linkUrl)
            }
        ],
        { cancelable: false }
    );
};

const styles = StyleSheet.create({


    dayContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",

    },
    dayContainer2: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",

    },

    activityContainer: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'flex-start',

    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    searchFlightText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#BF9898",

    },

    flightText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },

    locationText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black",
    },
    flightTitleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },
    activityDescription: {
        fontSize: 14,
        marginBottom: 10,
        color: "#666",
    },
    activityTitle2: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "black",
    },
    foContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ftextContainer: {
        marginRight: 70, // Optional: Add some margin between text and icon
    },
    iconcheap: {
        width: 50, // Adjust the width as desired
        height: 50, // Adjust the height as desired
    },
    separateBox: {
        borderWidth: 1, // this is the border around the box
        borderRadius: 5, // this is to give the corners a slight roundness
        padding: 10, // this is space inside the box
        marginBottom: 10, // this gives space between each box
        backgroundColor: 'white', // this is the box background color
        borderColor: '#ddd', // this is the box border color
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cheapestLabel: {
        position: "absolute",
        top: -13,
        left: 15,
        backgroundColor: "#B00326",
        paddingHorizontal: 13,
        borderRadius: 6

    },
    cheapestLabelText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

});