import { useState, useRef, useEffect } from "react";

import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const camera = useRef(null);

  useEffect(() => {
    askCameraPermission();
  }, []);
  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status == "granted");
  };

  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1, minWidth: "100%" }} ref={camera} />
          <Button title="Take Photo" onPress={snap} />
          <View style={{ flex: 1 }}>
            <Image style={{ flex: 1 }} source={{ uri: photoName }} />
            <Image
              style={{ flex: 1 }}
              source={{ uri: `data:image/gif;base64,${photoBase64}` }}
            />
          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
