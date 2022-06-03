import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlace } from "./utils/database";

function AllPlaces({ route }) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces (){
            let places = await fetchPlace();
            setLoadedPlaces(places);
        }
        if (isFocused) {
            // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
            loadPlaces();
        }
    }, [isFocused])

    return (
        <PlacesList places={loadedPlaces} />
    )
}

export default AllPlaces;