import { View, Text } from 'react-native';
import PlaceFrom from '../components/Places/PlaceForm';

function AddPlace({ navigation }) {
    function createPlaceHandler(place) {
        navigation.navigate('AllPlaces', {
            place: place
        })
    };

    return <PlaceFrom onCreatePlace={createPlaceHandler} />

};

export default AddPlace;