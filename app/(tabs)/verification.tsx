import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Pressable, View, Text, Image, TextInput } from 'react-native';

export default function Verification() {
    const router = useRouter();

    // Estado para o tempo restante da contagem regressiva
    const [secondsLeft, setSecondsLeft] = useState(60);
    // Estado para controlar se o timer está ativo ou não
    const [timerActive, setTimerActive] = useState(true);

    // Função para retornar ao registro de conta
    const navigateToRegister = () => {
        router.push("/register");
    };

    // Efeito para controlar a contagem regressiva
    useEffect(() => {
        // Quando o tempo acaba, o timer é desativado
        if (secondsLeft === 0) {
            setTimerActive(false);
            return;
        }

        // Se o timer estiver ativo, a contagem regressiva continua
        if (timerActive) {
            const timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000); 

            // Limpa o intervalo ao desmontar ou quando o tempo terminar
            return () => clearInterval(timer);
        }
    }, [secondsLeft, timerActive]);

    // Função para resetar o contador e reativar o timer
    const handleResendClick = () => {
        setSecondsLeft(60); // Resetar para 60 segundos
        setTimerActive(true); // Reativar o timer
    };

    return (
        <View style={styles.Main}>
            {/* Botão de voltar para a tela de registro */}
            <Pressable style={styles.Back} onPress={navigateToRegister}>
                <Image source={require("@/assets/images/Back.svg")} />
            </Pressable>

            {/* Título e descrição da tela */}
            <Text style={styles.Title}>Verification</Text>
            <Text style={styles.Description}>Please sign in to your existing account</Text>

            {/* Card contendo os campos de verificação */}
            <View style={styles.Card}>
                <View style={styles.Section}>
                    <Text style={styles.SectionText}>Code</Text>
                    <Text>
                        {timerActive ? (
                            <Pressable style={styles.Resend} onPress={handleResendClick} disabled>
                                Resend
                            </Pressable>
                        ) : (
                            <Pressable style={styles.Resend} onPress={handleResendClick}>
                                Resend
                            </Pressable>
                        )}
                        in. {secondsLeft > 0 ? `${secondsLeft} sec` : '0 sec'}
                    </Text>
                </View>

                {/* Inputs para o código de verificação */}
                <View style={styles.Group}>
                    <TextInput style={styles.Input} placeholder='0' maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.Input} placeholder='0' maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.Input} placeholder='0' maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.Input} placeholder='0' maxLength={1} keyboardType="numeric" />
                </View>

                {/* Botão para enviar o código */}
                <Pressable style={styles.Button}>
                    <Text style={styles.ButtonText}>Send Code</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Main: {
        backgroundColor: "#121223",
        height: '100%',
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
    },
    Back: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        width: 35,
        height: 35,
        marginTop: 50,
        marginLeft: 23,
        justifyContent: "center",
        alignItems: "center",
    },
    Title: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 16,
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 30,
    },
    Description: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Sen-Regular",
        fontSize: 16,
        marginBottom: 48,
        opacity: 0.7,
    },
    Card: {
        backgroundColor: "#FFFFFF",
        width: '100%',
        height: 720,
        borderRadius: 24,
        alignItems: "center",
        paddingTop: 22,
        paddingBottom: 16,
    },
    Section: {
        width: 327,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    SectionText: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 13,
        textTransform: "uppercase",
    },
    Resend: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 14,
        textDecorationLine: "underline",
        marginRight: 5,
    },
    Group: {
        width: 327,
        flexDirection: "row",
        gap: 32,
        marginTop: 16,
    },
    Input: {
        width: 62,
        height: 62,
        color: "#32343E",
        backgroundColor: "#F0F5FA",
        borderRadius: 10,
        fontFamily: "Sen-Bold",
        fontSize: 16,
        textAlign: "center",
    },
    Button: {
        marginTop: 48,
        backgroundColor: "#FF7622",
        borderRadius: 12,
        width: 327,
        height: 62,
        justifyContent: "center",
        alignItems: "center", // Centraliza o conteúdo
    },
    ButtonText: {
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
    },
});