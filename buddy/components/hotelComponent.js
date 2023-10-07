import { Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Linking, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import { LinkIcon } from "react-native-heroicons/solid";
import { Dimensions } from 'react-native';
import { clickLogger } from "../components/logging";

// Get device width and height
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const handleLinkPress = (linkUrl) => {
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

export const renderHotel = (hotel, index, numResults, gender) => {
    if (index < numResults) {
        return (

            <Animatable.View animation="fadeInUp" duration={500} style={[styles.HotelContainer, { backgroundColor: '#F4F4F4', borderWidth: 2 }]}>
                <Text style={styles.HotelText}>{hotel.name}</Text>
                <Animatable.View animation="bounceIn" duration={1000} style={[styles.Hotel2Container, { backgroundColor: "#F4F4F4" }]}>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Total Amount:</Text> HKD{parseFloat(hotel.price.total).toLocaleString()}
                    </Text>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Location:</Text> {hotel.address}
                    </Text>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Number of Bedrooms:</Text> {hotel.bedrooms}
                    </Text>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Number of Bathrooms:</Text> {hotel.bathrooms}
                    </Text>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Amenities:</Text> {hotel.previewAmenities}
                    </Text>
                    <Text style={styles.activityDescription}>
                        <Text style={{ fontWeight: 'bold', color: '#333333' }}>Rental Type:</Text> {hotel.type}
                    </Text>
                    <ScrollView pagingEnabled decelerationRate='fast' horizontal showsHorizontalScrollIndicator={false} style={{ zIndex: 9999 }}>
                        {hotel.images.map((image, index) => (
                            <Image
                                key={`${image}-${index}`}
                                resizeMode="contain"
                                style={styles.imageStyle}
                                source={{ uri: image }}
                            />
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => {
                        handleLinkPress(hotel.deeplink);
                        clickLogger("accommodation", gender)
                    }}>
                        <Animatable.View
                            animation="bounceIn"
                            duration={1000}
                            style={[
                                styles.activityContainer,
                                { flexDirection: 'row', alignItems: 'center' }
                            ]}
                        >
                            <LinkIcon size={20} color="#B00326" />
                            <Text style={styles.clickLink}> Click for details </Text>
                        </Animatable.View>
                    </TouchableOpacity >

                </Animatable.View>
            </Animatable.View>

        );
    }
    else {
        return null;
    }
};

const styles = StyleSheet.create({


    dayContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",

    },

    Hotel2Container: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    activityDescription: {
        fontSize: 14,
        marginBottom: 10,
        color: "#666",
    },
    clickLink: {
        fontSize: 15,
        color: "#666",
        marginTop: 5,
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
        borderColor: '#ddd'
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
    imageStyle: {
        width: windowWidth - 84,  // adjust to your desired padding
        height: windowHeight * 0.4,  // you can adjust this percentage as needed
    },
});