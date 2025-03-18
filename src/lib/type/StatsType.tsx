/**
 * =====================================
 * Stats API（統計情報関連）
 * =====================================
 */
import {MatchResultOption} from "@/lib/type/ResultType";

export type GetOverallStatsRequest = MatchResultOption

export type GetOverallStatsResponse = {
    total_matches: number;
    win_rate: number;
    best_deck_id: number
    best_deck_win_rate: number;
}

type StatsBase = {
    deck_id: number;
    total_matches: number;
    win_rate: number;
}

export type GetDecksStatsResponse = StatsBase[]