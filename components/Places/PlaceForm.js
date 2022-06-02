import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import WeatherDetails from './WeatherDetails';

function PlaceFrom() {
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
        setPickedLocation('final' + JSON.stringify(location));
    }, []);


    function saveLocationHandler() {
        console.log('call' + enteredValue, image, pickedLocation);
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