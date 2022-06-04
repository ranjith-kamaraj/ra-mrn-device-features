import * as SQLite from 'expo-sqlite';
import { Place } from '../../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        })
    });

    return promise;
};

export function insertPlace(place) {

    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql('INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
                [
                    place.title,
                    place.imageUri,
                    place.address || "",
                    place.location.latitude || "",
                    place.location.longitude || ""
                ],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log('err' + error);
                    reject(error);
                }
            )
        })
    });

    return promise;
};

export function fetchPlace() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql('SELECT * FROM places',
                [],
                (_, result) => {
                    const places = [];

                    for (const dp of result.rows._array) {
                        places.push(
                            new Place(
                                dp.title,
                                dp.imageUri,
                                {
                                    address: dp.address,
                                    latitude: dp.latitude,
                                    longitude: dp.longitude
                                },
                                dp.id
                            )
                        )
                    };

                    resolve(places);
                },
                (_, error) => {
                    console.log('err' + error);
                    reject(error);
                }
            )
        })
    });

    return promise;
};

export function fetchPlaceDetails(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql('SELECT * FROM places WHERE id = ?',
                [id],
                (_, result) => {
                    let dp = result.rows._array[0];
                    resolve(dp);
                },
                (_, error) => {
                    console.log('err' + error);
                    reject(error);
                }
            )
        })
    });

    return promise;
};
