import React, { useState, useEffect } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import cities from '../assets/cities.json'
import Styles from '../Styles';
import { HomeIcon } from "react-native-heroicons/solid"
import { serverUrl } from '../service/dataService';
import TitleBox from "../components/Titlebox";
import LocationBoxes from "../components/LocationBoxes";
import Adultboxes from "../components/Adultbox";
import Childboxes from "../components/Childbox";
import DatePickers from "../components/DatePickers";
import BudgetSetter from "../components/BugetSetter";
import SearchAndResetButtons from "../components/SearchAndResetButtons";
import LoadingAnimation from "../components/LoadingAnimation";
import GenderPicker from "../components/GenderPicker";






const HomepageScreen = () => {
  const [processing, setProcessing] = useState(false);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [guest, setGuest] = useState("1");
  const [children, setChildren] = useState("0");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [citiesData, setCitiesData] = useState([]);
  const [tripTitle, setTripTitle] = useState("");
  const [gender, setGender] = useState("");
  const [itineraryData, setItineraryData] = useState([]);
  const [airTicketData, setAirTicketData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [userData, setUserData] = useState([]);

  const onChangeTripTitle = (tripTitle) => {
    setTripTitle(tripTitle);
  }

  const handleReturn = () => {
    navigation.navigate('Home');
  };

  const navigation = useNavigation();

  const readCitiesJSON = async () => {
    const jsonCitiesData = cities;
    setCitiesData(jsonCitiesData);
  };

  // Read the cities data from the JSON file
  useEffect(() => {
    readCitiesJSON();
  }, []);

  // Filter the cities based on the entered text
  const filterCities = (text) => {
    if (text) {
      const filteredCities = citiesData.filter((city) => {
        const cityName = city && city.City ? city.City.toLowerCase() : "";
        return cityName.includes(text.toLowerCase());
      });
      return filteredCities;
    } else {
      return citiesData; // Return the full list when the input value is empty
    }
  };

  // Render the item for the Autocomplete dropdown
  const renderAutocompleteDeparture = ({ item }) => {
    if (item && item.City) {
      const handleItemPress = () => {
        setDeparture(item.City);
        setIsFocused(false); // Hide the dropdown
      };

      return (
        <TouchableOpacity onPress={handleItemPress}>
          <Text style={Styles.autocompleteItem}>{item.City}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  // Render the item for the Autocomplete dropdown
  const renderAutocompleteDestination = ({ item }) => {
    if (item && item.City) {
      const handleItemPress = () => {
        setDestination(item.City);
        setIsFocused(false); // Hide the dropdown
      };

      return (
        <TouchableOpacity onPress={handleItemPress}>
          <Text style={Styles.autocompleteItem}>{item.City}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };


  // this is for submitting the input data and send it to the endpoints.
  const handleSubmit = async () => {
    //calculate duration
    let duration = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1; // calculate duration in days



    // match the country name to the flight code of the destination
    let flightCodeDestination;
    citiesData.forEach((city) => {
      if (city.City === destination.trim()) {
        flightCodeDestination = city.Code;
      }
    });

    // match the country name to the flight code of the departure
    let flightCodeDeparture;
    citiesData.forEach((city) => {
      if (city.City === departure.trim()) {
        flightCodeDeparture = city.Code;
      }
    });


    // Construct the request body for the itinerary
    let itineraryParams = JSON.stringify({
      "location": destination.trim(),
      "budget": budget,
      "duration": duration
    });

    // Construct the request body for the air ticket
    let airTicketParams = JSON.stringify({
      "origin": flightCodeDeparture,
      "destination": flightCodeDestination,
      "goDate": fromDate.toISOString().slice(0, 10),
      "backDate": toDate.toISOString().slice(0, 10),
      "adults_num": parseInt(guest),
      "children_ages": parseInt(children)
    });

    // Construct the request body for the hotel
    let hotelParams = JSON.stringify({
      "location": destination.trim(),
      "checkin": fromDate.toISOString().slice(0, 10),
      "checkout": toDate.toISOString().slice(0, 10),
      "adults": parseInt(guest),
      "children": parseInt(children),
      "infants": 0,
      "pets": 0,
    })

    // Construct the request body for the user information
    let userParams = JSON.stringify({
      "title": tripTitle,
      "departure": departure,
      "destination": destination,
      "start_date": fromDate.toISOString().slice(0, 10),
      "end_date": toDate.toISOString().slice(0, 10),
      "duration": duration,
      "number_of_adults": parseInt(guest),
      "number_of_children": parseInt(children),
      "gender": gender,
      "budget": budget
    })



    setProcessing(true); // Start processing animation
    // process the data and send it to the endpoints


    try {
      // Send the request of the itinerary to the endpoints
      const itineraryResponse = await fetch(serverUrl + "itinerary", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: itineraryParams
      });

      // Send the request of the air ticket to the endpoints
      const airTicketResponse = await fetch(serverUrl + "air_ticket", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: airTicketParams
      });

      // Send the request of the hotel to the endpoints
      const hotelResponse = await fetch(serverUrl + "hotel", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: hotelParams
      });

      // Send the request of the user information to the endpoints
      await fetch(serverUrl + "form_logging", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: userParams
      });

      // Check if the response of the itinerary is ok
      if (!itineraryResponse.ok) {
        return itineraryResponse.text().then(text => {
          throw new Error(`HTTP error! status: ${itineraryResponse.status}, body: ${text}`);
        });
      }

      // Check if the response of the air ticket is ok
      if (!airTicketResponse.ok) {
        return airTicketResponse.text().then(text => {
          throw new Error(`HTTP error! status: ${airTicketResponse.status}, body: ${text}`);
        });
      }

      // Check if the response of the hotel is ok
      if (!hotelResponse.ok) {
        return hotelResponse.text().then(text => {
          throw new Error(`HTTP error! status: ${hotelResponse.status}, body: ${text}`);
        });
      }

      // Get the response data
      const [itineraryData, airTicketData, hotelData] = await Promise.all([itineraryResponse.json(), airTicketResponse.json(), hotelResponse.json()]);


      setItineraryData(itineraryData);
      setAirTicketData(airTicketData);
      setHotelData(hotelData);
      navigation.navigate('ResultScreen', {
        newItinerary: true, itineraryData: itineraryData,
        flightData: airTicketData, hotelData: hotelData, origin: flightCodeDeparture,
        destination: flightCodeDestination, tripTitle: tripTitle, location: destination, gender: gender
      });


    } catch (e) {
      console.error(`Fetch error: ${e}`);
      setProcessing(false); // Stop processing animation if error occurs
    }


  };
  // Show the "From" date picker
  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };
  // Show the "To" date picker
  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };
  // Reset the form
  const resetForm = () => {
    setDeparture("");
    setDestination("");
    setGuest("1");
    setChildren("0");
    setFromDate(new Date());
    setToDate(new Date());
    setBudget("");
    setShowFromDatePicker(false);
    setShowToDatePicker(false);
  };


  return (
    <SafeAreaView style={Styles.container1}>
      <TouchableOpacity
        style={{ zIndex: 9999, width: 30, height: 30 }}
        onPress={() => handleReturn()}

      >




        <HomeIcon size={30} style={{
          width: 30,
          height: 30,
          marginLeft: 20,
          zIndex: 9999,

          color: "black"
        }} />

      </TouchableOpacity>


      {/* set the input fields */}
      <View style={Styles.container1}>

        {/* set the icon  */}
        <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 50, marginTop: 10 }}>
          <Image source={require('../assets/images/icon.png')} style={{ width: 180, height: 180, marginTop: 30 }} />
        </View>

        {/* set the title of the trip */}
        <TitleBox
          tripTitle={tripTitle}
          onChangeTripTitle={onChangeTripTitle}
        />

        {/* set the locations  */}
        <LocationBoxes
          departure={departure}
          setDeparture={setDeparture}
          destination={destination}
          setDestination={setDestination}
          filterCities={filterCities}
          renderAutocompleteDeparture={renderAutocompleteDeparture}
          renderAutocompleteDestination={renderAutocompleteDestination}
        />


        {/* set the number of guests */}
        <Adultboxes
          guest={guest}
          setGuest={setGuest} />


        {/* set the number of children */}
        <Childboxes
          children={children}
          setChildren={setChildren} />


        {/* set the date picker From and To */}
        <DatePickers
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          showFromDatePicker={showFromDatePicker}
          setShowFromDatePicker={setShowFromDatePicker}
          showToDatePicker={showToDatePicker}
          setShowToDatePicker={setShowToDatePicker}
          showFromDatepicker={showFromDatepicker}
          showToDatepicker={showToDatepicker}
        />

        {/* set the gender */}
        <GenderPicker
          gender={gender}
          setGender={setGender} />

        {/* set the budget */}
        <BudgetSetter
          setBudget={setBudget}
          budget={budget} />




        {/* set the processing animation */}
        <LoadingAnimation processing={processing} />


        {/* set the search and reset button */}
        <SearchAndResetButtons
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />


      </View>
    </SafeAreaView>
  );
};

export default HomepageScreen;
