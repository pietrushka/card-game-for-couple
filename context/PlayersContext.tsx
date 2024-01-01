import React from 'react'
import { Player } from '@/types'

type PlayersContextType = {
	players: Player[]
	modifyPlayer: (data: Player) => void
}

export const PlayersContext = React.createContext<PlayersContextType | null>(null)

export const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [players, setPlayers] = React.useState<Player[]>([
		{
			id: 'player1',
			name: 'Player 1',
			gender: 'male',
		},
		{
			id: 'player2',
			name: 'Player 2',
			gender: 'female',
		}
	])

	const modifyPlayer = async (data: Player) => {
		setPlayers(players.map(
			player => player.id === data.id ? data : player
		))
	}


	return (
		<PlayersContext.Provider value={{ players, modifyPlayer }}>
			{children}
		</PlayersContext.Provider>
	)
}

export const usePlayers = () => {
	const context = React.useContext(PlayersContext)
	if (!context) {
		throw new Error('usePlayers must be used within a PlayersProvider')
	}
	return context
}
