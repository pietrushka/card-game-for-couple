import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useGame } from '@/context/GameContext'
import Card from '@/components/Card'
import {
    useAnimatedReaction,
    useSharedValue,
    runOnJS,
} from 'react-native-reanimated';

const MAX_VISIBLE_CARDS = 6

export default function Game() {
    const { startGame, cards, players } = useGame()

    useEffect(() => {
        startGame()
    }, [])

    const activeIndexRef = useSharedValue(0);
    const [index, setIndex] = useState(0);

    useAnimatedReaction(
        () => activeIndexRef.value,
        (value, prevValue) => {
            if (Math.floor(value) !== index) {
                runOnJS(setIndex)(Math.floor(value));
            }
        }
    );

    const onResponse = (res: boolean) => {
    };

    return (
        <View style={styles.screen}>
            {/* TODO maybe use FlatList here */}
            {cards.map((card, cardIdx) => cardIdx - index < MAX_VISIBLE_CARDS
                // Avoid rendering not visible cards 
                ? (
                    <Card
                        key={card.text}
                        text={card.text}
                        numOfCards={cards.length}
                        cardIndex={cardIdx}
                        activeIndexRef={activeIndexRef}
                        onResponse={onResponse}
                        maxCardsVisible={MAX_VISIBLE_CARDS}
                        playerName={players[card.playerId].name}
                    />
                ) : null
            )}
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