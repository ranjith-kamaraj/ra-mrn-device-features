import { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import WeatherDetails from './WeatherDetails';

function PlaceFrom() {
    const [enteredValue, setEnteredValue] = useState("");

    function onChangeTestHandler(enteredText) {
        setEnteredValue(enteredText);
    }

    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>
                Title
            </Text>
            <TextInput style={styles.input} onChangeText={onChangeTestHandler} value={enteredValue} />
        </View>
        <ImagePicker />
        {/* <LocationPicker /> */}
        <WeatherDetails/>
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