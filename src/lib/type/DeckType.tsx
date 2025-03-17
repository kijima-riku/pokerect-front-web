/**
 * =====================================
 * Deck API
 * =====================================
 */

// 3️⃣ デッキ一覧取得
export type DeckItem = {
    id: number;
    name: string;
}

export type DecksListResponse = {
    decks: DeckItem[];
}

// 4️⃣ デッキ詳細取得
export type DeckDetailResponse = {
    id: number;
    name: string;
    description: string;
}

// 5️⃣ お気に入りデッキ取得
export type DeckFavoriteItem = {
    id: number;
    name: string;
    is_favorite: boolean;
}

export type DeckFavoriteResponse = {
    decks: DeckFavoriteItem[];
}