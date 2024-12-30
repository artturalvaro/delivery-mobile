import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Pressable, View, Text, Image, TextInput } from 'react-native';

export default function SignUp() {
    // Usando o roteador para navegação
    const router = useRouter();

    // Função para voltar à tela de login
    const handleGoBackToLogin = () => {
        router.push("/login");
    }

    return (
        <View style={styles.container}>
            {/* Botão de voltar para a tela de login */}
            <Pressable style={styles.backButton} onPress={handleGoBackToLogin}>
                <Image source={require("@/assets/images/Back.svg")} />
            </Pressable>

            {/* Título e descrição */}
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.description}>Please sign up to get started</Text>

            {/* Formulário de cadastro */}
            <View style={styles.formCard}>
                {/* Campo para nome */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                    />
                </View>

                {/* Campo para email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@gmail.com"
                        keyboardType="email-address"
                    />
                </View>

                {/* Campo para senha */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="**********"
                        secureTextEntry
                    />
                </View>

                {/* Campo para reescrever a senha */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Re-Type Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="**********"
                        secureTextEntry
                    />
                </View>

                {/* Botão para enviar o código */}
                <Text style={styles.submitButton}>Send Code</Text>
            </View>
        </View>
    );
}

// Estilos para a tela de Sign Up
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121223",  // Cor de fundo escura
        height: '100%',  // Altura da tela completa
        justifyContent: 'flex-start',  // Alinha os elementos no topo
    },

    // Estilo para o botão de voltar
    backButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        width: 35,
        height: 35,
        marginTop: 50,
        marginLeft: 23,
        justifyContent: "center",
        alignItems: "center",
    },

    // Título da página
    title: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 16,
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 30,
    },

    // Descrição abaixo do título
    description: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Sen-Regular",
        fontSize: 16,
        marginBottom: 48,
        opacity: 0.7,
    },

    // Estilo para o formulário de cadastro
    formCard: {
        backgroundColor: "#FFFFFF",  // Fundo branco do formulário
        borderRadius: 24,
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: 32,
    },

    // Grupo para cada campo de entrada
    inputGroup: {
        width: 327,
        height: 86,
        marginBottom: 16,
    },

    // Rótulo de cada campo de entrada (Nome, Email, etc.)
    inputLabel: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 13,
        textTransform: "uppercase",
    },

    // Estilo para os campos de entrada (TextInput)
    input: {
        marginTop: 16,
        backgroundColor: "#F0F5FA",  // Fundo claro para os inputs
        borderRadius: 10,
        width: 327,
        height: 67,
        padding: 16,
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 14,
        textTransform: "lowercase",
    },

    // Estilo para o botão "Send Code"
    submitButton: {
        marginTop: 48,
        backgroundColor: "#FF7622",  // Cor laranja para o botão
        borderRadius: 12,
        width: 327,
        height: 62,
        padding: 22,
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 16,
        textTransform: "uppercase",
    },
});
