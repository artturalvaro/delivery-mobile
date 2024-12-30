import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Pressable, View, Text, Image, TextInput } from 'react-native';

export default function Index() {

    const router = useRouter();

    const ReturnLogin = () => {
      router.push("/login");
    }

    return (
        <View style={styles.Main}>
            <Pressable style={styles.Back} onPress={ReturnLogin}>
              <Image source={require("@/assets/images/Back.svg")}></Image>
            </Pressable>
            <Text style={styles.Title}>Forgot Password</Text>
            <Text style={styles.Description}>Please sign in to your existing account</Text>
            <View style={styles.Card}>
                <View style={styles.Group}>
                    <Text style={styles.GroupText}>Email</Text>
                    <TextInput
                      style={styles.Input}
                      placeholder="example@gmail.com"
                    />
                </View>
                <Text style={styles.Button}>Send Code</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
        backgroundColor: "#121223",
        height: '100%',
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
});