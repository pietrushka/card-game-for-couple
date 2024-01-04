export function toLowerCaseFirstLetter(str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1)
}

export function shuffle<T>(elements: T[]) {
	let shuffledElements = elements
	for (let i = shuffledElements.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]]
	}
	return shuffledElements
}
