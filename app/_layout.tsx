import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { tokenCache } from '@/cache'
import { useAuth, ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if(!isLoaded) return;
    const inAuthGroup = segments[0] === "(auth)"

    console.log('User', isSignedIn);

    if(isSignedIn && !inAuthGroup) {
      router.replace("/home");
    } else if(!isSignedIn) {
      router.replace("/onboarding");
    }

  }, [isSignedIn]);

  return <Slot/>
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Sen-Regular': require('../assets/fonts/Sen-Regular.ttf'),
    'Sen-Bold': require('../assets/fonts/Sen-Bold.ttf'),
    'Sen-ExtraBold': require('../assets/fonts/Sen-ExtraBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishKey}>
      <ClerkLoaded>
        <InitialLayout/>
      </ClerkLoaded>
    </ClerkProvider>
  )
}