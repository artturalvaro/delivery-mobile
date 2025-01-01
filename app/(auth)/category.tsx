import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, Modal, View, Text, Image, Pressable } from "react-native";

// Components
import { RestaurantItem } from '@/components/restaurant'
import { ProdutItem } from '@/components/produt'

export default function Index() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [DeliveryTime, setDeliveryTime] = useState(1);
    const [Rating, setRating] = useState(1);
    const [Price, setPrice] = useState(1);
       
    return (
        <ScrollView style={styles.Content}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.Dialog}>
                    <View style={styles.DialogContent}>
                        <View style={styles.DialogHeader}>
                            <Text style={styles.DialogTitle}>Filter your search</Text>
                            <Pressable style={styles.DialogClose} onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                                <Image style={styles.DialogCloseImage} source={require('@/assets/images/Close.svg')}/>
                            </Pressable>
                        </View>
                        <View style={styles.DialogMain}>
                            <View style={styles.DialogSection}>
                                <Text style={styles.DialogText}>Deliver Time</Text>
                                <ScrollView horizontal={true} style={styles.DialogScroll}>
                                    <Pressable style={DeliveryTime == 1 ? styles.DialogTagActive : styles.DialogTag} onPress={() => { setDeliveryTime(1) }}>
                                        <Text style={styles.DialogTagTitle}>0-10m</Text>
                                    </Pressable>
                                    <Pressable style={DeliveryTime == 2 ? styles.DialogTagActive : styles.DialogTag} onPress={() => { setDeliveryTime(2) }}>
                                        <Text style={styles.DialogTagTitle}>10-15m</Text>
                                    </Pressable>
                                    <Pressable style={DeliveryTime == 3 ? styles.DialogTagActive : styles.DialogTag} onPress={() => { setDeliveryTime(3) }}>
                                        <Text style={styles.DialogTagTitle}>15-20m</Text>
                                    </Pressable>
                                    <Pressable style={DeliveryTime == 4 ? styles.DialogTagActive : styles.DialogTag} onPress={() => { setDeliveryTime(4) }}>
                                        <Text style={styles.DialogTagTitle}>20-30m</Text>
                                    </Pressable>
                                </ScrollView>
                            </View>
                            <View style={styles.DialogSection}>
                                <Text style={styles.DialogText}>Pricing</Text>
                                <View style={styles.DialogScroll}>
                                    <Pressable style={Price == 1 ? styles.DialogPriceActive : styles.DialogPrice} onPress={() => { setPrice(1) }}>
                                        <Text style={Price == 1 ? styles.DialogPriceTextActive : styles.DialogPriceText }>$</Text>
                                    </Pressable>
                                    <Pressable style={Price == 2 ? styles.DialogPriceActive : styles.DialogPrice} onPress={() => { setPrice(2) }}>
                                        <Text style={Price == 2 ? styles.DialogPriceTextActive : styles.DialogPriceText }>$$</Text>
                                    </Pressable>
                                    <Pressable style={Price == 3 ? styles.DialogPriceActive : styles.DialogPrice} onPress={() => { setPrice(3) }}>
                                        <Text style={Price == 3 ? styles.DialogPriceTextActive : styles.DialogPriceText }>$$$</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.DialogSection}>
                                <Text style={styles.DialogText}>Rating</Text>
                                <View style={styles.DialogScroll}>
                                    <Pressable style={styles.DialogRating} onPress={() => { setRating(1) }}>
                                        <Image style={styles.DialogRatingImage} source={Rating >= 1 ? require('@/assets/images/RatingActive.svg') : require('@/assets/images/Rating.svg') }/>
                                    </Pressable>
                                    <Pressable style={styles.DialogRating} onPress={() => { setRating(2) }}>
                                        <Image style={styles.DialogRatingImage} source={Rating >= 2 ? require('@/assets/images/RatingActive.svg') : require('@/assets/images/Rating.svg') }/>
                                    </Pressable>
                                    <Pressable style={styles.DialogRating} onPress={() => { setRating(3) }}>
                                        <Image style={styles.DialogRatingImage} source={Rating >= 3 ? require('@/assets/images/RatingActive.svg') : require('@/assets/images/Rating.svg') }/>
                                    </Pressable>
                                    <Pressable style={styles.DialogRating} onPress={() => { setRating(4) }}>
                                        <Image style={styles.DialogRatingImage} source={Rating >= 4 ? require('@/assets/images/RatingActive.svg') : require('@/assets/images/Rating.svg') }/>
                                    </Pressable>
                                    <Pressable style={styles.DialogRating} onPress={() => { setRating(5) }}>
                                        <Image style={styles.DialogRatingImage} source={Rating >= 5 ? require('@/assets/images/RatingActive.svg') : require('@/assets/images/Rating.svg') }/>
                                    </Pressable>
                                </View>
                            </View>
                            <Pressable style={styles.DialogButtom}>
                                <Text style={styles.DialogButtomText}>Filter</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.Header}>
                <View style={styles.HeaderSection}>
                    <Pressable style={styles.Menu} onPress={() => { router.push('/home') }}>
                        <Image source={require('@/assets/images/arrow-left.svg')} />
                    </Pressable>
                    <Pressable style={styles.Dropdown}>
                        <Text style={styles.GroupHeaderTitle}>All <Image source={require('@/assets/images/arrow-bottom2.svg')} /></Text>
                    </Pressable>
                </View>
                <View style={styles.GroupSection}>
                    <View style={styles.Search}><Image style={styles.SearchImage} source={require('@/assets/images/Search.svg')}/></View>
                    <Pressable style={styles.Filter} onPress={() => {
                        setModalVisible(true);
                    }}><Image style={styles.FilterImage} source={require('@/assets/images/Filter.svg')}/></Pressable>
                </View>
            </View>
            <View style={styles.Main}>
                <Text style={styles.Title}>Popular Burgers</Text>
                <View style={styles.Row}>
                    { /* Uid de Teste */ }
                    <ProdutItem title="Burger Bistro" description='Rose garden' price='40' uid='1'/>
                    <ProdutItem title="Smokin' Burger" description='Cafenio Restaurant' price='60' uid='2'/>
                </View>
                <View style={styles.Row}>
                    <ProdutItem title="Smokin' Burger" description='Cafenio Restaurant' price='60' uid='2'/>
                    <ProdutItem title="Burger Bistro" description='Rose garden' price='40' uid='1'/>
                </View>
                <Text style={styles.Title}>Open Resturants</Text>
                <RestaurantItem
                    // image={require('@/assets/images/restaurant2.jpg')}
                    title="Rose Garden Restaurant"
                    tags="Burger - Chicken - Rice - Wings"
                    rating="4.7"
                    price="Free"
                    deliveryTime="30 min"
                    uid='1'
                />
                <RestaurantItem
                    // image={require('@/assets/images/restaurant2.jpg')}
                    title="Rose Garden Restaurant"
                    tags="Burger - Chicken - Rice - Wings"
                    rating="4.7"
                    price="Free"
                    deliveryTime="30 min"
                    uid='2'
                />
                <RestaurantItem
                    // image={require('@/assets/images/restaurant2.jpg')}
                    title="Rose Garden Restaurant"
                    tags="Burger - Chicken - Rice - Wings"
                    rating="4.7"
                    price="Free"
                    deliveryTime="30 min"
                    uid='1'
                />
                <RestaurantItem
                    // image={require('@/assets/images/restaurant2.jpg')}
                    title="Rose Garden Restaurant"
                    tags="Burger - Chicken - Rice - Wings"
                    rating="4.7"
                    price="Free"
                    deliveryTime="30 min"
                    uid='2'
                />
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
        justifyContent: 'space-between',
    },
    HeaderSection: {
        flexDirection: 'row',
    },
    Menu: {
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Dropdown: {
        marginLeft: 16,
        backgroundColor: '#ECF0F4',
        borderRadius: 33,
        justifyContent: 'center',
        width: 102,
        height: 45,
    },
    GroupHeaderTitle: {
        color: '#181C2E',
        fontSize: 12,
        fontFamily: 'Sen-Bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    GroupSection: {
        flexDirection: 'row',
        gap: 7,
    },
    Search: {
        backgroundColor: '#121223',
        width: 46,
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
    },
    SearchImage: {
        margin: 'auto',
    },
    Filter: {
        backgroundColor: '#ECF0F4',
        width: 46,
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
    },
    FilterImage: {
        margin: 'auto',
    },
    Main: {
        marginTop: 16,
        flexDirection: 'column',
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    Title: {
        color: '#32343E',
        fontFamily: 'Sen-Regular',
        fontSize: 20,
        marginBottom: 15,
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
        borderRadius: 12,
        width: 347,
        height: 649,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
    },
    DialogHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    DialogMain: {
        height: 100,
        flexDirection: 'column',
    },
    DialogTitle: {
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 17,
        alignContent: 'center',
        textTransform: 'uppercase',
    },
    DialogClose: {
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        width: 45,
        height: 45,
    },
    DialogCloseImage: {
        margin: 'auto',
    },
    DialogText: {
        color: '#32343E',
        fontFamily: 'Sen-Regular',
        fontSize: 13,
        marginTop: 32,
    },
    DialogSection: {
        flexDirection: 'column',
    },
    DialogScroll: {
        flexDirection: 'row',
    },
    DialogTag: {
        marginTop: 10,
        marginRight: 16,
        backgroundColor: '#FFFFFF',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 50,
        width: 87,
        height: 46,
    },
    DialogTagActive: {
        marginTop: 10,
        backgroundColor: '#F58D1D',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 50,
        marginRight: 16,
        width: 87,
        height: 46,
    },
    DialogTagTitle: {
        color: '#464E57',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
        margin: 'auto',
    },
    DialogPrice: {
        marginTop: 16,
        marginRight: 32,
        backgroundColor: '#FFFFFF',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 50,
        width: 48,
        height: 48,
    },
    DialogPriceActive: {
        marginTop: 16,
        marginRight: 32,
        backgroundColor: '#F58D1D',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 50,
        width: 48,
        height: 48,
    },
    DialogPriceText: {
        margin: 'auto',
        color: '#464E57',
        fontFamily: 'Sen-Regular',
        fontSize: 18,
    },
    DialogPriceTextActive: {
        margin: 'auto',
        color: '#FFFFFF',
        fontFamily: 'Sen-Regular',
        fontSize: 18,
    },
    DialogRating: {
        marginTop: 10,
        marginRight: 16,
        backgroundColor: '#FFFFFF',
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 50,
        width: 48,
        height: 48,
    },
    DialogRatingImage: {
        margin: 'auto',
    },
    DialogButtom: {
        marginTop: 32,
        backgroundColor: '#FF7622',
        borderRadius: 62,
        width: 307,
        height: 62,
    },
    DialogButtomText: {
        margin: 'auto',
        color: '#FFFFFF',
        fontFamily: 'Sen-Bold',
        fontSize: 16,
        textTransform: 'uppercase',
    }
});