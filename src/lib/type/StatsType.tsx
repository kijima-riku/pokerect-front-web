/**
 * =====================================
 * Stats API（統計情報関連）
 * =====================================
 */
import {Match} from "@/lib/type/MatcheType";

// GET /api/stats/overall
export type GetOverallStatsResponse = {
    totalMatches: number;
    winRate: number;
    bestDeckId: number
    bestDeckWinRate: number;
}

// GET /api/stats/decks
export type DeckMatchup = {
    opponentDeck: string;
    games: number;
    winRate: number;
}

export type DeckStatsItem = {
    name: string;
    games: number;
    winRate: number;
    firstWinRate: number;
    secondWinRate: number;
    averageTurns: number;
    matchups: DeckMatchup[];
}

export type GetDeckStatsResponse = {
    deckStats: DeckStatsItem[];
}

// GET /api/stats/decks/:deckName
export type GetDeckDetailStatsResponse = {
    name: string;
    games: number;
    winRate: number;
    firstWinRate: number;
    secondWinRate: number;
    averageTurns: number;
    matchups: DeckMatchup[];
    recentMatches: Match[];
    turnDistribution: {
        turns: number;
        count: number;
    }[];
}
