/**
 * =====================================
 * Decks / User-Decks API（デッキ情報関連）
 * =====================================
 */
import { Deck } from "@/lib/type/DeckType";

export interface DeckIdRequest {
    deck_id: number;
}

export type GetUserDeckResponse = Deck[];

export type PostUserDeckRequest = DeckIdRequest

export interface PostUserDeckResponse {
    message: string;
}

export type GetUserFavoriteDeckResponse = Deck | null;

export type PatchUserFavoriteDeckRequest = DeckIdRequest

export type DeleteUserDeckRequest = DeckIdRequest