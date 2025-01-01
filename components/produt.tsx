import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProdutProps {
    title: string;
    description: string;
    price: string;
    uid: string;
}
      
export const ProdutItem: React.FC<ProdutProps> = ({ title, description, price, uid }) => {
    const router = useRouter();

    async function handleGoProdut() {
        await AsyncStorage.setItem('ProdutUid', uid);
        router.replace('/produt');
    }

    return (
        <Pressable style={styles.Produt} onPress={handleGoProdut}>
            <Image style={styles.ProdutImage} />
            <View style={styles.ProdutContent}>
                <Text style={styles.ProdutTitle}>{title}</Text>
                <Text style={styles.ProdutDescription}>{description}</Text>
                <View style={styles.ProdutSection}>
                <View style={styles.Center}>
                    <Text style={styles.Price}>${price}</Text>
                </View>
                <Pressable style={styles.Cart}>
                    <Image
                    source={require('@/assets/images/Add.svg')}
                    style={styles.CartImage}
                    />
                </Pressable>
                </View>
            </View>
        </Pressable>
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
});