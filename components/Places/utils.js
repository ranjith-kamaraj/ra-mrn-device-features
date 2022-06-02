import axios from 'axios';
import { get } from 'lodash';

const getAddressDetails = async (mapPickedLocation) => {
    debugger;
    console.log('calling')
    /* Get Location Details */
    const {latitude, longitude } = mapPickedLocation || {};
    let mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latitude},${longitude}.json?access_token=pk.eyJ1IjoicmFuaml0aDEiLCJhIjoiY2t2eXduN3R5NHYyaDJ1dGsxN2Y0ZG5yZSJ9.hLoZZpIopfzbuUfS_DptuQ`;
    const response = await axios.get(mapBoxUrl);
    let placeName = get(response, 'data.features[0].place_name', '');

   return placeName;
};


export default {
    getAddressDetails
};