import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { usePlayers } from '@/context/PlayersContext'
import PlayersList from '@/components/PlayerList'
import AddPlayer from '@/components/AddPlayerForm'

export default function Home() {
	const { players, addPlayer, deletePlayer } = usePlayers()
	return (
		<View>
			<Text>Welcome</Text>
			<AddPlayer addPlayer={addPlayer} />
			<PlayersList {...{ players, deletePlayer }} />
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
	},
})
