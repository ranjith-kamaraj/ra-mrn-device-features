import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import moment from "moment";
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';


function WeatherDetails() {
    const [address, setAddress] = useState("");
    const [locationData, setLocationData] = useState("");
    const [weatherData, setWeatherData] = useState("");

    const navigation = useNavigation();
    const route = useRoute();

    const mapPickedLocation = route.params && {
        latitude: route.params.pickedLatitude,
        longitude: route.params.pickedLongitude
    };

    useEffect(() => {
        if (!isEmpty(mapPickedLocation)) {
            getWeatherDetails(mapPickedLocation.latitude, mapPickedLocation.longitude);
        }
    }, []);


    let MAPBOX_ACCESS_KEY = "pk.eyJ1IjoicmFuaml0aDEiLCJhIjoiY2t2eXduN3R5NHYyaDJ1dGsxN2Y0ZG5yZSJ9.hLoZZpIopfzbuUfS_DptuQ";
    let MAPBOX_BASE_URL = "https://api.mapbox.com";
    let WEATHER_STACK_ACCESS_KEY = "e58ddd22fa7d7b4f3960a2744d1a6c8b";
    let WEATHER_STACK_BASE_URL = "http://api.weatherstack.com";

    function onChangeTestHandler(enteredText) {
        setAddress(enteredText);
    };

    //https://docs.mapbox.com/api/search/geocoding/#endpoints needd to check
    const getLocationDetails = async () => {
        /* Get Location Details */
        let mapBoxUrl = `${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=${MAPBOX_ACCESS_KEY}`;
        const response = await axios.get(mapBoxUrl);


        if (response && response.data && response.data.features.length == 0) {
            Alert.alert('Finding Location', "Unable to find the location service!");
            return
        }

        let longitude = get(response, 'data.features[0].center[0]');
        let latitude = get(response, 'data.features[0].center[1]');
        let placeName = get(response, 'data.features[0].place_name');

        setLocationData({
            longitude,
            latitude,
            placeName
        });

        await getWeatherDetails(latitude, longitude);
    };

    const getWeatherDetails = async (latitude, longitude) => {
        let weatherStackUrl = `${WEATHER_STACK_BASE_URL}/current?access_key=${WEATHER_STACK_ACCESS_KEY}&query=${latitude},${longitude}`;
        let weatherResponse = await axios.get(weatherStackUrl);
        weatherResponse = get(weatherResponse, 'data', "");

        if (weatherResponse.error || (weatherResponse.error && weatherResponse.error.info)) {
            Alert.alert('Fetching Weather', "Unable to find the weather details!");
            return
        };

        let description = get(weatherResponse, 'current.weather_descriptions[0]', '');
        let temperature = get(weatherResponse, 'current.temperature', '');
        let feelsLike = get(weatherResponse, 'current.feelslike', '');
        let humidity = get(weatherResponse, 'current.humidity', '');
        let localTime = get(weatherResponse, 'location.localtime', '');

        setWeatherData({
            description,
            temperature,
            feelsLike,
            humidity,
            localTime
        });
    };

    return (
        <View>
            {/* <Text style={styles.label}>Weather</Text> */}
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={onChangeTestHandler} value={address} />
                <Pressable onPress={getLocationDetails} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                    <FontAwesome5 style={styles.icon} name="search-location" color={Colors.primary500} size={40} />
                </Pressable>
            </View>
            {!isEmpty(weatherData) && <View style={styles.weatherPreview}>
                <Text>Place Name: {locationData.placeName}</Text>
                <Text>Description: {weatherData.description}</Text>
                <Text>Temperature: {weatherData.temperature}° </Text>
                <Text>Feels Like: {weatherData.feelsLike}°</Text>
                <Text>Humitidy: {weatherData.humidity}</Text>
                <Text>Time: {moment.utc(weatherData.localTime).format('LLLL')}</Text>
            </View>}

        </View>

    );
}

export default WeatherDetails;

const styles = StyleSheet.create({
    weatherPreview: {
        width: '100%',
        height: 125,
        borderRadius: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 18,
        paddingHorizontal: 7,
        paddingVertical: 4,
        backgroundColor: Colors.primary100
    },
    image: {
        width: '100%',
        height: '100%'
    },
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
        flex: 3,
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        flex: 1,
        marginVertical: 10
    }
});

