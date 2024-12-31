import React, { useEffect } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions(); // Obtém as dimensões da janela para ajuste responsivo

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            justifyContent: "center", // Alinha o conteúdo verticalmente no centro
            alignItems: "center", // Alinha o conteúdo horizontalmente no centro
        }}>
            <Image
                style={{
                    width: width * 0.5, // Ajusta a largura da imagem para ser 50% da largura da tela
                    height: height * 0.1, // Ajusta a altura da imagem para ser 10% da altura da tela
                }}
                source={require('@/assets/images/Logo.svg')} // Caminho para a imagem do logo
            />
        </View>
    );
}