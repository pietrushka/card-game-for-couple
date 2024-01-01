import React from 'react'
import { Card, Category } from '@/types'
import categoriesJson from '@/data/categories.json'

type CardsContextType = {
	cards: Card[]
	categories: Category[]
	toggleCategory: (category: Category) => void
}

const initialCategories = categoriesJson.map(x => ({ ...x, isSelected: false }))

export const CardsContext = React.createContext<CardsContextType | null>(null)

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [cards, setCards] = React.useState<Card[]>([])
	const [categories, setCategories] = React.useState<Category[]>(initialCategories)

	const toggleCategory = async (category: Category) => {
		setCategories(prevCategories => prevCategories.map(x => x.id === category.id ? { ...x, isSelected: !x.isSelected } : x)
		);
	}


	return (
		<CardsContext.Provider value={{ cards, categories, toggleCategory }}>
			{children}
		</CardsContext.Provider>
	)
}

export const useCards = () => {
	const context = React.useContext(CardsContext)
	if (!context) {
		throw new Error('useCards must be used within a CardsProvider')
	}
	return context
}
