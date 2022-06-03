export class Place {
    constructor(title, imageUri, location, id) {

        // console.log('PLace' + JSON.stringify(location));
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { latitude: location.latitude, longitude: location.longitude };
        this.id = id

    }
};