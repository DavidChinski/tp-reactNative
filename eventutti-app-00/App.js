import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';

export default function App() {
  // Estado para controlar el audio
  const [sound, setSound] = useState();

  // Función para cargar y reproducir el audio
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/saludos-127732.mp3')  // Ruta al archivo de audio
    );
    setSound(sound);
    await sound.playAsync();  // Reproduce el audio
  };

  // Función para detener el audio
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();  // Detiene el audio
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenidos!</Text>
      <Image 
        source={require('./assets/saludo.png')}  // Imagen en la carpeta assets
        style={styles.image}
      />
      <Button title="Reproducir Audio" onPress={playSound} />
      <Button title="Detener Audio" onPress={stopSound} />
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
