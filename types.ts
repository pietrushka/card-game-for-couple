export type PlayerId = 'player1' | 'player2'

export type Player = {
	id: PlayerId
	name: string
	gender: 'male' | 'female'
}

export type Category = {
	id: string
	label: string
	isSelected: boolean
	primaryColor: string
	secondaryColor: string
}

export type Question = {
	text: string
	categoryId: string
}

export interface Card extends Question {
	playerId: PlayerId
}
