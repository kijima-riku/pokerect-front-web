export type Match = {
    id: string
    date: Date
    result: "win" | "lose"
    isFirst: boolean
    turns: number
    myDeck: string
    opponentDeck: string
}

export type DeckStats = {
    name: string
    games: number
    winRate: number
    firstWinRate: number
    secondWinRate: number
    averageTurns: number
}

export type OverallStats = {
    totalMatches: number
    winRate: number
    firstWinRate: number
    secondWinRate: number
    bestDeck: {
        name: string
        winRate: number
    }
}

