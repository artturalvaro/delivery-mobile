import { StyleSheet, Pressable, View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

export default function Login() {
    const { isLoaded, setActive, signIn } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para gerenciar o login
    async function handleSignIn() {
        if (!isLoaded) return; // Garante que o clerk tenha carregado antes de tentar o login

        try {
            // Criação do signIn
            const { createdSessionId } = await signIn.create({
                identifier: email,
                password: password,
            });

            await setActive({ session: createdSessionId });
        } catch (error) {
            console.log('Login failed:', error);
        }
    }

    // Função para criar os campos de entrada
    const renderInputField = (
        label: string, 
        placeholder: string, 
        value: string, 
        onChangeText: (text: string) => void, 
        secureTextEntry: boolean = false
    ) => (
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={label === 'Email' ? 'email-address' : 'default'}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Título da página */}
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.description}>We have sent a code to your email</Text>

            {/* Card contendo o formulário de login */}
            <View style={styles.card}>
                {renderInputField('Email', 'example@gmail.com', email, setEmail)}
                {renderInputField('Password', '12345678', password, setPassword, true)}

                {/* Seção de opções */}
                <View style={styles.optionsSection}>
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxLabel}>Remember me</Text>
                    </View>
                    <Link href="/">
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </Link>
                </View>

                {/* Botão para fazer o login */}
                <Pressable onPress={handleSignIn}>
                    <Text style={styles.loginButton}>Log In</Text>
                </Pressable>

                {/* Link para a página de cadastro */}
                <Text style={styles.signupText}>
                    Don’t have an account? 
                    <Link href="/register">
                        <Text style={styles.signupLink}> Sign Up</Text>
                    </Link>
                </Text>

                {/* Separador visual */}
                <Text style={styles.orText}>Or</Text>

                {/* Grupo de botões sociais */}
                <View style={styles.socialLoginGroup}>
                    <View style={styles.socialIconContainer}>
                        <Image style={styles.socialIcon} source={require('@/assets/images/Apple.svg')} />
                    </View>
                    <View style={styles.socialIconContainer}>
                        <Image style={styles.socialIcon} source={require('@/assets/images/google.png')} />
                    </View>
                    <View style={styles.socialIconContainer}>
                        <Image style={styles.socialIcon} source={require('@/assets/images/twitter.png')} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121223",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: "center",
        marginTop: 80,
        marginBottom: 16,
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 30,
    },
    description: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Sen-Regular",
        fontSize: 16,
        marginBottom: 48,
        opacity: 0.7,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        width: "100%",
        height: 720,
        paddingVertical: 32,
        alignItems: "center",
    },
    inputGroup: {
        width: 327,
        marginBottom: 16,
    },
    inputLabel: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 13,
        textTransform: "uppercase",
    },
    input: {
        marginTop: 16,
        backgroundColor: "#F0F5FA",
        borderRadius: 10,
        width: 327,
        height: 67,
        padding: 16,
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 14,
        textTransform: "lowercase",
    },
    optionsSection: {
        width: 327,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        color: "#7E8A97",
        fontFamily: "Sen-Regular",
        fontSize: 13,
    },
    forgotPassword: {
        color: "#FF7622",
        fontFamily: "Sen-Regular",
        fontSize: 14,
    },
    loginButton: {
        marginTop: 48,
        backgroundColor: "#FF7622",
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
    signupText: {
        marginTop: 16,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },
    signupLink: {
        color: "#FF7622",
        fontFamily: "Sen-Bold",
        fontSize: 14,
        textTransform: "uppercase",
    },
    orText: {
        marginTop: 32,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },
    socialLoginGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 327,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 80,
    },
    socialIconContainer: {
        backgroundColor: "#1B1F2F",
        borderRadius: 50,
        width: 62,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
    },
    socialIcon: {
        width: 23,
        height: 25,
    },
});