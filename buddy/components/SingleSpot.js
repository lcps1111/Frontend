import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { serverUrl, parseTime } from '../service/dataService';

export const SingleSpot = ({ day, selectedSpotName, onAdd, onCancel, onload }) => {

    const [date, setDate] = useState(new Date())
    const [activity, setActivity] = useState({
        "description": "Loading...",
        "fromLat": 0,
        "fromLng": 0,
        "lat": 0,
        "lng": 0,
        "price(hkd)": "Loading...",
        "tourist_spot": selectedSpotName,
        "suggested_arrival_time": date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    });




    const fetchSpotData = async () => {
        try {
            const payload = JSON.stringify({
                location: selectedSpotName,
            });
            const headers = {
                'Content-Type': 'application/json',
            };

            fetch(serverUrl + "spot", {
                method: 'POST',
                headers: headers,
                body: payload
            }).then((response) => response.json())
                .then((json) => {
                    setActivity(prevState => ({
                        ...prevState,
                        description: json.description,
                        fromLat: json.lat,
                        fromLng: json.lng,
                        lat: json.lat,
                        lng: json.lng,
                        tourist_spot: json.tourist_spot,
                        "price(hkd)": json["price(hkd)"],
                    }));
                })

        } catch (error) {
            console.log(error);
        }
    };
    const handleAdd = () => {
        onAdd(activity);
    };
    const handleCancel = () => {
        onCancel();
    };

    useEffect(() => {
        fetchSpotData();
    }, []);

    useEffect(() => {
        if (activity.lat && activity.lng) {
            onload(activity);
        }
    }, [activity]);

    return (
        <View style={styles.container}>
            <Text style={styles.day}>{`${day}`}</Text>
            <View style={styles.form}>
                <View style={styles.activityContainerContent}>
                    <Text style={styles.activityTitle}>{`${activity['tourist_spot']}`}</Text>
                    <View style={styles.row}>
                        <Text style={styles.suggestedTime}>Time: </Text>
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setDate(currentDate);
                                setActivity(prevState => ({
                                    ...prevState,
                                    suggested_arrival_time: currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString()
                                }));
                            }}
                        />
                    </View>
                    <Text style={styles.activityDescription}>{`Description: ${activity['description'] ?? 'loading...'}`}</Text>
                    <Text style={styles.activityPrice}>{`Price: HKD $${activity['price(hkd)'] ?? 'loading...'}`}</Text>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, activity.description === 'Loading...' && styles.disabledButton]} onPress={() => handleAdd()} disabled={activity.description === 'Loading...'}>
                        <Text style={{ color: "white", marginLeft: 1 }}>Add</Text>
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
        padding: 20,
        backgroundColor: "#F4F4F4",
    },
    day: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    form: {
        padding: 20,
        backgroundColor: "white",
    },
    activityContainerContent: {
        width: '90%',
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#444",
    },
    suggestedTime: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 10,
    },
    activityDescription: {
        fontSize: 14,
        marginBottom: 10,
        color: "#666",
    },
    tranPlan: {
        fontSize: 14,
        color: "#666",
        marginBottom: 40,
    },
    activityPrice: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#444",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
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
    },
    disabledButton: {
        backgroundColor: "grey",
        width: '40%',
        height: 50,
        marginLeft: '7%',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
    }
});