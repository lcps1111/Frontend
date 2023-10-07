import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import React from "react";


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

export default FlightComponent = ({ flights }) => {


    return (
        <>

            <Text style={styles.flightText}>Flights Information</Text>

            {(flights.data.flights || []).map((flight, index) => (

                <TouchableOpacity onPress={() => handleLinkPress(flight.purchaseLinks[0].url)} key={index} style={styles.separateBox}>
                    {index === 0 && (
                        <View style={styles.cheapestLabel}>
                            <Text style={styles.cheapestLabelText}>Cheapest</Text>
                        </View>
                    )}

                    <Animatable.View animation="bounceIn" duration={1000} style={styles.activityContainer}>
                        <View style={styles.foContent}>
                            <View style={styles.ftextContainer}>
                                <Text style={styles.activityDescription_agent}>Airline: {flight.segments[0].legs[0].marketingCarrier.displayName}</Text>
                            </View>
                            <Image style={styles.iconcheap} source={{ uri: flight.segments[0].legs[0].marketingCarrier.logoUrl }} />



                        </View>
                        <Text style={styles.activityDescription}>
                            (Outbound) From:
                            {flight.segments[0].legs[0].originStationCode} to {flight.segments[0].legs[0].destinationStationCode}
                        </Text>
                        <Text style={styles.activityDescription}>Departure Date: {flight.segments[0].legs[0].departureDateTime.split('T')[0]}</Text>
                        <Text style={styles.activityDescription}>Departure Time (Local Time): {flight.segments[0].legs[0].departureDateTime.split('T')[1].substr(0, 5)}</Text>
                        <Text style={styles.activityDescription}>Arrival Date: {flight.segments[0].legs[0].arrivalDateTime.split('T')[0]}</Text>
                        <Text style={styles.activityDescription}>Arrival Time (Local Time): {flight.segments[0].legs[0].arrivalDateTime.split('T')[1].substr(0, 5)}</Text>
                        {/* blank line */}
                        <Text style={styles.activityDescription}></Text>
                        <Text style={styles.activityDescription}>
                            (Inbound) From:
                            {flight.segments[1].legs[0].originStationCode} to {flight.segments[1].legs[0].destinationStationCode} </Text>
                        <Text style={styles.activityDescription}>Departure Date: {flight.segments[1].legs[0].departureDateTime.split('T')[0]}</Text>
                        <Text style={styles.activityDescription}>Departure Time (Local Time): {flight.segments[1].legs[0].departureDateTime.split('T')[1].substr(0, 5)}</Text>
                        <Text style={styles.activityDescription}>Arrival Date: {flight.segments[1].legs[0].arrivalDateTime.split('T')[0]}</Text>
                        <Text style={styles.activityDescription}>Arrival Time (Local Time): {flight.segments[1].legs[0].arrivalDateTime.split('T')[1].substr(0, 5)}</Text>
                        <Text style={styles.activityDescription}></Text>

                        <Text style={styles.flightText2}>Total Price: HKD$ {parseFloat(flight.purchaseLinks[0].totalPrice).toLocaleString("zh-HK")}</Text>

                    </Animatable.View>
                </TouchableOpacity>
            ))}


        </>

    );
}

const styles = StyleSheet.create({


    activityContainer: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'flex-start',

    },


    flightText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },
    flightText2: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },


    activityDescription: {
        fontSize: 14,
        marginBottom: 10,
        color: "#666",
    },
    activityDescription_agent: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: "bold",
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
        left: 2,
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