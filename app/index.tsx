import { View, StyleSheet, Text, } from 'react-native'
import { useGame } from '@/context/GameContext'
import PlayerInput from '@/components/PlayerInput'
import { Link, } from "expo-router";
import AppStyles from '@/AppStyles'
import ActionButton from '@/components/ActionButton';

export default function Home() {
	const { players, modifyPlayer } = useGame()
	const { player1, player2 } = players
	return (
		<View style={AppStyles.screen}>
			<View style={styles.playersForm}>
				<Text style={AppStyles.header}>Fill yours and your partner names and genders</Text>
				<View style={styles.inputGroup}>
					<PlayerInput player={player1} modifyPlayer={modifyPlayer} />
					<PlayerInput player={player2} modifyPlayer={modifyPlayer} />
				</View>
			</View>
			<Link href="/categories" asChild>
				<ActionButton text='Choose Categories' />
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	playersForm: {
		display: 'flex',
		gap: 20,
	},
	inputGroup: {
		display: 'flex',
		gap: 20,
		paddingVertical: 20,
	},
})