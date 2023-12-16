import { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import Home from './src/components/Home'
import { Player } from './types'
import { PlayersProvider } from './src/context/DataContext'

export default function App() {
	const router = useRouter()
	return (
		<SafeAreaView style={styles.container}>
			<PlayersProvider>
				{/* <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#fff' },
            headerTitle: 'Card Challenges',
          }}
        /> */}
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.view}>
						<Home {...{ players, setPlayers }} />
					</View>
				</ScrollView>
			</PlayersProvider>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	view: {
		flex: 1,
		padding: 10,
	},
})
