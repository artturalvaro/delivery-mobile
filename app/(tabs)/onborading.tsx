import React, { useState, useRef } from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Boarding() {
    const router = useRouter();

    const [ellipse, setEllipse] = useState(0);
    const title = ['All your favorites' , 'Order from choosen chef', 'Free delivery offers'];
    const description = ['Get all your loved foods in one once place, you just place the orer we do the rest', 'Get all your loved foods in one once place, you just place the orer we do the rest', 'Get all your loved foods in one once place, you just place the orer we do the rest'];

    const nextStep = () => {
        if (ellipse < 2) {
            setEllipse(ellipse + 1);
        }
    };

    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem('OnBoarding', 'true');
            router.push("/(tabs)");
        } catch (error) {
            console.error('Erro ao marcar como visitado:', error);
        }
    };

    return (
        <View style={styles.Main}>
        <View style={styles.Image}></View>
            <Text style={styles.Title}>{title[ellipse]}</Text>
            <Text style={styles.Description}>{description[ellipse]}</Text>
            <View style={styles.Slide}>
                {[0, 1, 2].map((index) => (
                    <View
                    key={index}
                    style={[
                        styles.Ellipse,
                        ellipse === index && styles.EllipseActive,  // Troca de cor para o círculo ativo
                    ]}
                    />
                ))}
            </View>
            <Text style={styles.Button} onPress={ellipse < 2 ? nextStep : finishOnboarding}>{ellipse < 2 ? 'Next' : 'Get Started'}</Text>
            {ellipse < 2 && (
                <TouchableOpacity
                    onPress={nextStep}
                >
                <Text style={styles.Skip} onPress={finishOnboarding}>Skip</Text>
                </TouchableOpacity>
            )}
        </View>
     )
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: 16,
    },
    Image: {
        backgroundColor: "#98A8B8",
        borderRadius: 12,
        width: 240,
        height: 292,
    },
    Title: {
        marginTop: 32,
        fontFamily: 'Sen-ExtraBold',
        fontSize: 24,
    },
    Description: {
        width: 324,
        color: "#646982",
        fontSize: 16,
        textAlign: 'center',
    },
    Slide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        marginBottom: 32,
    },
    Ellipse: {
        backgroundColor: "#FFE1CE",
        width: 10,
        height: 10,
        borderRadius: 12,
    },
    EllipseActive: {
        backgroundColor: "#FF7622",
        width: 10,
        height: 10,
        borderRadius: 12,
    },
    Button: {
        backgroundColor: "#FF7622",
        width: 327,
        height: 62,
        borderRadius: 12,

        padding: 23,
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
    Skip: {
        color: "#646982",
        fontFamily: 'Sen-Regular',
        fontSize: 18,
    }
});