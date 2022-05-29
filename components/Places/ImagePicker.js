import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, View, Button, Image, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";


function ImagePicker() {
    const [imageUrl, setImageUrl] = useState("");

    const [cameraPermissionInformation, requestPersmission] = useCameraPermissions();

    async function verifyCameraPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPersmission();

            return permissionResponse.granted;
        };

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant camera permissions to use this app.'
            );

            return false;
        };

        return true;
    }


    const takeImageHandler = async () => {
        const hasPermission = await verifyCameraPermissions();
        if (!hasPermission) {
            return;
        };

        const image = await launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [16, 9]
        });

        setImageUrl(image.uri);
    };

    let imagePreview = <Text>No images taken yet.</Text>

    if (imageUrl) {
        imagePreview = <Image style={styles.image} source={{ uri: imageUrl }} />
    };

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    )

};


export default ImagePicker;

const styles =  StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: Colors.primary100
    },
    image: {
        width: '100%',
        height: '100%'
    }
})