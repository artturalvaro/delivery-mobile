import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, ScrollView, Pressable, View, Text, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from 'crypto-js';

export default function Page() {
    const secretKey = 'mySecretKey12345';

    const router = useRouter();
    const [isAddCard, setAddCard] = useState(false);
    const [isFilter, setFilter] = useState('cash');
    const [price, setPrice] = useState(90);
    const [cardUid, setCardUid] = useState(0);

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpire, setCardExpire] = useState('');
    const [cardCode, setCardCode] = useState('');

    interface Card {
        id: number;
        cardHolderName: string;  // Nome do titular
        cardNumber: string;      // Número do cartão
        expirationDate: string;  // Data de expiração (formato MM/AA)
        securityCode: string;    // Código de segurança (CVV)
        type: string;            // Tipo do cartão (Visa, MasterCard, etc.)
    }
    
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        loadCards();
    }, []);

    const encryptData = (data: Card[], secretKey: string): string => {
        const dataString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(dataString, secretKey).toString(); // Criptografando com AES
        return encrypted;
    };

    const decryptData = (encryptedData: string, secretKey: string): Card[] => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey); // Descriptografando com AES
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convertendo de volta para UTF-8
        return JSON.parse(decryptedData);
    };

    const loadCards = async () => {
        try {
            const storedCards = await AsyncStorage.getItem('cards');
            if (storedCards) {
                const decrypted = decryptData(storedCards, secretKey); // Descriptografando os dados
                setCards(decrypted); // Atualizando o estado com os cartões descriptografados
            }
        } catch (error) {
            console.error('Erro ao carregar os cartões:', error);
        }
    };

    const getCardType = async (cardNumber: string): Promise<string> => {
        const bin = cardNumber.slice(0, 6); // Primeiros 6 dígitos do número do cartão
        const response = await fetch(`https://lookup.binlist.net/${bin}`);
        
        if (response.ok) {
            const data = await response.json();
            return data.scheme || 'Unknown'; // Retorna o tipo do cartão, como "Visa", "MasterCard", etc.
        } else {
            throw new Error('Erro ao buscar tipo do cartão');
        }
    };

    const saveCard = async (card: Card): Promise<void> => {
        try {
            const updatedCards = [...cards, card];
            const encrypted = encryptData(updatedCards, secretKey); // Criptografando os dados
            await AsyncStorage.setItem('cards', encrypted); // Salvando no AsyncStorage
            setCards(updatedCards); // Atualizando o estado com o novo cartão
        } catch (error) {
            console.error('Erro ao salvar o cartão:', error);
        }
    };

    const handleAddCard = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!cardName || !cardNumber || !cardExpire || !cardCode) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return;
        }
    
        try {
            // Chama a função getCardType, aguardando a resolução da Promise
            const cardType = await getCardType(cardNumber);
    
            const newCard: Card = {
                id: cards.length + 1,
                cardHolderName: cardName,
                cardNumber: cardNumber,
                expirationDate: cardExpire,
                securityCode: cardCode,
                type: cardType, // Atribui o valor resolvido de cardType
            };
    
            // Salva o novo cartão
            saveCard(newCard);
            Alert.alert("Cartão adicionado", `Novo cartão ${newCard.type} adicionado com sucesso.`);
        } catch (error) {
            // Caso ocorra algum erro ao buscar o tipo do cartão
            Alert.alert("Erro", "Não foi possível identificar o tipo do cartão.");
        }
    };

    const filteredCards = cards.filter(card => card.type === isFilter);

    interface CartOptionProps {
        title: string;
        type: string;
    }
    
    const CartOptionItem: React.FC<CartOptionProps> = ({ title, type }) => (
        <Pressable style={styles.GroupPaySection} onPress={() => setFilter(type)}>
            <View style={isFilter === type ? styles.GroupPayActive : styles.GroupPay}>
                <Image
                    style={styles.GroupPayImage}
                    source={
                        type === "Visa"
                            ? require("@/assets/images/Visa.svg")
                            : type === "Master Card"
                                ? require("@/assets/images/MasterCard.svg")
                                : type === "Paypal"
                                    ? require("@/assets/images/Paypal.svg")
                                    : require("@/assets/images/Cash.svg")
                    }
                />
            </View>
            <Text style={styles.GroupPayText}>{title}</Text>
        </Pressable>
    );

    interface CartProps {
        finalNumber: string;
        id: number;
    }

    const CartItem: React.FC<CartProps> = ({ finalNumber, id }) => (
        <Pressable
            style={cardUid === id ? styles.CardActive : styles.Card}
            onPress={() => setCardUid(id)}
        >
            <Text style={styles.CardTitle}>{isFilter}</Text>
            <View style={styles.CardSection}>
                <Image source={require("@/assets/images/MastercardCard.svg")} />
                <Text style={styles.CardSecurityNumber}>*************</Text>
                <Text style={styles.CardNumber}>{finalNumber}</Text>
            </View>
        </Pressable>
    );

    // Função para pegar os últimos 4 dígitos do número do cartão
    const getLastFourDigits = (cardNumber: string): string => {
        return cardNumber.slice(-4);
    };

    // Função para formatar o número do cartão
    const formatCardNumber = (input: string) => {
        // Remover qualquer caractere que não seja número
        const cleaned = input.replace(/\D/g, '');

        // Adicionar espaços a cada 4 dígitos
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formatted;
    };

    const handleCardNumberChange = (input: string) => {
        // Limita o número de caracteres a 16 (cartão de crédito padrão)
        if (input.length <= 19) {
            const formattedInput = formatCardNumber(input);
            setCardNumber(formattedInput);
        }
    };

    const formatCardExpire = (input: string) => {
        // Remove qualquer caractere que não seja número
        let cleaned = input.replace(/\D/g, '');
        
        // Limita a 6 caracteres (2 para o mês e 4 para o ano)
        if (cleaned.length > 6) {
          cleaned = cleaned.slice(0, 6);
        }
    
        // Adiciona a barra (/) após os 2 primeiros caracteres (meses)
        if (cleaned.length >= 3) {
          cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 6)}`;
        }
    
        return cleaned;
    };

    const handleCardExpireChange = (input: string) => {
        const formattedInput = formatCardExpire(input);
        setCardExpire(formattedInput);
    };

    return (
        <View style={styles.Content}>
            {isAddCard ? (
                <View>
                    <View style={styles.Header}>
                        <View style={styles.HeaderSection}>
                            <Pressable style={styles.Menu} onPress={() => { setAddCard(false); } }>
                                <Image source={require("@/assets/images/Close.svg")} />
                            </Pressable>
                            <Text style={styles.HeaderTitle}>Add Card</Text>
                        </View>
                    </View>
                    <View style={styles.Main}>
                        <View style={styles.AddCardSection}>
                            <Text style={styles.AddCardSectionText}>Card Holder Name</Text>
                            <TextInput style={styles.AddCardSectionInput} />
                        </View>
                        <View style={styles.AddCardSection}>
                            <Text style={styles.AddCardSectionText}>Card Number</Text>
                            <TextInput
                            style={styles.AddCardSectionInput}
                            keyboardType="number-pad"
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            maxLength={19} // Limite de 19 caracteres (16 dígitos + 3 espaços)
                            />
                        </View>
                        <View style={styles.AddCardSection2}>
                            <View style={styles.AddCardSection}>
                                <Text style={styles.AddCardSectionText}>Expiration Date</Text>
                                <TextInput
                                style={styles.AddCardSectionInput2}
                                keyboardType="number-pad"
                                value={cardExpire}
                                onChangeText={handleCardExpireChange}
                                maxLength={7} // Limite de 7 caracteres para o formato MM/YYYY
                                placeholder="MM/YYYY"
                                />
                            </View>
                            <View style={styles.AddCardSection}>
                                <Text style={styles.AddCardSectionText}>CVC</Text>
                                <TextInput style={styles.AddCardSectionInput2} keyboardType="number-pad" placeholder="***"/>
                            </View>
                        </View>
                        <Pressable style={styles.Button} onPress={handleAddCard}>
                            <Text style={styles.ButtonText}>Add & Make Payment</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.Header}>
                        <View style={styles.HeaderSection}>
                            <Pressable style={styles.Menu} onPress={() => router.push("/cart")}>
                                <Image source={require("@/assets/images/arrow-left.svg")} />
                            </Pressable>
                            <Text style={styles.HeaderTitle}>Payment</Text>
                        </View>
                    </View>
                    <View style={styles.Main}>
                        <ScrollView horizontal={true} style={styles.MainSection}>
                            <CartOptionItem title="Cash" type="Cash" />
                            <CartOptionItem title="Visa" type="Visa" />
                            <CartOptionItem title="MasterCard" type="Master Card" />
                            <CartOptionItem title="Paypal" type="Paypal" />
                        </ScrollView>
                        {isFilter !== "cash" && (
                            <ScrollView style={styles.CardList}>
                                {filteredCards.length > 0 ? (
                                    filteredCards.map((card) => (
                                        <CartItem key={card.id} finalNumber={getLastFourDigits(card.cardNumber)} id={card.id} />
                                    ))
                                ) : (
                                    <View style={styles.NoCard}>
                                        <Image
                                            style={styles.NoCardImage}
                                            source={require("@/assets/images/NoCard.svg")}
                                        />
                                        <Text style={styles.NoCardTitle}>
                                            No {isFilter} added
                                        </Text>
                                        <Text style={styles.NoCardDescription}>
                                            Add a card to save it for later use.
                                        </Text>
                                    </View>
                                )}
                                <Pressable style={styles.NoCardButton} onPress={() => { setAddCard(true) }}>
                                    <Image source={require("@/assets/images/AddCard.svg")} />
                                    <Text style={styles.NoCardButtonTitle}>Add New</Text>
                                </Pressable>
                            </ScrollView>
                        )}
                        <View style={styles.PriceSection}>
                            <Text style={styles.TextPrice}>total:</Text>
                            <Text style={styles.TextPriceNumber}>${price}</Text>
                        </View>
                        <Pressable style={styles.Button}>
                            <Text style={styles.ButtonText}>Pay & Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Content: {
        backgroundColor: '#FFFFFF',
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
    Main: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
    },

    // Add Card
    AddCardSection: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    AddCardSectionText: {
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    AddCardSectionInput: {
        marginTop: 10,
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        borderRadius: 10,

        paddingLeft: 10,
        color: 'rgba(50, 52, 62, 0.90)',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    AddCardSection2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        height: '80%',
    },
    AddCardSectionInput2: {
        marginTop: 10,
        width: 150,
        height: 62,
        backgroundColor: '#F0F5FA',
        borderRadius: 10,

        paddingLeft: 10,
        color: 'rgba(50, 52, 62, 0.90)',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },

    // Main
    MainSection: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    MainSectionCash: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: '100%',
    },
    GroupPaySection: {
        flexDirection: 'column',
        marginRight: 16,
        marginBottom: 16,
    },
    GroupPay: {
        backgroundColor: '#F0F5FA',
        borderRadius: 9,
        width: 85,
        height: 72,
    },
    GroupPayActive: {
        borderColor: '#FF7622',
        borderWidth: 2,
        backgroundColor: '#F0F5FA',
        borderRadius: 9,
        width: 85,
        height: 72,
    },
    GroupPayText: {
        margin: 'auto',
        color: '#464E57',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
    },
    GroupPayImage: {
        margin: 'auto',
    },
    NoCard: {
        width: 327,
        height: 257,
        backgroundColor: '#F7F8F9',
        borderRadius: 10,
        alignItems: 'center',
    },
    NoCardImage: {
        width: 200,
        height: 117,
    },
    NoCardTitle: {
        marginTop: 16,
        color: '#32343E',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    },
    NoCardDescription: {
        marginTop: 5,
        textAlign: 'center',
        color: '#2D2D2D',
        fontFamily: 'Sen-Regular',
        fontSize: 15,
        width: 266,
    },
    NoCardButton: {
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        borderColor: '#F0F5FA',
        borderWidth: 1,
        borderRadius: 10,
        width: 327,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 7,
    },
    NoCardButtonTitle: {
        color: '#FF7622',
        fontFamily: 'Sen-Bold',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    CardList: {
        height: 410,
    },
    Card: {
        width: 327,
        height: 82,
        backgroundColor: '#F4F5F7',
        borderRadius: 10,
        paddingLeft: 20,
        justifyContent: 'center',
        marginBottom: 16,
    },
    CardActive: {
        width: 327,
        height: 82,
        backgroundColor: '#F4F5F7',
        borderColor: '#FF7622',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 20,
        justifyContent: 'center',
        marginBottom: 16,
    },
    CardTitle: {
        color: '#32343E',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
    },
    CardSection: {
        flexDirection: 'row',
        marginTop: 5,
    },
    CardSecurityNumber: {
        color: 'rgba(50, 52, 62, 0.50)',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 3,
    },
    CardNumber: {
        color: '#32343E',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    PriceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginTop: 32,
    },
    TextPrice: {
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
    },
    TextPriceNumber: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 30,
    },
    Button: {
        marginTop: 32,
        backgroundColor: '#FF7622',
        borderRadius: 62,
        width: 327,
        height: 62,
    },
    ButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
        textTransform: 'uppercase',
        fontSize: 14,
        margin: 'auto',
    }
});