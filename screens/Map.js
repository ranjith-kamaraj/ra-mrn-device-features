import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';

import IconButton from '../components/UI/IconButton';


export default function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState("");

    let region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    function selectLocationHandler(event) {
        console.log('Event' + JSON.stringify(event.nativeEvent));

        let latitude = get(event, 'nativeEvent.coordinate.latitude', '');
        let longitude = get(event, 'nativeEvent.coordinate.longitude', '');

        setSelectedLocation({
            latitude,
            longitude
        })
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'No Location Picked!',
                'You have to pick a location first!'
            );

            return;
        }
        navigation.navigate('AddPlaces', {
            pickedLatitude: selectedLocation.latitude,
            pickedLongitude: selectedLocation.longitude
        });
    }, [navigation, selectedLocation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton 
                icon="save" 
                size={24} 
                color="blue" 
                onPress={savePickedLocationHandler} />
            ),
        });
    }, [navigation, savePickedLocationHandler]);

    return (
        <View style={styles.container}>
            <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
                {!isEmpty(selectedLocation) && <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude
                    }}
                />}
            </MapView>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});