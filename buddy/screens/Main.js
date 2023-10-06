import React from "react";
import { SafeAreaView, View, Image, TouchableOpacity, Text } from "react-native";
import { ArrowRightCircleIcon } from "react-native-heroicons/solid";
import { clearAll } from '../service/dataService';
import Styles from '../Styles';

// this is the main page of the app, including the start your trip button and view existing itinerary button
const Main = ({ navigation }) => {
  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require('../assets/images/icon.png')}
          style={{ width: 180, height: 180, marginBottom: 135, bottom: 70 }} />

        <Text style={{ fontWeight: "bold", fontSize: 25, color: "black", marginTop: 16 }} onPress={clearAll}>
          Design your perfect trip!
        </Text>
        <Text style={{ fontSize: 15, color: "grey", marginTop: 8 }} >
          Tell me what are your considerations
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#B00326",
            width: 200,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 32,
            flexDirection: "row", // Use row direction to place icon and text side by side.
          }}
          onPress={() => navigation.navigate("HomepageScreen")}
        >
          <ArrowRightCircleIcon size={30} color="white" />
          <Text style={{ color: "white", marginRight: 51, fontWeight: "bold" }}>Start Your Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#B00326",
            width: 200,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "space-evenly", // Use row direction to place icon and text side by side.s
            marginTop: 32,
            flexDirection: "row", // Use row direction to place icon and text side by side.
          }}
          onPress={() => navigation.navigate("ListItinerayScreen")}
        >
          <ArrowRightCircleIcon size={30} color="white" />
          <Text style={{ color: "white", fontWeight: "bold" }}>View Existing Itinerary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};


export default Main;
