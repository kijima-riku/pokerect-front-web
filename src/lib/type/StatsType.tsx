/**
 * =====================================
 * Stats API（統計情報関連）
 * =====================================
 */
import { MatchResultOption } from "@/lib/type/ResultType";

// 統計情報のうち、全体統計を表す型
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