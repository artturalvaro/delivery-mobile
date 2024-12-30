import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function Index() {
  const [hasVisited, setHasVisited] = useState(false); // Estado que controla se o onboarding foi concluído
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null); // Estado que armazena o status da permissão de localização
  const router = useRouter();

  // Função para verificar o onboarding
  const checkOnboarding = async () => {
    try {
      const onboardingVisited = await AsyncStorage.getItem('OnboardingCompleted');
      // Se o onboarding foi concluído, redireciona para a página de login
      if (onboardingVisited === 'true') {
        setHasVisited(true);
        router.push("/login");
      } else {
        setHasVisited(false);
        router.push("/onboarding");
      }
    } catch (error) {
      console.error('Erro ao verificar o onboarding:', error);
    }
  };

  // Função para verificar o status da permissão de localização
  const checkLocationPermission = async () => {
    try {
      // Verifica o status da permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermissionStatus(true); // Permissão concedida
      } else {
        setLocationPermissionStatus(false); // Permissão negada
        router.push("/location-perm");
      }
    } catch (error) {
      console.error('Erro ao verificar permissão de localização:', error);
    }
  };

  useEffect(() => {
    // Verifica a permissão de localização ao carregar o componente
    checkLocationPermission();
    // Verifica o status do onboarding
    checkOnboarding();
  }, []); // Apenas na montagem do componente

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}