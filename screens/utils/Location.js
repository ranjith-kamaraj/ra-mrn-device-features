import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export default function Location(props) {
    const { locationDetails } = props;

    

    let region = {
        latitude: locationDetails && locationDetails.latitude,
        longitude: locationDetails && locationDetails.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    return (
        <View style={styles.container}>
            {!isEmpty(locationDetails) && <MapView initialRegion={region} style={styles.map}>
                <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: locationDetails.latitude,
                        longitude: locationDetails.longitude
                        // latitude: 37.78825,
                        // longitude: -122.4324,
                    }}
                />
            </MapView>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 500,
        height: 200,
    },
});