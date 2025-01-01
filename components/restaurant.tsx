import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, Text, View, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RestaurantItem {
    // image: ImageSourcePropType;  // Tipo adequado para imagens
    title: string;
    tags: string;
    rating: string;
    deliveryTime: string;
    price: string;
    uid: string;
}

export const RestaurantItem: React.FC<RestaurantItem> = ({ title, tags, rating, price, deliveryTime, uid }) => {
     const router = useRouter();

    async function handleGoRestaurant() {
        await AsyncStorage.setItem('RestaurantUid', uid);
        router.replace('/restaurant');
    }

    return (
        <Pressable style={styles.RestaurantItem} onPress={handleGoRestaurant}>
        <Image style={styles.RestaurantImage} />
        <Text style={styles.RestaurantTitle}>{title}</Text>
        <Text style={styles.RestaurantTags}>{tags}</Text>
        <View style={styles.ReviewSection}>
            <View style={styles.Review}>
            <Image source={require('@/assets/images/Star.svg')} style={styles.ReviewImage} />
            <Text style={styles.ReviewTitleStar}>{rating}</Text>
            </View>
            <View style={styles.Review}>
            <Image source={require('@/assets/images/Delivery.svg')} style={styles.ReviewImage} />
            <Text style={styles.ReviewTitle}>{price}</Text>
            </View>
            <View style={styles.Review}>
            <Image source={require('@/assets/images/Clock.svg')} style={styles.ReviewImage} />
            <Text style={styles.ReviewTitle}>{deliveryTime}</Text>
            </View>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    RestaurantItem: {
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'column',
    },
    RestaurantImage: {
        width: 327,
        height: 137,
        backgroundColor: '#98A8B8',
        borderRadius: 10,
    },
    RestaurantTitle: {
        marginTop: 10,
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 20,
    },
    RestaurantTags: {
        marginTop: 5,
        color: '#A0A5BA',
        fontSize: 14,
        fontFamily: 'Sen-Regular',
    },
    ReviewSection: {
        marginTop: 7,
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
});