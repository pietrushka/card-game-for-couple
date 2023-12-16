import React from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const Home: React.FC = () => {
	return (
		<>
			<Text>Welcome</Text>
			<TextInput style={styles.input} placeholder="Player Name" />
			<TouchableOpacity>
				<Text>Add +</Text>
			</TouchableOpacity>
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
