export type Player = {
	id: string
	name: string
	gender: 'male' | 'female'
}

export type Category = {
	id: string
	label: string
	isSelected: boolean
}

export type Question = {
	text: string
	categoryId: string
}

export interface Card extends Question {
	playerId: string
}
