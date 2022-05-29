import { StyleSheet, View, Alert, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useNavigation } from "@react-navigation/native";

/* Google Map API Key Needed so daisabling for now */
function LocationPicker() {
    const [locationPermissionInformation, requestPersmission] = useForegroundPermissions();

    const { navigate } = useNavigation();

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

    async function pickOnMapHandler() {
        navigate("Map");
    };

    return (
        <View>
            {/* <View style={styles.mapPreview}></View> */}
            <Text style={styles.weather}>Weather Details</Text>
            <View style={styles.actions}>
                {/* <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton> */}
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick On Map</OutlinedButton>
                <Text style={styles.option}>Or</Text>
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