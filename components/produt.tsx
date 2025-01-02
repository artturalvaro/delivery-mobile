import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, Modal, Text, View, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from "react-native-svg";

interface ProdutProps {
    title: string;
    description: string;
    price: string;
    uid: string;
}
      
export const ProdutItem: React.FC<ProdutProps> = ({ title, description, price, uid }) => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    async function handleGoProdut() {
        await AsyncStorage.setItem('ProdutUid', uid);
        router.replace('/produt');
    }

    const addToCart = async () => {
        try {
            const product = { title, price: price, size: 10, qntd:  1 };
            const storedCart = await AsyncStorage.getItem('cart');
            const cartItems = storedCart ? JSON.parse(storedCart) : [];
            cartItems.push(product);
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.Dialog}>
                    <View style={styles.DialogContent}>
                        <View style={styles.DialogImage}>
                            <View style={styles.DialogImage2}>
                                <Svg
                                    viewBox="0 0 32 32"
                                    style={{ fill: "#48DB71" }}
                                >
                                    <Path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
                                </Svg>
                            </View>
                        </View>
                        <Text style={styles.DialogTitle}>Sucess!</Text>
                        <Text style={styles.DialogDescription}>Item added to cart</Text>
                        <Pressable style={styles.DialogButton} onPress={() => { setModalVisible(false); }}>
                            <Text style={styles.DialogButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable style={styles.Produt} onPress={handleGoProdut}>
                <Image style={styles.ProdutImage} />
                <View style={styles.ProdutContent}>
                    <Text style={styles.ProdutTitle}>{title}</Text>
                    <Text style={styles.ProdutDescription}>{description}</Text>
                    <View style={styles.ProdutSection}>
                    <View style={styles.Center}>
                        <Text style={styles.Price}>${price}</Text>
                    </View>
                    <Pressable style={styles.Cart} onPress={addToCart}>
                        <Image
                        source={require('@/assets/images/Add.svg')}
                        style={styles.CartImage}
                        />
                    </Pressable>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    Produt: {
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        width: 153,
        height: 150,
        boxShadow: '1px 1px 25px -17px rgba(0,0,0,0.75)',
        paddingLeft: 16,
    },
    ProdutImage: {
        backgroundColor: '#98A8B8',
        borderRadius: 15,
        width: 122,
        height: 84,
        position: 'absolute',
        top: -30,
    },
    ProdutContent: {
        position: 'absolute',
        top: 70,
    },
    ProdutTitle: {
        color: '#32343E',
        fontFamily: 'Sen-Bold',
        fontSize: 15,
    },
    ProdutDescription: {
        marginTop: 3,
        color: '#646982',
        fontFamily: 'Sen-Regular',
        fontSize: 13,
    },
    ProdutSection: {
        marginTop: 11,
        width: 122,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Center: {
        justifyContent: 'center',
    },
    Price: {
        color: '#32343E',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    },
    Cart: {
        backgroundColor: '#F58D1D',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    CartImage: {
        margin: 'auto',
    },

    // Dialog
    Dialog: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    },
    DialogContent: {
        backgroundColor: '#FFFFFF',
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 230,
        height: 230,
    },
    DialogImage: {
        width: 40,
        height: 40,
        margin: 0,
        borderRadius: 50,
        boxShadow: '0 0 0 2px #48DB71',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DialogImage2: {
        width: 25,
        height: 25,
    },
    DialogTitle: {
        fontFamily: 'Sen-Bold',
        fontSize: 24,
    },
    DialogDescription: {
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    DialogButton: {
        marginTop: 16,
        backgroundColor: '#000',
        boxShadow: '0 0 0 2px #000 inset',
        borderRadius: 10,
        height: 40,
        width: 150,
    },
    DialogButtonText: {
        fontFamily: 'Sen-Regular',
        fontSize: 20,
        margin: 'auto',
        color: '#FFFFFF',
    }
});