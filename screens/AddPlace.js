import { View, Text } from 'react-native';
import PlaceFrom from '../components/Places/PlaceForm';
import { insertPlace } from './utils/database';

function AddPlace({ navigation }) {
    async function createPlaceHandler(place) {
    
        await insertPlace(place);
        navigation.navigate('AllPlaces')
    };

    return <PlaceFrom onCreatePlace={createPlaceHandler} />

};

export default AddPlace;