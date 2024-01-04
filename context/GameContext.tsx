import React from 'react'
import { Player, Category, Question, Card } from '@/types'
import categoriesJson from '@/data/categories.json'
import questionsJson from '@/data/questions.json'
import { shuffle } from '@/utils'

function filterQuestionsByCategories(categories: Category[], questions: Question[]): Question[] {
    const selectedCategoryIds = categories.filter(x => x.isSelected).map(x => x.id);
    return questions.filter(question => selectedCategoryIds.some(id => question.categoryId === id));
}

function convertQuestionToCards(questions: Question[]): Card[] {
    return questions.map((card, index) => {
        return { ...card, playerId: index % 2 === 0 ? 'player1' : 'player2' };
    });
}

type GameContextType = {
    players: PlayersState
    modifyPlayer: (data: Player) => void
    cards: Card[]
    categories: Category[]
    toggleCategory: (category: Category) => void
    startGame: () => void
}

// app is supposed to work with 2 players only 
type PlayersState = {
    player1: Player
    player2: Player
}

const initialCategories = categoriesJson.map(x => ({ ...x, isSelected: false }))

export const GameContext = React.createContext<GameContextType | null>(null)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [players, setPlayers] = React.useState<PlayersState>({
        player1: {
            id: 'player1',
            name: 'Player 1',
            gender: 'male',
        },
        player2: {
            id: 'player2',
            name: 'Player 2',
            gender: 'female',
        }
    })
    const [cards, setCards] = React.useState<Card[]>([])
    const [categories, setCategories] = React.useState<Category[]>(initialCategories)

    function modifyPlayer(data: Player) {
        setPlayers(state => ({
            ...state,
            [data.id]: data
        }))
    }

    const toggleCategory = async (category: Category) => {
        setCategories(prevCategories => prevCategories.map(x => x.id === category.id ? { ...x, isSelected: !x.isSelected } : x)
        );
    }

    const startGame = () => {
        const filteredQuestions = filterQuestionsByCategories(categories, questionsJson)
        const shuffledQuestions = shuffle(filteredQuestions)
        const preparedCards = convertQuestionToCards(shuffledQuestions)
        setCards(preparedCards)
    }

    return (
        <GameContext.Provider value={{
            players, modifyPlayer, cards, categories, toggleCategory, startGame
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    const context = React.useContext(GameContext)
    if (!context) {
        throw new Error('usePlayers must be used within a PlayersProvider')
    }
    return context
}
