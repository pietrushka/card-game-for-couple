import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    SharedValue,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    useAnimatedReaction
} from 'react-native-reanimated';
import { GestureDetector, Gesture, } from 'react-native-gesture-handler';
import { toLowerCaseFirstLetter } from '@/utils';

const screenWidth = Dimensions.get('screen').width;
const CARD_WIDTH = screenWidth * 0.8
const CARD_HEIGHT = CARD_WIDTH * 1.67 // golden ratio


interface CardProps {
    text: string;
    numOfCards: number;
    cardIndex: number;
    activeIndexRef: SharedValue<number>;
    onResponse: (a: boolean) => void;
    maxCardsVisible: number
};

export default function Card({
    text,
    numOfCards,
    cardIndex,
    activeIndexRef,
    onResponse,
    maxCardsVisible
}: CardProps) {
    const translationX = useSharedValue(0);

    const animatedCard = useAnimatedStyle(() => {
        return ({
            opacity: interpolate(
                activeIndexRef.value,
                // top one, current visible item, bottom one
                [cardIndex - 2, cardIndex - 1, cardIndex, cardIndex + 1,],
                [1 - 1 / (maxCardsVisible - 1), 1, 1, 1,],
            ),
            transform: [
                {
                    scale: interpolate(
                        activeIndexRef.value,
                        [cardIndex - 1, cardIndex, cardIndex + 1],
                        [0.95, 1, 1]
                    ),
                },
                {
                    translateY: interpolate(
                        activeIndexRef.value,
                        [cardIndex - 1, cardIndex, cardIndex + 1],
                        [-30, 0, 0]
                    ),
                },
                {
                    translateX: translationX.value,
                },
                {
                    rotateZ: `${interpolate(
                        translationX.value,
                        [-screenWidth / 2, 0, screenWidth / 2],
                        [-15, 0, 15]
                    )}deg`,
                },
            ],
        })
    });

    const gesture = Gesture.Pan()
        .onChange((event) => {
            translationX.value = event.translationX;

            activeIndexRef.value = interpolate(
                Math.abs(translationX.value),
                [0, 500],
                [cardIndex, cardIndex + 0.8]
            );
        })
        .onEnd((event) => {
            if (Math.abs(event.velocityX) > 400) {
                translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
                    velocity: event.velocityX,
                });
                activeIndexRef.value = withSpring(cardIndex + 1);

                runOnJS(onResponse)(event.velocityX > 0);
            } else {
                translationX.value = withSpring(0);
            }
        });

    // hide card to make it invisible on another screen
    if (Math.abs(translationX.value) > 400) {
        return null
    }

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    styles.card,
                    animatedCard,
                    { zIndex: numOfCards - cardIndex },
                ]}
            >
                <Text style={styles.cardText}>
                    <Text style={styles.playerName}>Player name</Text> {toLowerCaseFirstLetter(text)}
                </Text>
            </Animated.View>
        </GestureDetector>
    )
}


const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 15,
        position: 'absolute',
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    cardText: {
        fontSize: 24,
        color: 'black',
    },
    playerName: {
        color: 'blue'
    }
});