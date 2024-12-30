import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location'; // Para lidar com a geolocalização no React Native
import { useRouter } from 'expo-router';

export default function LocationPermissionScreen() {
  const router = useRouter();

  // Estado para armazenar o status da permissão de localização
  const [locationPermission, setLocationPermission] = useState(null);

  // Função para verificar o status da permissão de localização
  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync(); // Para dispositivos móveis
      if (status === 'granted') {
        setLocationPermission(true); // Permissão concedida
        router.push("/(tabs)"); // Navega para a tela principal
      } else {
        setLocationPermission(false); // Permissão negada
      }
    } catch (error) {
      console.error('Error checking location permission', error);
      setLocationPermission(false);
    }
  };

  // Função para lidar com a solicitação de permissão de localização
  const handleLocationAccess = async () => {
    try {
      // Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        // Se a permissão for concedida, navega para a tela principal
        setLocationPermission(true);
        router.push("/(tabs)");
      } else {
        // Se a permissão for negada ou não concedida, mostra um alerta
        setLocationPermission(false);
        Alert.alert(
          'Permission Denied',
          'You need to allow location access to use this feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission', error);
      setLocationPermission(false);
    }
  };

  // Efeito para verificar a permissão ao carregar a tela
  useEffect(() => {
    checkLocationPermission();
  }, []); // A verificação ocorre apenas uma vez após o carregamento do componente

  return (
    <View style={styles.container}>
      {/* Placeholder para a imagem (pode ser substituída por uma imagem real) */}
      <View style={styles.image}></View>
      
      {/* Botão para solicitar permissão de localização */}
      <Pressable style={styles.button} onPress={handleLocationAccess}>
        <Text style={styles.buttonText}>Access LOCATION</Text>
      </Pressable>
      
      {/* Texto explicativo sobre o acesso à localização */}
      <Text style={styles.text}>
        DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    backgroundColor: '#98A8B8',
    borderRadius: 90,
    width: 206,
    height: 250,
    marginBottom: 90,
  },
  button: {
    backgroundColor: '#FF7622',
    width: 327,
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Sen-Bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    marginTop: 32,
    color: '#646982',
    fontSize: 16,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
  },
});