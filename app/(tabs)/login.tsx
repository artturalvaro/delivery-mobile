import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Pressable, View, Text, Image, CheckBox, TextInput } from 'react-native';

export default function Login() {
    // Usando o roteador para navegar entre páginas
    const router = useRouter();
    
    // Estado para controlar o estado do checkbox "Lembrar de mim"
    const [rememberMe, setRememberMe] = useState(false);

    // Função para navegar para a página de "Esqueci a Senha"
    const handleForgotPassword = () => {
        router.push("/forgot");
    }

    // Função para navegar para a página de cadastro
    const handleGoToSignUp = () => {
        router.push("/register");
    }

    return (
        <View style={styles.container}>
            {/* Título da página */}
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.description}>We have sent a code to your email</Text>
            
            {/* Card contendo o formulário de login */}
            <View style={styles.card}>
                {/* Campo de entrada para o Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@gmail.com"
                        keyboardType="email-address"
                    />
                </View>
                
                {/* Campo de entrada para a Senha */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="12345678"
                        secureTextEntry
                    />
                </View>
                
                {/* Seção para checkbox e link para recuperação de senha */}
                <View style={styles.optionsSection}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={rememberMe}
                            onValueChange={setRememberMe} // Altera o estado do checkbox
                        />
                        <Text style={styles.checkboxLabel}>Remember me</Text>
                    </View>
                    
                    {/* Link para a página de "Esqueci a Senha" */}
                    <Pressable onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </Pressable>
                </View>
                
                {/* Botão para fazer o login */}
                <Text style={styles.loginButton}>Log In</Text>

                {/* Link para a página de cadastro */}
                <Text style={styles.signupText}>
                    Don’t have an account? 
                    <Pressable onPress={handleGoToSignUp}>
                        <Text style={styles.signupLink}> Sign Up</Text>
                    </Pressable>
                </Text>

                {/* Separador visual com a palavra "Or" */}
                <Text style={styles.orText}>Or</Text>

                {/* Grupo de botões sociais */}
                <View style={styles.socialLoginGroup}>
                    {/* Ícones de login social (Apple, Google, Twitter) */}
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

// Estilos para os componentes da página
const styles = StyleSheet.create({
    // Contêiner principal com fundo escuro
    container: {
        backgroundColor: "#121223",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Título da página de login
    title: {
        textAlign: "center",
        marginTop: 80,
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

    // Estilo para o card de login
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        width: "100%",
        height: 720,
        paddingVertical: 32,
        alignItems: "center",
    },

    // Grupo de campos de entrada (email, senha)
    inputGroup: {
        width: 327,
        marginBottom: 16,
    },

    // Rótulo do campo de entrada
    inputLabel: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 13,
        textTransform: "uppercase",
    },

    // Estilo dos campos de entrada
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

    // Seção de opções como "Remember me" e "Forgot Password"
    optionsSection: {
        width: 327,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },

    // Estilo do container do checkbox
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    // Estilo do texto do checkbox
    checkboxLabel: {
        color: "#7E8A97",
        fontFamily: "Sen-Regular",
        fontSize: 13,
    },

    // Estilo do link "Forgot Password"
    forgotPassword: {
        color: "#FF7622",
        fontFamily: "Sen-Regular",
        fontSize: 14,
    },

    // Estilo do botão de login
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

    // Estilo do texto para link de "Sign Up"
    signupText: {
        marginTop: 16,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },

    // Estilo do link de "Sign Up"
    signupLink: {
        color: "#FF7622",
        fontFamily: "Sen-Bold",
        fontSize: 14,
        textTransform: "uppercase",
    },

    // Estilo para o separador "Or"
    orText: {
        marginTop: 32,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },

    // Grupo para os ícones sociais
    socialLoginGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 327,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 80,
    },

    // Estilo para o contêiner de ícones sociais
    socialIconContainer: {
        backgroundColor: "#1B1F2F",
        borderRadius: 50,
        width: 62,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
    },

    // Estilo para os ícones de redes sociais
    socialIcon: {
        width: 23,
        height: 25,
    },
});