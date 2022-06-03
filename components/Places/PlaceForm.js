import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import WeatherDetails from './WeatherDetails';

function PlaceFrom({onCreatePlace}) {
    const [enteredValue, setEnteredValue] = useState("");
    const [image, setImage] = useState("");
    const [pickedLocation, setPickedLocation] = useState("");

    function onChangeTestHandler(enteredText) {
        setEnteredValue(enteredText);
    };

    function saveImageHandler(imageUri) {
        setImage(imageUri);
    };

    const savePickedLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);


    function saveLocationHandler() {
        console.log('tiltl ---' + enteredValue);
        console.log('image ---' + image);
        console.log('Location ---' + pickedLocation.latitude);
        const placeData = new Place(enteredValue, image, pickedLocation);
        console.log('PLaces Data' + JSON.stringify(placeData))
        onCreatePlace(placeData);
    };

    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>
                Title
            </Text>
            <TextInput style={styles.input} onChangeText={onChangeTestHandler} value={enteredValue} />
        </View>
        <ImagePicker onTakeImage={saveImageHandler} />
        <LocationPicker onPickLocation={savePickedLocationHandler} />
        {/* Quota Exceeded */}
        {/* <WeatherDetails/> */}
        <Button onPress={saveLocationHandler}>Add Place</Button>
    </ScrollView>
}

export default PlaceFrom;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})