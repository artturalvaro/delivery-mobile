import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, CheckBox } from 'react-native';

export default function Index() {

    const [checkbox, setCheckbox] = useState(false);

    return (
        <View style={styles.Main}>
            <Text style={styles.Title}>Log In</Text>
            <Text style={styles.Description}>Please sign in to your existing account</Text>
            <View style={styles.Card}>
                <View style={styles.Group}>
                    <Text style={styles.GroupText}>Email</Text>
                    <TextInput
                        style={styles.Input}
                        placeholder="example@gmail.com"
                    />
                </View>
                <View style={styles.Group}>
                    <Text style={styles.GroupText}>Password</Text>
                    <TextInput
                        style={styles.Input}
                        placeholder="12345678"
                    />
                </View>
                <View style={styles.Section}>
                    <View style={styles.Checkbox}>
                        <CheckBox
                            value={checkbox}
                            onValueChange={setCheckbox}
                        />
                        <Text style={styles.CheckBoxText}>Remember me</Text>
                    </View>
                    <Text style={styles.Forgot}>Forgot Password</Text>
                </View>
                <Text style={styles.Button}>Log In</Text>
                <Text style={styles.Text}>Don’t have an account? <Text style={styles.Sign}>Sign Up</Text></Text>
                <Text style={styles.Or}>Or</Text>
                <View style={styles.SocialGroup}>
                    <View style={styles.Apple}>
                        <Image style={styles.IconApp} source={require('@/assets/images/Apple.svg')}></Image>
                    </View>
                    <View style={styles.Google}>
                        <Image style={styles.IconApp} source={require('@/assets/images/google.png')}></Image>
                    </View>
                    <View style={styles.X}>
                        <Image style={styles.IconApp} source={require('@/assets/images/twitter.png')}></Image>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
        backgroundColor: "#121223",
        height: '100%',
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
    },
    Card: {
        backgroundColor: "#FFFFFF",
        height: '100%',
        borderRadius: 24,
        alignItems: "center",
        paddingTop: 32,
    },
    Group: {
        width: 327,
        height: 86,
        marginBottom: 16,
    },
    GroupText: {
        color: "#32343E",
        fontFamily: "Sen-Regular",
        fontSize: 13,
        textTransform: "uppercase",
    },
    Input: {
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
    Section: {
        width: 327,
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    Checkbox: {
        flexDirection: "row",
        gap: 7,
    },
    CheckBoxText: {
        color: "#7E8A97",
        fontFamily: "Sen-Regular",
        fontSize: 13,
    },
    Forgot: {
        color: "#FF7622",
        fontFamily: "Sen-Regular",
        fontSize: 14,
    },
    Button: {
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
    Text: {
        marginTop: 16,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },
    Sign: {
        color: "#FF7622",
        fontFamily: "Sen-Bold",
        fontSize: 14,
        textTransform: "uppercase",
    },
    Or: {
        marginTop: 32,
        color: "#646982",
        fontFamily: "Sen-Regular",
        fontSize: 16,
    },
    SocialGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 327,
        alignItems: "center",
        marginTop: 16,
    },
    Apple: {
        backgroundColor: "#1B1F2F",
        borderRadius: 510,
        width: 62,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
    },
    Google: {
        backgroundColor: "#1a1a1a",
        borderRadius: 510,
        width: 62,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
    },
    X: {
        backgroundColor: "#F0F5FA",
        borderRadius: 510,
        width: 62,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px #b5b8bb",
    },
    IconApp: {
        width: 23,
        height: 25,
    }
});