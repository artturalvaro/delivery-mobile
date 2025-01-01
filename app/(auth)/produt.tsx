import React from 'react';
import { useRouter,  } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image, Pressable, ImageSourcePropType } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
    const router = useRouter();

    const [size, setSize] = useState(0);
    const [qntd, setQntd] = useState(1);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [priceQntd, setPriceQntd] = useState(price);


    { /* Uid de Teste */ }

    const checkProdut = async () => {
        try {
            let ProdutUid = await AsyncStorage.getItem('ProdutUid');
            
            if(ProdutUid === '1') {
                setTitle('Burger Bistro');
                setDescription('Prosciutto e funghi is a pizza variety that is topped with tomato sauce.');
                setPrice(40);
            } else if(ProdutUid === '2') {
                setTitle('Smokin Burger');
                setDescription('Prosciutto e funghi is a pizza variety that is topped with tomato sauce.');
                setPrice(60);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        checkProdut();
    })
    
    interface IngridentsProps {
        title: string;
        image: ImageSourcePropType;
    }
      
    const IngridentsItem: React.FC<IngridentsProps> = ({ title, image }) => {
        return (
          <View style={styles.Ingridents}>
            <View style={styles.IngridentsContent}>
              <Image
                style={styles.IngridentsImage}
                source={image}
              />
            </View>
            <Text style={styles.IngridentsText}>{title}</Text>
          </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.Content}>

                <View style={styles.Header}>
                    <Pressable style={styles.Menu} onPress={() => { router.push('/home') }}>
                        <Image source={require('@/assets/images/arrow-left.svg')} />
                    </Pressable>
                    <Text style={styles.HeaderTitle}>Details</Text>
                </View>
                <View style={styles.Main}>
                    <View style={styles.ImageContent}>
                        <Image style={styles.Image} />
                        <View style={styles.Favorite}>
                            <Image style={styles.FavoriteImage} source={require('@/assets/images/Favorite.svg')} />
                        </View>
                    </View>
                    <View style={styles.Restaurant}>
                        <Image source={require('@/assets/images/Restaurant.svg')}/>
                        <Text style={styles.RestaurantTitle}>Uttora Coffe House</Text>
                    </View>
                    <Text style={styles.Title}>{title}</Text>
                    <Text style={styles.Description}>{description}</Text>
                    <View style={styles.ReviewSection}>
                        <View style={styles.Review}>
                            <Image source={require('@/assets/images/Star.svg')} style={styles.ReviewImage} />
                            <Text style={styles.ReviewTitleStar}>4.7</Text>
                        </View>
                        <View style={styles.Review}>
                            <Image source={require('@/assets/images/Delivery.svg')} style={styles.ReviewImage} />
                            <Text style={styles.ReviewTitle}>Free</Text>
                        </View>
                        <View style={styles.Review}>
                            <Image source={require('@/assets/images/Clock.svg')} style={styles.ReviewImage} />
                            <Text style={styles.ReviewTitle}>20</Text>
                        </View>
                    </View>
                    <View style={styles.Size}>
                        <Text style={styles.SizeTitle}>Size:</Text>
                        
                        <Pressable style={size == 1 ? styles.SizeBottomActive : styles.SizeBottom} onPress={ () => {
                            setSize(1);
                        }}>
                            <Text style={styles.SizeBottomTitle}>10”</Text>
                        </Pressable>
                        <Pressable style={size == 2 ? styles.SizeBottomActive : styles.SizeBottom} onPress={ () => {
                            setSize(2);
                        }}>
                            <Text style={styles.SizeBottomTitle}>16”</Text>
                        </Pressable>
                        <Pressable style={size == 3 ? styles.SizeBottomActive : styles.SizeBottom} onPress={ () => {
                            setSize(3);
                        }}>
                            <Text style={styles.SizeBottomTitle}>20”</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.Text}>ingridents</Text>
                    <ScrollView style={styles.Scroll} horizontal={true}>
                        <IngridentsItem title='Salt' image={require('@/assets/images/Salt.svg')} />
                        <IngridentsItem title='Chicken' image={require('@/assets/images/Chicken.svg')} />
                        <IngridentsItem title='Onion' image={require('@/assets/images/Onion.svg')} />
                        <IngridentsItem title='Garlic' image={require('@/assets/images/Garlic.svg')} />
                        <IngridentsItem title='Ginger' image={require('@/assets/images/Ginger.svg')} />
                    </ScrollView>
                </View>
            </View>
            <View style={styles.Cart}>
            <View style={styles.CartSection}>
                <Text style={styles.Price}>${priceQntd.toFixed(2)}</Text> {/* Exibe preço com 2 casas decimais */}
                <View style={styles.ButtomQntd}>
                    {/* Botão Subtrair */}
                    <Pressable style={styles.Qntd} onPress={() => {
                            if (qntd === 1) return;
                            const updatedPrice = priceQntd - price;

                            setQntd(qntd - 1);
                            setPriceQntd(updatedPrice); 
                        }}
                    >
                    <Image
                        style={styles.ButtomQntdImage}
                        source={require('@/assets/images/Subtraction.svg')}
                    />
                    </Pressable>

                    {/* Quantidade */}
                    <Text style={styles.TextQnd}>{qntd}</Text>

                    {/* Botão Adicionar */}
                    <Pressable style={styles.Qntd} onPress={() => {
                        if (qntd === 10) return; 
                        const updatedPrice = priceQntd + price;
                        setQntd(qntd + 1);
                        setPriceQntd(updatedPrice);
                    }}
                    >
                    <Image
                        style={styles.ButtomQntdImage}
                        source={require('@/assets/images/Adding.svg')}
                    />
                    </Pressable>
                </View>
                </View>
                <View style={styles.Buy}>
                    <Text style={styles.BuyText}>Add to cart</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
    },
    Header: {
        flexDirection: 'row',
        gap: 16,
    },
    HeaderTitle: {
        alignContent: 'center',
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 17,
    },
    Menu: {
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Main: {
        marginTop: 16,
        flexDirection: 'column',
    },
    ImageContent: {
        position: 'relative',
    },
    Image: {
        backgroundColor: '#98A8B8',
        borderRadius: 32,
        width: 327,
        height: 184,
    },
    Favorite: {
        position: 'absolute',
        backgroundColor:'rgba(255, 255, 255, 0.60)',
        borderRadius: 50,
        width: 37,
        height: 37,
        bottom: 8,
        right: 25,
    },
    FavoriteImage: {
        margin: 'auto',
    },
    Restaurant: {
        marginTop: 16,
        backgroundColor: '#E9E9E9',
        borderRadius: 50,
        width: 201,
        height: 47,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    RestaurantTitle: {
        marginLeft: 7,
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textAlign: 'center',
    },
    Title: {
        marginTop: 16,
        color: '#181C2E',
        fontFamily: 'Sen-Bold',
        fontSize: 20,
    },
    Description: {
        marginTop: 5,
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
    },
    ReviewSection: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 16,
    },
    Review: {
        flexDirection: 'row',
    },
    ReviewTitle: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        margin: 'auto',
        marginLeft: 5,
    },
    ReviewTitleStar: {
        color: '#181C2E',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
        margin: 'auto',
        marginLeft: 5,
    },
    ReviewImage: {
        width: 20,
        height: 20,
        margin: 'auto',
    },
    Size: {
        marginTop: 16,
        marginBottom: 20,
        height: 48,
        flexDirection: 'row',
    },
    SizeTitle: {
        color: '#32343E',
        fontFamily: 'Sen-Regular',
        fontSize: 13,
        textTransform: 'uppercase',
        alignContent: 'center',
        marginRight: 32,
    },
    SizeBottom: {
        backgroundColor: '#F0F5FA',
        borderRadius: 110,
        width: 48,
        height: 48,
        justifyContent: 'center',
        marginRight: 16,
    },
    SizeBottomActive: {
        backgroundColor: '#F58D1D',
        borderRadius: 110,
        width: 48,
        height: 48,
        justifyContent: 'center',
        marginRight: 16,
    },
    SizeBottomTitle: {
        color: '#121223',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
        margin: 'auto',
    },
    Text: {
        color: '#32343E',
        fontFamily: 'Sen-Regular',
        fontSize: 13,
        textTransform: 'uppercase',
    },
    Scroll : {
        flexDirection: 'row',
    },
    Ingridents: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 32,
    },
    IngridentsContent: {
        marginTop: 10,
        backgroundColor: '#FFEBE4',
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    IngridentsImage: {
        margin: 'auto',
    },
    IngridentsText: {
        margin: 'auto',
        color: '#747783',
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    Cart: {
        backgroundColor: '#F0F5FA',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        boxShadow: '3px 3px 35px -17px rgba(0,0,0,0.75)',
        width: '100%',
        height: 184,
        flexDirection: 'column',

        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
    },
    CartSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Price: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 28,
    },
    ButtomQntd: {
        backgroundColor: '#121223',
        borderRadius: 50,
        width: 125,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    Qntd: {
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        borderRadius: 50,
        width: 24,
        height: 24,
    },
    TextQnd: {
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    },
    ButtomQntdImage: {
        margin: 'auto',
    },
    Buy: {
        marginTop: 25,
        backgroundColor: '#FF7622',
        borderRadius: 12,
        width: 327,
        height: 62,
    },
    BuyText: {
        margin: 'auto',
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    }
});