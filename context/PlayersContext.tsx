import React from 'react'
import { Player } from '../types'
import { nanoid } from 'nanoid'

type PlayersContextType = {
	players: Player[]
	addPlayer: (name: string) => void
	deletePlayer: (name: string) => void
}

export const PlayersContext = React.createContext<PlayersContextType | null>(null)

export const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [players, setPlayers] = React.useState<Player[]>([])

	const addPlayer = async (name: string) => {
		setPlayers([...players, { name, id: nanoid() }])
	}

	const deletePlayer = async (id: string) => {
		setPlayers(players.filter((player) => player.id !== id))
	}

	return (
		<PlayersContext.Provider value={{ players, addPlayer, deletePlayer }}>
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
