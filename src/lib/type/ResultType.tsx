/**
 * =====================================
 * Result API (試合結果関連)
 * =====================================
 */
import {Deck} from "@/lib/type/DeckType";


export interface MatchBase {
    id: number;
    user_id: number;
    my_deck: Deck;
    opponent_deck: Deck;
    is_first: boolean;
    turn_count: number;
    outcome: number;
    created_at: Date;
}

export interface MatchInput {
    my_deck: number;
    opponent_deck: number;
    is_first: boolean;
    outcome: number;
    turn_count: number;
}

export interface MatchResultOption {
    limit?: number;
    page?: number;
    deck_id?: number;
    opponent_deck_id?: number;
    is_first?: boolean;
    outcome?: number;
    start_date?: Date;
    end_date?: Date;
}

export type GetMatchResultResponse = MatchBase[]

export type GetMatchResultRequest = MatchResultOption

export type PostMatchRequest = MatchInput

export interface PostMatchResponse extends MatchInput {
    id: number;
}