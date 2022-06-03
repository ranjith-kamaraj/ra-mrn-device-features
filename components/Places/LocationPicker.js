import { StyleSheet, View, Alert, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import axios from 'axios';
import { isEmpty, get } from "lodash";


import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Location from "../../screens/utils/Location";


/* Google Map API Key Needed so daisabling for now */
function LocationPicker(props) {
    const [locationPermissionInformation, requestPersmission] = useForegroundPermissions();
    const [mapPickedLocation, setMapPickedLocation] = useState({});

    const { navigate } = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params) {
            setMapPickedLocation({
                latitude: route.params.pickedLatitude,
                longitude: route.params.pickedLongitude
            })
        }
    }, [route, isFocused]);

    const getAddressDetails = async (mapPickedLocation) => {
        /* Get Location Details */
        const {latitude, longitude } = mapPickedLocation || {};
        let mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoicmFuaml0aDEiLCJhIjoiY2t2eXduN3R5NHYyaDJ1dGsxN2Y0ZG5yZSJ9.hLoZZpIopfzbuUfS_DptuQ`;
        const response = await axios.get(mapBoxUrl);
        let placeName = get(response, 'data.features[0].place_name', '');
    
       return placeName;
    };

    useEffect(() => {
        async function handleLocation() {
            if(!isEmpty(mapPickedLocation)){
                let address = await getAddressDetails(mapPickedLocation);
                props.onPickLocation({...mapPickedLocation, address});   
            }    
         }
         handleLocation();
    }, [mapPickedLocation, props.onPickLocation]);

    
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPersmission();

            return permissionResponse.granted;
        };

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant location permissions to use this app.'
            );

            return false;
        };

        return true;
    };

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        // if (!hasPermission) {
        //     return;
        // };

        const location = await getCurrentPositionAsync();
    };

    async function pickOnMapHandler() {
        navigate("Map");
    };

    return (
        <View>
            <View style={styles.mapPreview}>
                <Location
                    locationDetails={mapPickedLocation}
                />
            </View>
            {/* <Text style={styles.weather}>Weather Details</Text> */}
            <View style={styles.actions}>
                {/* <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton> */}
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick On Map</OutlinedButton>
                {/* <Text style={styles.option}>Or</Text> */}
            </View>
        </View>
    )
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: Colors.primary100
    },
    weather: {
        margin: 10,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary500

    },
    option: {
        color: 'white',
        marginLeft: 150
    }
});