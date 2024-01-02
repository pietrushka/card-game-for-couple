import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useCards } from '@/context/CardsContext'
import Card from '@/components/Card'
import {
    useAnimatedReaction,
    useSharedValue,
    runOnJS,
} from 'react-native-reanimated';


export default function Game() {
    const { startGame, cards } = useCards()

    useEffect(() => {
        startGame()
    }, [])

    const activeIndex = useSharedValue(0);
    const [index, setIndex] = useState(0);

    useAnimatedReaction(
        () => activeIndex.value,
        (value, prevValue) => {
            if (Math.floor(value) !== index) {
                runOnJS(setIndex)(Math.floor(value));
            }
        }
    );

    const onResponse = (res: boolean) => {
        console.log('on Response: ', res);
    };


    return (
        <View style={styles.screen}>
            {/* TODO maybe use FlatList here */}
            {cards.map((card, index) => (
                <Card
                    key={card.text}
                    text={card.text}
                    numOfCards={cards.length}
                    index={index}
                    activeIndex={activeIndex}
                    onResponse={onResponse}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden'
    }
})