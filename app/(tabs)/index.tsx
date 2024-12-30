import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [hasVisited, setHasVisited] = useState(false);
  const router = useRouter();

  const checkOnboarding = async () => {
    try {
      const OnboardingVisited = await AsyncStorage.getItem('OnBoarding');
      if(OnboardingVisited === 'true') {
        setHasVisited(true);
        router.push("/login")
      }
      else {
        setHasVisited(false);
        router.push("/onborading");
      }
    } catch (error) {
      console.error('Error:', error)
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
}