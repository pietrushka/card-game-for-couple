import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { usePlayers } from '../context/PlayersContext'
import PlayersList from './PlayerList'
import AddPlayer from './AddPlayerForm'

const Home: React.FC = () => {
	const { players, addPlayer, deletePlayer } = usePlayers()
	return (
		<>
			<Text>Welcome</Text>
			<AddPlayer addPlayer={addPlayer} />
			<PlayersList {...{ players, deletePlayer }} />
		</>
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

export default Home
