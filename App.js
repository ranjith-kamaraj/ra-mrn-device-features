import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';
import { init, deleteData } from './screens/utils/database';
import { Colors } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  // if (!dbInitialized) {
  //   return <AppLoading />
  // }


  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={
          {
            headerStyle: {
              backgroundColor: Colors.primary500
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700
            }
          }
        }>
          <Stack.Screen name="AllPlaces" component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Place",
              headerRight: ({ tintColor }) => <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('AddPlaces')}
              />
            })} />
          <Stack.Screen
            name="AddPlaces"
            component={AddPlace}
            options={{ title: 'Add a new place' }} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} setOptions={
           title= "Place Loading..."
          }/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


