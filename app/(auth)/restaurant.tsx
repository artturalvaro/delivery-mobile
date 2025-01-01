import React from 'react';
import { useRouter,  } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image, Pressable, ImageSourcePropType } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProdutItem } from '@/components/produt';

export default function index() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [TagFilter, setTagFilter] = useState('');
    const [TagUid, setTagUid] = useState('0');
    const [TagTitle, setTagTitle] = useState('All');

    const checkRestaurant = async () => {
        try {
            let ProdutUid = await AsyncStorage.getItem('RestaurantUid');
            
            if(ProdutUid === '1') {
                setTitle('Spicy restaurant');
                setDescription('Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.')
                setTagFilter('40');
            } else if(ProdutUid === '2') {
                setTitle('Smokin Burger');
                setDescription('Prosciutto e funghi is a pizza variety that is topped with tomato sauce.');
                setTagFilter('40');
            }
        } catch (e) {
            console.log(e);
        }
    };

    interface KeywordProps {
        title: string;
        tagUid: string;
        filter: string;
    }
      
    const TagsItem: React.FC<KeywordProps> = ({ title, tagUid, filter }) => (
        <Pressable style={TagUid === tagUid ? styles.TagActive : styles.Tag} onPress={() => {
            if(TagUid === tagUid) {
                setTagUid('0');
                setTagTitle('All');
                setTagFilter('20');
            } else { 
                setTagUid(tagUid);
                setTagTitle(title);
                setTagFilter(filter);
            }
        }}>
          <Text style={styles.TagTitle}>{title}</Text>
        </Pressable>
    );

    useEffect(() => {
        checkRestaurant();
    })

    return (
        <ScrollView>
            <View style={styles.Content}>

                <View style={styles.Header}>
                    <View style={styles.HeaderSection}>
                        <Pressable style={styles.Menu} onPress={() => { router.push('/home') }}>
                            <Image source={require('@/assets/images/arrow-left.svg')} />
                        </Pressable>
                        <Text style={styles.HeaderTitle}>Restaurant View</Text>
                    </View>
                    <Pressable style={styles.Option}>
                        <Image style={styles.OptionImage} source={require('@/assets/images/More.svg')} />
                    </Pressable>
                </View>
                <View style={styles.Main}>
                    <Image style={styles.RestaurantImage} />
                    <Text style={styles.RestaurantTitle}>{title}</Text>
                    <Text style={styles.RestaurantDescription}>{description}</Text>
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
                    <ScrollView style={styles.TagSection} horizontal={true}>
                        <TagsItem title='Buger' tagUid='1' filter='22'/>
                        <TagsItem title='Sandwich' tagUid='2' filter='3'/>
                        <TagsItem title='Pizza' tagUid='3' filter='15'/>
                        <TagsItem title='Sandwich' tagUid='4' filter='3'/>
                    </ScrollView>
                    <View style={styles.Produts}>
                    <Text style={styles.ProdutsTitle}>
                        {TagTitle} ({TagFilter})
                    </Text>
                    <View style={styles.Row}>
                            { /* Uid de Teste */ }
                            <ProdutItem title="Burger Bistro" description='Rose garden' price='40' uid='1'/>
                            <ProdutItem title="Smokin' Burger" description='Cafenio Restaurant' price='60' uid='2'/>
                        </View>
                        <View style={styles.Row}>
                            { /* Uid de Teste */ }
                            <ProdutItem title="Burger Bistro" description='Rose garden' price='40' uid='1'/>
                            <ProdutItem title="Smokin' Burger" description='Cafenio Restaurant' price='60' uid='2'/>
                        </View>
                    </View>
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
        justifyContent: 'space-between'
    },
    HeaderSection: {
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
    Option: {
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        width: 45,
        height: 45,
    },
    OptionImage: {
        margin: 'auto',
    },
    Main: {
        marginTop: 16,
        flexDirection: 'column',
    },
    RestaurantImage: {
        width: 327,
        height: 137,
        backgroundColor: '#98A8B8',
        borderRadius: 32,
    },
    RestaurantTitle: {
        marginTop: 10,
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 20,
    },
    RestaurantDescription: {
        marginTop: 7,
        color: '#A0A5BA',
        fontFamily: 'Sen-Regular',
        fontSize: 14,
    },
    ReviewSection: {
        marginTop: 28,
        flexDirection: 'row',
        gap: 48,
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
    TagSection: {
        marginTop: 16,
        flexDirection: 'row',
        height: 82,
    },
    Tag: {
        marginTop: 7,
        backgroundColor: "#FFFAFA",
        boxShadow: '1px 1px 25px -17px rgba(0,0,0,0.75)',
        borderRadius: 33,
        width: 89,
        height: 49,
        justifyContent: 'center',
        marginRight: 20,
    },
    TagActive: {
        marginTop: 7,
        backgroundColor: "#F58D1D",
        boxShadow: '1px 1px 25px -17px rgba(0,0,0,0.75)',
        borderRadius: 33,
        width: 89,
        height: 49,
        justifyContent: 'center',
        marginRight: 20,
    },
    TagTitle: {
        textAlign: 'center',
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    Produts: {
        flexDirection: 'column',
    },
    ProdutsTitle: {
        marginTop: 16,
        color: '#181C2E',
        fontFamily: 'Sen-Regular',
        fontSize: 20,
        marginBottom: 32,
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
});