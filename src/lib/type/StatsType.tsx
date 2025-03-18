/**
 * =====================================
 * Stats API（統計情報関連）
 * =====================================
 */
import { MatchResultOption } from "@/lib/type/ResultType";

export interface OverallStats {
    total_matches: number;
    win_rate: number;
    best_deck_id: number;
    best_deck_win_rate: number;
}

export type GetOverallStatsRequest = MatchResultOption;

export type GetOverallStatsResponse = OverallStats;

export interface DeckStats {
    deck_id: number;
    total_matches: number;
    win_rate: number;
}

export type GetDecksStatsResponse = DeckStats[];

export interface WinRateTrendData {
    date: Date;
    win_rate: number;
}

export type GetWinRateTrendResponse = WinRateTrendData[];

export type GetWinRateTrendRequest = MatchResultOption;

export type GetDeckDetailedStatsResponse = {
    deck_id: number;
    total_matches: number;
    win_rate: number;
    first_win_rate: number;
    second_win_rate: number;
    average_turns: number;
}