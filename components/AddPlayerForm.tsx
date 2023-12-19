import React, { useState } from 'react'
import { Button, TextInput } from 'react-native'

const AddPlayer: React.FC<{ addPlayer: (name: string) => void }> = ({ addPlayer }) => {
	const [name, setName] = useState('')

	const handleSubmit = () => {
		if (name.length === 0) {
			return
		}
		addPlayer(name)
		setName('')
	}

	return (
		<>
			<TextInput onChangeText={setName} value={name} placeholder="Player Name" />
			<Button title="Add +" onPress={handleSubmit} />
		</>
	)
}

export default AddPlayer
