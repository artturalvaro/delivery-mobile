import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, View, Text, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const router = useRouter();
    const [isEdit, setEdit] = useState(false);

    interface CartItem {
        title: string;
        price: number;
        size: string;
        qntd: number;
    }
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [ priceCart, setPriceCard ] = useState(90); //Preco ficticio

    useEffect(() => {
        // Carrega os itens do carrinho ao montar o componente
        const loadCart = async () => {
            const storedCart = await AsyncStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        };
        loadCart();
        updatePrice();
    }, []);

    const saveCart = async (items: CartItem[]) => {
        await AsyncStorage.setItem('cart', JSON.stringify(items));
        setCartItems(items);
    };

    const removeItem = (index: number) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        saveCart(updatedCart);
    };

    const updateQuantity = (index: number, delta: number) => {
        const updatedCart = cartItems.map((item, i) => {
            if (i === index) {
                return { ...item, qntd: Math.max(1, Math.min(10, item.qntd + delta)) }; // Garante que a quantidade seja no mínimo 1
            }
            return item;
        });
        saveCart(updatedCart);
    };

    //Atualiza o preco do carrinho
    const updatePrice = () => {

    }

    const ItemList = ({ item, index } : { item: { title: string, price: number, size: string, qntd: number }, index: number }) => (
        <View style={styles.List}>
            <Image style={styles.ListImage} />
            <View style={styles.ListContent}>
                <View style={styles.ListHeader}>
                    {isEdit ? (
                        <View style={styles.ListRow}>
                            <Text style={styles.ListTitle}>{item.title}</Text>
                            <Pressable style={styles.ListClose} onPress={() => removeItem(index)}>
                                <Image style={styles.ListCloseImage} source={require('@/assets/images/Close.svg')} />
                            </Pressable>
                        </View>
                    ) : (
                        <Text style={styles.ListTitle}>{item.title}</Text>
                    )}
                    <Text style={styles.ListPrice}>${item.price}</Text>
                </View>
                <View style={styles.ListFooter}>
                    <View style={styles.ListSection}>
                        <Text style={styles.ListSize}>{item.size}'</Text>
                        <View style={styles.ListQntd}>
                            <Pressable style={styles.ListQntdButtom} onPress={() => updateQuantity(index, -1)}>
                                <Image style={styles.ListQntdButtomImage} source={require('@/assets/images/Subtraction.svg')} />
                            </Pressable>
                            <Text style={styles.ListQntdText}>{item.qntd}</Text>
                            <Pressable style={styles.ListQntdButtom} onPress={() => updateQuantity(index, 1)}>
                                <Image style={styles.ListQntdButtomImage} source={require('@/assets/images/Adding.svg')} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.Content}>
            <View style={styles.Header}>
                <View style={styles.HeaderSection}>
                    <Pressable style={styles.Menu} onPress={() => router.push('/home')}>
                        <Image source={require('@/assets/images/arrow-left.svg')} />
                    </Pressable>
                    <Text style={styles.HeaderTitle}>Cart</Text>
                </View>
                <Pressable style={styles.Edit} onPress={() => setEdit(!isEdit)}>
                    <Text style={isEdit ? styles.EditTextActive : styles.EditText}>
                        {isEdit ? 'Done' : 'Edit Items'}
                    </Text>
                </Pressable>
            </View>
            <ScrollView style={styles.Main}>
                {cartItems.map((item, index) => (
                    <ItemList key={index} item={item} index={index} />
                ))}
            </ScrollView>
            <View style={styles.Cart}>
                <View style={styles.CartHeader}>
                    <View style={styles.CartSectionHeader}>
                        <Text style={styles.CartHeaderText}>Delivery Address</Text>
                        <Text style={styles.CartHeaderEdit}>Edit</Text>
                    </View>
                    <Pressable style={styles.CartHeaderAddress}>
                        <Text style={styles.CartAddressText}>2118 Thornridge Cir. Syracuse</Text>
                    </Pressable>
                    <View style={styles.CartSectionPrice}>
                        <Text style={styles.CartPrice}>Total: <Text style={styles.CartPriceNumber}>${priceCart}</Text></Text>
                        <Pressable>
                            <Text style={styles.CartText}>Breadkdown</Text>
                        </Pressable>
                    </View>
                    <Pressable style={styles.CartBuy} onPress={() => {
                        router.replace('/payment');
                    }}>
                        <Text style={styles.CartBuyText}>Place ORder</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContent: {
        flexDirection: 'column',
    },
    Content: {
        backgroundColor: '#adadad',
        flex: 1,
    },
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
    },
    HeaderSection: {
        flexDirection: 'row',
        gap: 16,
    },
    HeaderTitle: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 17,
        margin: 'auto',
    },
    Menu: {
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Edit: {
        justifyContent: 'center',
    },
    EditText: {
        color: '#FF7622',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
    EditTextActive: {
        color: '#059C6A',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
    Main: {
        marginTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
    List: {
        flexDirection: 'row',
        width: 327,
        height: 117,
        marginBottom: 16,
    },
    ListImage: {
        backgroundColor: '#98A8B8',
        borderRadius: 25,
        width: 136,
        height: 117,
    },
    ListContent: {
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        width: 190,
    },
    ListHeader: {
        height: 95,
    },
    ListRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ListClose: {
        backgroundColor: '#E04444',
        borderRadius: 50,
        width: 27,
        height: 27,
    },
    ListCloseImage: {
        margin: 'auto',
    },
    ListFooter: {
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListTitle: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 18,
    },
    ListPrice: {
        color: '#181C2E',
        fontFamily: 'Sen-Bold',
        fontSize: 20,
    },
    ListSection: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    ListSize: {
        color: 'rgba(24, 28, 46, 0.50)',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    ListQntd: {
        flexDirection: 'row',
        height: '100%',
        gap: 7,
    },
    ListQntdText: {
        color: '#181C2E',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    },
    ListQntdButtom: {
        backgroundColor: 'rgba(24, 28, 46, 0.20)',
        borderRadius: 50,
        width: 22,
        height: 22,
    },
    ListQntdButtomImage: {
        margin: 'auto',
    },
    Cart: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25, 
        width: 375,
        height: 310,
    },
    CartHeader: {
        marginTop: 16,
        paddingLeft: 29,
        paddingRight: 29,
    },
    CartSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CartHeaderText: {
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    CartHeaderEdit: {
        color: '#FF7622',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
    CartHeaderAddress: {
        marginTop: 16,
        backgroundColor: '#F0F5FA',
        borderRadius: 10,
        width: 327,
        height: 62,
        justifyContent: 'center',
    },
    CartAddressText: {
        color: 'rgba(50, 52, 62, 0.50)',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
        marginLeft: 16,
    },
    CartSection: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CartSectionPrice: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CartPrice: {
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
    },
    CartPriceNumber: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 30,
    },
    CartText: {
        color: '#FF7622',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'lowercase',
        textDecorationLine: 'underline',
        margin: 'auto',
    },
    CartBuy: {
        marginTop: 32,
        backgroundColor: '#FF7622',
        borderRadius: 12,
        width: 327,
        height: 62,
    },
    CartBuyText: {
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 'auto',
    }
});