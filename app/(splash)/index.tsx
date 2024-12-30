import React, { useEffect } from 'react'
import { View, Text, Image, useWindowDimensions } from 'react-native'
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    
    useEffect(() => {
        setTimeout(() => {
            router.push("/(tabs)")
        }, 2000);
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        }}>
            <Image style={{
                width: 121,
                height: 59,
            }} source={require('@/assets/images/Logo.svg')}/>
        </View>
    )
}