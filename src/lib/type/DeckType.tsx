/**
 * =====================================
 * Deck API (デッキ関連)
 * =====================================
 */

type DeckBase = {
    main_name: string;
    sub_name: string | null;
};

export interface Deck extends DeckBase {
    id: number;
    created_at: Date;
}

export interface GetDeckListResponse {
    decks: Deck[];
}

export type PostDeckRequest = DeckBase

export type PostDeckListResponse = Deck
