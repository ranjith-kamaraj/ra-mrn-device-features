import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';


function PlaceList({ places }) {
    if (!places || places.length == 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet!</Text>
            </View>
        )
    }

    return (<FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} />}
    />)

}

export default PlaceList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})