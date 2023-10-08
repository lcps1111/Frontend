import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, PanResponder, StyleSheet, Image } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../assets/key/google_api_key';

export const MapComponent = ({ mapRef, oriLat, oriLng, destLat, destLng }) => {
    const [viewHeight, setViewHeight] = useState(200);
    const [origin, setOrigin] = useState({
        latitude: oriLat ?? 0,
        longitude: oriLng ?? 0,
    });
    const [destination, setDestination] = useState({
        latitude: destLat ?? 0,
        longitude: destLng ?? 0,
    });

    useEffect(() => {
        setOrigin({
            latitude: oriLat,
            longitude: oriLng,
        });
        setDestination({
            latitude: destLat,
            longitude: destLng,
        });
    }, [oriLat, oriLng, destLat, destLng]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const newHeight = viewHeight + gestureState.dy;
                if (newHeight >= 50 && newHeight <= 500) {
                    setViewHeight(newHeight);
                }
            },
        })
    ).current;

    return (<View style={styles.map}>
        <MapView
            ref={mapRef}
            style={[styles.mapContent, { height: viewHeight }]}
            initialRegion={{
                latitude: oriLat,
                longitude: oriLng,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            }}>{JSON.stringify(origin) !== JSON.stringify(destination)
                // && (
                // <MapViewDirections
                //     origin={origin}
                //     destination={destination}
                //     apikey={GOOGLE_MAPS_APIKEY}
                //     strokeWidth={3}
                //     mode="DRIVING"
                //     onError={(error) => {
                //         console.log("origin", origin, "destination", destination)
                //         console.log(error)
                //         setOrigin(destination);
                //     }}
                //     onReady={result => {
                //         mapRef.current.fitToCoordinates(result.coordinates, {
                //             edgePadding: {
                //                 right: 50,
                //                 bottom: 50,
                //                 left: 50,
                //                 top: 50
                //             }
                //         });
                //     }}
                // />
                // )
            }
            <Marker coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} pinColor={'green'} />
            {JSON.stringify(origin) !== JSON.stringify(destination) && (
                <Marker coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} pinColor={'red'} />)}
        </MapView>
        <View style={styles.draggable} {...panResponder.panHandlers}>
            <Image source={require('../assets/images/drag_bar.png')} resizeMode="contain" />
        </View>

    </View >)
}

export function mapAnimateToRegion(mapRef, lat, lng) {
    mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0051,
    });
}


const styles = StyleSheet.create({
    map: {
        marginBottom: 10,
        backgroundColor: "#f5f5f5",
    },
    mapContent: {
        height: 200,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
    },
    draggable: {
        backgroundColor: "#f5f5f5",
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});