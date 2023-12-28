import { Player } from '@/types'
import { Text, TouchableOpacity } from 'react-native'

const PlayersList: React.FC<{ players: Player[]; deletePlayer: (id: string) => void }> = ({
	players,
	deletePlayer,
}) => {
	return (
		<>
			{players.map((player) => (
				<TouchableOpacity key={player.id} onPress={() => deletePlayer(player.id)}>
					<Text>{player.name}</Text>
				</TouchableOpacity>
			))}
		</>
	)
}

export default PlayersList
