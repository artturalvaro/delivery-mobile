import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {
    const router = useRouter();

    // Estado para controlar qual slide está ativo
    const [currentSlide, setCurrentSlide] = useState(0);

    // Títulos e descrições dos slides
    const titles = [
        'All your favorites', 
        'Order from chosen chef', 
        'Free delivery offers'
    ];
    
    const descriptions = [
        'Get all your loved foods in one place. You just place the order, and we do the rest.',
        'Order from the chefs you love the most, and enjoy unique meals.',
        'Enjoy exclusive offers for free delivery on your favorite dishes.'
    ];

    // Função para passar para o próximo slide
    const nextSlide = () => {
        if (currentSlide < 2) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    // Função para finalizar o onboarding e redirecionar o usuário
    const finishOnboarding = async () => {
        try {
            // Armazenando a conclusão do onboarding
            await AsyncStorage.setItem('OnboardingCompleted', 'true');
            router.push("/login");  // Redirecionando para login
        } catch (error) {
            console.error('Error while saving onboarding status:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Área para a imagem (placeholder para imagem real) */}
            <View style={styles.image}></View>

            {/* Título do slide atual */}
            <Text style={styles.title}>{titles[currentSlide]}</Text>

            {/* Descrição do slide atual */}
            <Text style={styles.description}>{descriptions[currentSlide]}</Text>

            {/* Indicador de progresso (círculos de navegação) */}
            <View style={styles.slideIndicators}>
                {[0, 1, 2].map((index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator, 
                            currentSlide === index && styles.activeIndicator
                        ]}
                    />
                ))}
            </View>

            {/* Botão para avançar ou finalizar o onboarding */}
            <Pressable 
                style={styles.button} 
                onPress={currentSlide < 2 ? nextSlide : finishOnboarding}
            >
                <Text style={styles.buttonText}>
                    {currentSlide < 2 ? 'Next' : 'Get Started'}
                </Text>
            </Pressable>

            {/* Opção de pular o onboarding */}
            {currentSlide < 2 && (
                <Pressable onPress={finishOnboarding}>
                    <Text style={styles.skipText}>Skip</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    // Placeholder da imagem, pode ser substituída por uma imagem real
    image: {
        backgroundColor: "#98A8B8",
        borderRadius: 12,
        width: 240,
        height: 292,
    },

    // Estilo para o título
    title: {
        marginTop: 32,
        fontFamily: 'Sen-ExtraBold',
        fontSize: 24,
        textAlign: 'center',
    },

    // Estilo para a descrição
    description: {
        width: 324,
        color: "#646982",
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },

    // Estilos para os indicadores de progresso (círculos)
    slideIndicators: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        marginBottom: 32,
    },

    indicator: {
        backgroundColor: "#FFE1CE",
        width: 10,
        height: 10,
        borderRadius: 12,
    },

    activeIndicator: {
        backgroundColor: "#FF7622",
    },

    // Estilos do botão de ação
    button: {
        backgroundColor: "#FF7622",
        width: 327,
        height: 62,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Texto dentro do botão
    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },

    // Estilo do texto para pular o onboarding
    skipText: {
        color: "#646982",
        fontFamily: 'Sen-Regular',
        fontSize: 18,
        marginTop: 8,
    }
});