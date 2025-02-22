import type { Match, DeckStats, OverallStats } from "@/type"

export function calculateOverallStats(matches: Match[]): OverallStats {
    const totalMatches = matches.length
    const wins = matches.filter((m) => m.result === "win").length
    const firstMatches = matches.filter((m) => m.isFirst)
    const firstWins = firstMatches.filter((m) => m.result === "win").length
    const secondMatches = matches.filter((m) => !m.isFirst)
    const secondWins = secondMatches.filter((m) => m.result === "win").length

    // デッキごとの勝率を計算
    const deckStats = new Map<string, { wins: number; total: number }>()
    matches.forEach((match) => {
        const current = deckStats.get(match.myDeck) || { wins: 0, total: 0 }
        deckStats.set(match.myDeck, {
            wins: current.wins + (match.result === "win" ? 1 : 0),
            total: current.total + 1,
        })
    })

    let bestDeck = { name: "", winRate: 0 }
    deckStats.forEach((stats, deck) => {
        const winRate = (stats.wins / stats.total) * 100
        if (winRate > bestDeck.winRate) {
            bestDeck = { name: deck, winRate }
        }
    })

    return {
        totalMatches,
        winRate: (wins / totalMatches) * 100,
        firstWinRate: (firstWins / firstMatches.length) * 100,
        secondWinRate: (secondWins / secondMatches.length) * 100,
        bestDeck,
    }
}

export function calculateDeckStats(matches: Match[], deckName: string): DeckStats {
    const deckMatches = matches.filter((m) => m.myDeck === deckName)
    const totalGames = deckMatches.length
    const wins = deckMatches.filter((m) => m.result === "win").length
    const firstMatches = deckMatches.filter((m) => m.isFirst)
    const firstWins = firstMatches.filter((m) => m.result === "win").length
    const secondMatches = deckMatches.filter((m) => !m.isFirst)
    const secondWins = secondMatches.filter((m) => m.result === "win").length
    const totalTurns = deckMatches.reduce((sum, m) => sum + m.turns, 0)

    return {
        name: deckName,
        games: totalGames,
        winRate: (wins / totalGames) * 100,
        firstWinRate: (firstWins / firstMatches.length) * 100,
        secondWinRate: (secondWins / secondMatches.length) * 100,
        averageTurns: totalTurns / totalGames,
    }
}

