import { StyleSheet, View, Alert } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

/* Google Map API Key Needed so daisabling for now */
function LocationPicker() {
    const [locationPermissionInformation, requestPersmission] = useForegroundPermissions();

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
        console.log('test' + location);
    };

    async function pickOnMapHandler() { };

    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick On Map</OutlinedButton>
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
    actions: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    }
});