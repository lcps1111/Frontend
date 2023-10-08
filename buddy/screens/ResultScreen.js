import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { ArrowUpCircleIcon, TrashIcon, PlusCircleIcon, HomeIcon } from "react-native-heroicons/solid";
import { addToItineraryList, getItinerary, addItinerary, removeFromItinerary, replaceItinerary, parseTime } from '../service/dataService';
import { MapComponent, mapAnimateToRegion } from '../components/MapComponent';
import { renderHotel } from "../components/hotelComponent";
import FlightComponent from "../components/flightComponent";
import { GooglePlacesInput } from "../components/GooglePlacesInput";
import { SingleSpot } from "../components/SingleSpot";
import DateTimePicker from "@react-native-community/datetimepicker";
import { clickLogger } from "../components/logging";


// this is the result page of the app, including the itinerary, flight details, hotel details and the buttons to render the respective components.
const ResultScreen = ({ route }) => {

    const [params, setParams] = useState({
        newItinerary: false,
        gender: '',
        itineraryData: {},
        id: null,
        flightData: [],
        origin: '',
        destination: '',
        tripTitle: '',
        location: '',
        hotelData: [],
        ...route.params,
    });

    const navigation = useNavigation();
    const [showItinerary, setShowItinerary] = useState(true);
    const [showMap, setShowMap] = useState(true);
    const [showSingleSpot, setShowSingleSpot] = useState(false);
    const [showGooglePlacesInput, setShowGooglePlacesInput] = useState(false);
    const [selectedItineraryDate, setselectedItineraryDate] = useState('Day 1');
    const [selectedSpotName, setSelectedSpotName] = useState('');
    const [showFlightDetails, setShowFlightDetails] = useState(false);
    const [showHotelDetails, setShowHotelDetails] = useState(false);
    const [chosenSpot, setChosenSpot] = useState(params.itineraryData["Day 1"][0] ?? {});
    const scrollRef = useRef(null);
    const mapRef = useRef(null);
    const [gender, setGender] = useState('');
    const [hotelSortOrder, setHotelSortOrder] = useState('asc');
    const [numResults, setNumResults] = useState(5);
    const [totalPrice, setTotalPrice] = useState(0);
    // this is for reloading the itinerary

    console.log(params.itineraryData)
    const reloadItinerary = async (id = params.id) => {

        const updatedItinerary = await getItinerary(id);
        setParams((prevState) => ({
            ...prevState,
            itineraryData: updatedItinerary
        }));
        return updatedItinerary;
    }
    // this is for deleting the spot
    const deleteSpot = (id, day, tourist_spot) => {

        Alert.alert(
            "Delete Spot",
            "Are you sure to delete this Spot?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

                {
                    text: "OK", onPress: async () => {
                        await removeFromItinerary(id, day, tourist_spot);
                        const updatedItinerary = await reloadItinerary();
                        setChosenSpot(updatedItinerary["Day 1"][0]);
                        mapAnimateToRegion(mapRef, updatedItinerary["Day 1"][0].lat, updatedItinerary["Day 1"][0].lng);
                    }
                }
            ],
            { cancelable: false }
        );

    }



    // this is for returning to the home page
    const handleReturn = () => {
        navigation.navigate('Home');
    };
    // this is for saving the itinerary to the itinerary list and alerting the user
    const handleSave = async () => {
        Alert.alert(
            "Save Itinerary",
            "Itinerary Saved!",
            [
                {
                    text: "OK", onPress: async () => {
                        await replaceItinerary(params.id, params.itineraryData);
                        await reloadItinerary(params.id);
                    }
                }
            ],
            { cancelable: false }
        );

    }
    // this is for rendering the itinerary details and the buttons to render the respective components and the buttons to save and return to the home page 
    const allDaysEmpty = Object.values(params.itineraryData).every(dayActivities => !Array.isArray(dayActivities) || dayActivities.length === 0);
    if (allDaysEmpty) {
        return (
            <View style={[styles.noActivityContainer, { backgroundColor: 'white' }]}>
                <Text style={{
                    fontSize: 24,
                    color: 'black',
                    fontWeight: 'bold',
                    marginBottom: 20
                }}>
                    No activities for this day
                </Text>

                <TouchableOpacity style={styles.homeButton1} onPress={handleReturn}>
                    <Text style={styles.homeButtonText1}>Search Again</Text>
                </TouchableOpacity>

            </View>
        );
    }

    // if there is no itinerary data, flight data or hotel data, then the user will be alerted that there is no data available
    if (!params.itineraryData) {
        return (
            <Animatable.View animation="fadeIn" duration={500} style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Itinerary Data Available</Text>
            </Animatable.View>
        );
    }
    // if there is no flight data, then the user will be alerted that there is no flight data available
    if (!params.flightData) {
        return (
            <Animatable.View animation="fadeIn" duration={500} style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Flight is Available</Text>
                <TouchableOpacity style={[styles.homeButton1, { marginTop: 30 }]} onPress={handleReturn}>
                    <Text style={styles.homeButtonText1}>Search Again</Text>
                </TouchableOpacity>
            </Animatable.View>
        );

    }
    // if there is no hotel data, then the user will be alerted that there is no hotel data available
    if (!params.hotelData) { // If there is no hotel data
        return (
            <Animatable.View animation="fadeIn" duration={500} style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Room is Available</Text>
                <TouchableOpacity style={[styles.homeButton1, { marginTop: 30 }]} onPress={handleReturn}>
                    <Text style={styles.homeButtonText1}>Search Again</Text>
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    // Add the itinerary to the itinerary list
    useEffect(() => {

        if (params.newItinerary && params.itineraryData && params.flightData && params.hotelData) {
            addToItineraryList({
                itineraryData: params.itineraryData,
                flightData: params.flightData,
                hotelData: params.hotelData,
                origin: params.origin,
                destination: params.destination,
                tripTitle: params.tripTitle,
                location: params.location,
                gender: params.gender
            }).then((id) => {
                setParams((prevState) => ({
                    ...prevState,
                    id: id,
                    newItinerary: false,
                }));
                reloadItinerary(id).then((updatedItinerary) => {
                    setChosenSpot(updatedItinerary["Day 1"][0]);
                    mapAnimateToRegion(mapRef, updatedItinerary["Day 1"][0].lat, updatedItinerary["Day 1"][0].lng);
                });
            });

        }
    }, []);
    // add gender to the state
    useEffect(() => {
        setGender(params.gender)
    }, [params.gender]);

    // this if for parsing the price to integer and calculating the total price
    useEffect(() => {
        let sum = 0;

        // Ensure params.itineraryData is an object
        if (typeof params.itineraryData === 'object' && params.itineraryData !== null) {

            for (const day in params.itineraryData) {

                // Ensure params.itineraryData[day] is an array before iterating over it
                if (Array.isArray(params.itineraryData[day])) {

                    for (const activity of params.itineraryData[day]) {
                        if (activity && activity['price(hkd)']) {  // Ensure activity is not undefined and has price
                            sum += parseInt(activity['price(hkd)'], 10);  // Always provide radix to parseInt
                        }
                    }

                }

            }

        }

        setTotalPrice(sum);
    }, [params.itineraryData]);


    return (
        // this is for rendering the itinerary details and the buttons to render the respective components and the buttons to save and return to the home page
        <View style={[styles.mainContainer]}>

            <View style={[styles.row, styles.header]}>
                <TouchableOpacity style={[styles.buttonr]} onPress={() => handleReturn()}>
                    <HomeIcon size={30} style={styles.searchImage} color="black" />
                </TouchableOpacity>
                <Text style={styles.price}>Total Price:${parseFloat(totalPrice).toLocaleString()}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
                    <Text style={{ color: "white" }}>Save</Text>
                </TouchableOpacity>
            </View>


            {
                // this is for showing the hotel details and the sort button
                showHotelDetails &&
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() => setHotelSortOrder(hotelSortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        <Image
                            style={styles.sortImage}
                            source={require('../assets/sort.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            }




            {
                // this is for showing the flight details 
                showFlightDetails &&
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image
                        style={styles.planeImage}
                        source={require('../assets/airplane.png')}
                        resizeMode="contain"
                    />
                </View>

            }


            {//this is for showing the map
                showMap && <MapComponent
                    mapRef={mapRef}
                    oriLat={chosenSpot.fromLat}
                    oriLng={chosenSpot.fromLng}
                    destLat={chosenSpot.lat}
                    destLng={chosenSpot.lng} />}
            { // this is for showing the google places input
                (showGooglePlacesInput) && <GooglePlacesInput
                    onAdd={(selectedValue) => {
                        setShowMap(true);
                        setShowSingleSpot(true);
                        setShowGooglePlacesInput(false);
                        setSelectedSpotName(selectedValue)
                    }}
                    onCancel={() => {
                        setShowMap(true);
                        setShowItinerary(true);
                        setShowFlightDetails(false);
                        setShowHotelDetails(false);
                        setShowGooglePlacesInput(false);
                    }}></GooglePlacesInput>
            }

            {// this is for showing the single spot component
                (showSingleSpot) && <SingleSpot
                    day={selectedItineraryDate}
                    selectedSpotName={selectedSpotName}
                    onload={(activity) => {
                        setChosenSpot(activity);
                        mapAnimateToRegion(mapRef, activity.lat, activity.lng);
                    }}
                    onAdd={async (activity) => {
                        await addItinerary(params.id, selectedItineraryDate, activity);
                        await reloadItinerary();
                        setShowMap(true);
                        setShowItinerary(true);
                        setShowSingleSpot(false);
                        setShowFlightDetails(false);
                        setShowHotelDetails(false);
                        setShowGooglePlacesInput(false);
                        clickLogger("add new spot", gender);
                    }}
                    onCancel={() => {
                        setShowMap(true);
                        setShowItinerary(true);
                        setShowSingleSpot(false);
                        setShowFlightDetails(false);
                        setShowHotelDetails(false);
                        setShowGooglePlacesInput(false);
                    }}></SingleSpot>
            }

            <ScrollView contentContainerStyle={styles.scrollContainer} ref={scrollRef}>
                <View style={styles.container}>

                    {// this is for showing the itinerary details
                        showItinerary && Object.keys(params.itineraryData)
                            .filter(day => Array.isArray(params.itineraryData[day]))
                            .map((day, index) => (
                                <Animatable.View animation="fadeInUp"
                                    duration={500}
                                    delay={index * 300}
                                    key={index}
                                    style={styles.dayContainer}>
                                    <Text style={styles.dayText}>{`${day}`}</Text>

                                    {params.itineraryData[day].map((activity, activityIndex) => (
                                        <Animatable.View
                                            animation="bounceIn"
                                            duration={1000}
                                            delay={activityIndex * 200}
                                            key={activityIndex}
                                            style={styles.activityContainer}
                                        >
                                            <View style={styles.circle} />
                                            <View style={styles.line} />
                                            <View style={styles.activityContainerContent}>
                                                <Text style={styles.activityTitle}
                                                    onPress={() => {
                                                        setChosenSpot(activity);
                                                        mapAnimateToRegion(mapRef, activity.lat, activity.lng);

                                                    }}>
                                                    {activity.tourist_spot ? activity.tourist_spot : activity.restaurant}
                                                </Text>
                                                <View style={styles.row}>
                                                    <Text style={styles.suggestedTime}>Time: </Text>
                                                    <DateTimePicker
                                                        value={new Date(parseTime(`${activity['suggested_arrival_time']}`))}
                                                        mode="time"
                                                        display="default"
                                                        onChange={(event, selectedDate) => {
                                                            if (selectedDate) {
                                                                const newTime = selectedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                                                setParams((prevState) => ({
                                                                    ...prevState,
                                                                    itineraryData: {
                                                                        ...prevState.itineraryData,
                                                                        [day]: prevState.itineraryData[day].map((item, i) => {
                                                                            if (i === activityIndex) {
                                                                                return {
                                                                                    ...item,
                                                                                    suggested_arrival_time: newTime
                                                                                }
                                                                            }
                                                                            return item;
                                                                        })
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                </View>

                                                <Text style={styles.activityDescription}>{`Description: ${activity['description']}`}</Text>
                                                <View style={styles.row}>
                                                    <Text style={styles.activityPrice}>Price: HKD $</Text>
                                                    <TextInput
                                                        style={[styles.input, styles.activityPrice]}
                                                        value={`${activity['price(hkd)']}`}
                                                        keyboardType="numeric"
                                                        onChangeText={(num) => {
                                                            setParams((prevState) => ({
                                                                ...prevState,
                                                                itineraryData: {
                                                                    ...prevState.itineraryData,
                                                                    [day]: prevState.itineraryData[day].map((item, i) => {
                                                                        if (i === activityIndex) {
                                                                            num
                                                                            return {
                                                                                ...item,
                                                                                'price(hkd)': num == "" ? 0 : num
                                                                            }
                                                                        }
                                                                        return item;
                                                                    }
                                                                    )
                                                                }
                                                            }));
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => {
                                                    deleteSpot(params.id, day, activity.tourist_spot || activity.restaurant);
                                                    clickLogger("delete spot", gender);
                                                }}
                                            >
                                                <TrashIcon size={25} color="gray" />
                                            </TouchableOpacity>


                                        </Animatable.View>

                                    ))}
                                    <TouchableOpacity onPress={() => {
                                        // initial setting for rendering the information
                                        setselectedItineraryDate(day);
                                        setShowGooglePlacesInput(true);
                                        setShowFlightDetails(false);
                                        setShowMap(false);
                                        setShowHotelDetails(false);
                                        setShowItinerary(false);

                                    }}>
                                        <Animatable.View animation="bounceIn" duration={1000} style={styles.newActivityContainer}>
                                            <PlusCircleIcon color="#B00326" size={45} style={{ marginRight: 20 }} />
                                            <Text style={styles.addNewActivityText} >Add New Destination</Text>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </Animatable.View>

                            ))}

                    {showFlightDetails && <FlightComponent
                        flights={params.flightData}
                        gender={gender}
                    />}



                    {// this is for rendering the hotel details
                        showHotelDetails &&
                        params.hotelData.results
                            .sort((a, b) => {
                                if (hotelSortOrder === 'asc') {
                                    return parseFloat(a.price.total) - parseFloat(b.price.total);
                                } else {
                                    return parseFloat(b.price.total) - parseFloat(a.price.total);
                                }
                            })
                            .map((hotel, index) => {
                                const sortedImages = hotelSortOrder === 'asc' ? hotel.images.sort() : hotel.images.sort().reverse();
                                const sortedHotel = { ...hotel, images: sortedImages, index };
                                return renderHotel(sortedHotel, index, numResults, gender);
                            })
                    }
                    { // this is for rendering the hotel details
                        showHotelDetails &&
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', marginBottom: 100 }}>
                            <TouchableOpacity
                                style={{ marginTop: 40, position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => setNumResults(numResults + 5)}
                            >
                                <PlusCircleIcon color="#B00326" size={45} style={{ marginTop: 25 }} />
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Show 5 More</Text>
                            </TouchableOpacity>
                        </View>
                    }


                </View>
            </ScrollView >
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    // this is the button for rendering the itinerary
                    style={[
                        styles.buttonr,
                        showItinerary ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                        setShowItinerary(true);
                        setShowMap(true);
                        setShowFlightDetails(false);
                        setShowHotelDetails(false);
                        setShowGooglePlacesInput(false);
                        scrollRef.current?.scrollTo({ y: 0, animated: false })

                    }}
                >
                    <Image
                        style={styles.buttonImage}
                        source={showItinerary ? require('../assets/iticonn.png') : require('../assets/iticon.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    // this is the button for rendering the Flight
                    style={[
                        styles.buttonr,
                        showFlightDetails ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                        setShowFlightDetails(true);
                        setShowMap(false);
                        setShowItinerary(false);
                        setShowHotelDetails(false);
                        setShowGooglePlacesInput(false);
                        scrollRef.current?.scrollTo({ y: 0, animated: false })

                    }}
                >
                    <Image
                        style={styles.buttonImage}
                        source={showFlightDetails ? require('../assets/plane_iconn.png') : require('../assets/plane_icon.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    // this is the button for rendering the Hotel
                    style={[
                        styles.buttonr,
                        showHotelDetails ? styles.selectedButton : null,
                    ]}
                    onPress={() => {
                        setShowHotelDetails(true);
                        setShowMap(false);
                        setShowItinerary(false);
                        setShowFlightDetails(false);
                        setShowGooglePlacesInput(false);
                        scrollRef.current?.scrollTo({ y: 0, animated: false })


                    }}
                >
                    <Image
                        style={styles.buttonImage}
                        source={showHotelDetails ? require('../assets/hoteliconn.png') : require('../assets/hotelicon.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0}
                style={styles.scrollToTopButton}
                onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
            >
                <ArrowUpCircleIcon size={48} color="#B00326" />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F4F4F4",
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f5f5f5",
    },
    noDataText: {
        fontSize: 20,
        color: "#777",
    },
    dayContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",

    },
    HotelContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Hotel2Container: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    HotelText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "Black",
    },
    dayText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    activityContainer: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        paddingLeft: '15%'
    },
    activityContainerContent: {
        width: '90%',
    },
    newActivityContainer: {
        transform: [{ translateX: -100 }],
        flexDirection: 'row',
    },
    addNewActivityText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#444",
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#444",
    },
    activityDescription: {
        fontSize: 14,
        marginBottom: 10,
        color: "#666",
    },
    suggestedTime: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 10,
        marginTop: 10,
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
    noActivityContainer: {
        alignItems: "center",
    },
    noActivityText: {
        fontSize: 16,
        color: "#777",
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    homeButton1: {
        backgroundColor: "#B00326",
        padding: 15,
        borderRadius: 50,
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    homeButtonText1: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    noActivityContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        //borderTopWidth: 1,
        //borderTopColor: '#ccc',
    },
    buttonImage: {
        width: 50,
        height: 50,
    },
    buttonr: {
        width: 50,
        height: 50,
        paddingTop: 10,
    },
    buttonTextr: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 5,
        color: '#B00326',
    },

    flightText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },
    activityTitle2: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "black",
    },
    scrollToTopButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 100,
        marginBottom: 50,
    },
    imageStyle: {
        width: 300,
        height: 300,
        marginLeft: 10,
        marginRight: 10,
    },
    sortImage: {
        width: 30,
        height: 30,
        marginRight: 20,
        zIndex: 100,
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 20,
    },
    planeImage: {
        width: 0,
        height: 0,
        marginTop: 50,
    },
    iconcheap: {
        width: 50, // Adjust the width as desired
        height: 50, // Adjust the height as desired
    },
    foContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ftextContainer: {
        marginRight: 10, // Optional: Add some margin between text and icon
    },
    deleteButton: {
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 40,
    },
    // new styles for circles and lines
    circle: {
        position: 'absolute',
        left: '2.5%',
        transform: [{ translateY: 10 }],
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#F8F8F8', // change the background color to #F8F8F8
        borderWidth: 1, // add a border
        borderColor: '#C4C4C4', // set border color to black
    },
    line: {
        position: 'absolute',
        transform: [{ translateX: 10 }, { translateY: 10 }],
        left: '3.7%', // adjust the position to align with the circle and leave 10% space
        top: 30, // adjust the position to align with the top of the content and leave 10% space
        bottom: 0, // adjust the height to stretch to the bottom of the content
        width: 2,
        backgroundColor: '#C4C4C4',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        height: 35,
        width: 100,
        paddingLeft: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#DDD",
        color: "black"
    },
    button: {
        backgroundColor: "#B00326",
        width: '25%',
        height: 50,
        marginLeft: '7%',
        marginRight: '7%',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        marginTop: 50,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ResultScreen;