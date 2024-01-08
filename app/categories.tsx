import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Link } from "expo-router";
import { useGame } from '@/context/GameContext';
import AppStyles from '@/AppStyles';
import ActionButton from '@/components/ActionButton';
import { Image } from 'expo-image';
// TODO probably not the best way to import images 
import Images from '@/data/images'

export default function Categories() {
    const { categories, toggleCategory } = useGame()
    const isStartGameLinkDisabled = categories.filter(x => x.isSelected).length < 1

    return (
        <View style={AppStyles.screen}>
            <ScrollView>
                <Text style={AppStyles.header}>Choose Category</Text>
                <View style={styles.categoriesList}>
                    {categories.map((category) => (
                        <Pressable
                            key={category.id}
                            onPress={() => toggleCategory(category)}
                            style={[styles.categoryCard, { backgroundColor: category.primaryColor, borderColor: category.isSelected ? category.secondaryColor : category.primaryColor }]}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={Images[category.id]} style={{ width: 55, height: 55, tintColor: '#505050' }} contentFit="fill" />
                            </View>
                            <Text style={styles.cardText}>{category.label}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Link href="/game" asChild>
                <ActionButton text='Start game' disabled={isStartGameLinkDisabled} />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesList: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        paddingVertical: 30
    },
    categoryCard: {
        boxSizing: 'content-box',
        width: '90%',
        height: 100,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 4
    },
    imageContainer: {
        position: 'absolute',
        marginVertical: 'auto',
        top: 12.5,
        left: -15,
        borderWidth: 2,
        width: 75,
        height: 75,
        borderRadius: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#505050'
    },
    cardText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#505050'
    }
})