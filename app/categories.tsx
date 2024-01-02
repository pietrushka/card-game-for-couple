import { View, Text, StyleSheet } from 'react-native'
import { Link } from "expo-router";
import { useCards } from '@/context/CardsContext';
import AppStyles from '@/AppStyles';
import ActionButton from '@/components/ActionButton';

export default function Categories() {
    const { categories, toggleCategory } = useCards()
    const isStartGameLinkDisabled = categories.filter(x => x.isSelected).length < 1
    return (
        <View style={AppStyles.screen}>
            <Text style={AppStyles.header}>You can mix categories togather</Text>
            <View style={styles.categoriesList}>
                {categories.map((category) => (
                    <ActionButton
                        key={category.id}
                        color='blue'
                        onPress={() => toggleCategory(category)}
                        text={category.label}
                        variant={category.isSelected ? 'primary' : 'secondary'}
                    />
                ))}
            </View>
            <Link href="/game" asChild>
                <ActionButton text='Start game' disabled={isStartGameLinkDisabled} />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesList: {
        display: 'flex',
        gap: 20
    }
})