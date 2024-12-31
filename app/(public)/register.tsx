import { StyleSheet, Pressable, View, Text, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUp() {
    const { isLoaded, setActive, signUp } = useSignUp();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailCodePending, setIsEmailCodePending] = useState(false);
    const [verificationCode, setVerificationCode] = useState<{
        [key: string]: string;
    }>({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    });
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    // Função para registrar o usuário
    const handleSignUp = async () => {
        if (!isLoaded) {
            console.log('Sign-up not ready');
            return;
        }

        try {
            await signUp.create({
                firstName: name,
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setIsEmailCodePending(true);
            console.log('User created, verification pending');
        } catch (e) {
            console.log(e);
        }
    };

    // Efeito para controlar o timer
    useEffect(() => {
        if (secondsLeft === 0) {
            setIsTimerActive(false);
            return;
        }

        if (isTimerActive) {
            const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [secondsLeft, isTimerActive]);

    // Função para reiniciar o contador do timer
    const handleResendCode = () => {
        setSecondsLeft(60);
        setIsTimerActive(true);
    };

    // Função para voltar para a tela de login
    const handleGoBackToLogin = () => {
        router.push("/login");
    };

    // Função para verificar o código de email
    const handleVerifyUser = async () => {
        if (!isLoaded) return;

        const code = Object.values(verificationCode).join('');
        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({ code });
            await setActive({ session: completeSignup.createdSessionId });
        } catch (e) {
            console.log(e);
        }
    };

    // Renderiza os campos de verificação de código
    const renderVerificationInputs = () => (
        <View style={styles.Group}>
            {['code1', 'code2', 'code3', 'code4', 'code5', 'code6'].map((codeKey) => (
                <TextInput
                    key={codeKey}
                    style={styles.Input}
                    placeholder="0"
                    maxLength={1}
                    keyboardType="numeric"
                    value={verificationCode[codeKey]}
                    onChangeText={(text) =>
                        setVerificationCode((prevState) => ({
                            ...prevState,
                            [codeKey]: text,
                        }))
                    }
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {isEmailCodePending ? (
                <View>
                    <Text style={styles.Title}>Verification</Text>
                    <Text style={styles.Description}>Please enter the verification code sent to your email</Text>

                    <View style={styles.Card}>
                        <View style={styles.Section}>
                            <Text style={styles.SectionText}>Code</Text>
                            <Text>
                                <Pressable
                                    style={styles.Resend}
                                    onPress={handleResendCode}
                                    disabled={isTimerActive}
                                >
                                    Resend
                                </Pressable>
                                in {secondsLeft > 0 ? `${secondsLeft} sec` : '0 sec'}
                            </Text>
                        </View>

                        {renderVerificationInputs()}

                        <Pressable style={styles.Button} onPress={handleVerifyUser}>
                            <Text style={styles.ButtonText}>Verify Code</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View>
                    <Pressable style={styles.backButton} onPress={handleGoBackToLogin}>
                        <Image source={require("@/assets/images/Back.svg")} />
                    </Pressable>

                    <Text style={styles.title}>Sign Up</Text>
                    <Text style={styles.description}>Please sign up to get started</Text>

                    <View style={styles.formCard}>
                        {['Name', 'Email', 'Password'].map((field, index) => (
                            <View key={index} style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>{field}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={field === 'Password' ? '**********' : field === 'Email' ? 'example@gmail.com' : 'John Doe'}
                                    secureTextEntry={field === 'Password'}
                                    keyboardType={field === 'Email' ? 'email-address' : 'default'}
                                    value={field === 'Name' ? name : field === 'Email' ? email : password}
                                    onChangeText={field === 'Name' ? setName : field === 'Email' ? setEmail : setPassword}
                                />
                            </View>
                        ))}

                        <Pressable style={styles.submitButton} onPress={handleSignUp}>
                            <Text style={styles.submitButtonText}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121223",
        height: '100%',
        justifyContent: 'flex-start',
    },
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
    title: {
        textAlign: "center",
        marginTop: 30,
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
    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: 32,
    },
    inputGroup: {
        width: 327,
        height: 86,
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
    },
    submitButton: {
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
    submitButtonText: {
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
    },
    Title: {
        textAlign: "center",
        marginTop: 80,
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
        gap: 12,
        marginTop: 16,
        justifyContent: "center",
    },
    Input: {
        width: 42,
        height: 42,
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
        alignItems: "center",
    },
    ButtonText: {
        color: "#FFFFFF",
        fontFamily: "Sen-Bold",
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
    },
});