import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';

import IconButton from '../components/UI/IconButton';


export default function Map({ navigation, route }) {
    const initialLocation =  route.params && {
        latitude: route.params.initialLat,
        longitude: route.params.initialLng
    };
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);


    let region = {
        latitude: initialLocation && initialLocation.latitude ||  37.78,
        longitude: initialLocation && initialLocation.longitude ||  -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    function selectLocationHandler(event) {
        if(initialLocation){
            return;
        };
        
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

if(initialLocation){
    return;
}
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="save"
                    size={24}
                    color="blue"
                    onPress={savePickedLocationHandler} />
            ),
        });
    }, [navigation, savePickedLocationHandler, initialLocation]);

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