import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; // solo importamos ImagePicker

export default function App() {
  const [sound, setSound] = useState();
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/saludos-127732.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Necesitas permiso para usar la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) { // Ojo: es 'canceled', no 'cancelled'
      setCapturedPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenidos!</Text>
      <Image 
        source={require('./assets/saludo.png')}
        style={styles.image}
      />
      <Button title="Reproducir Audio" onPress={playSound} />
      <Button title="Detener Audio" onPress={stopSound} />
      <Button title="Abrir Cámara" onPress={openCamera} />

      {capturedPhoto && (
        <Image
          source={{ uri: capturedPhoto }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2CADF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
