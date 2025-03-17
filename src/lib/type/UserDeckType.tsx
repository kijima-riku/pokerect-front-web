/**
 * =====================================
 * Decks / User-Decks API（デッキ情報関連）
 * =====================================
 */

// GET /api/decks - 利用可能なデッキ一覧取得
export type GetDecksResponse = {
    decks: {
        id: string;
        name: string;
        isActive: boolean;
    }[];
}

// GET /api/user-decks - ユーザのデッキ一覧取得
export type UserDeck = {
    id: string;
    name: string;
    isActive: boolean;
    isFavorite: boolean;
    addedAt: string; // 例: "YYYY-MM-DD"
}

export type GetUserDecksResponse = {
    userDecks: UserDeck[];
}

// POST /api/user-decks - 新しいデッキの追加
export type AddDeckRequest = {
    name: string;
}

export type AddDeckResponse = UserDeck;

// PATCH /api/user-decks/:deckId/active - 有効/無効切替
export type ToggleActiveRequest = {
    isActive?: boolean;
}

export type ToggleActiveResponse = UserDeck;

// PATCH /api/user-decks/:deckId/favorite - お気に入りデッキの設定
export type SetFavoriteRequest = {
    isFavorite?: boolean;
}

export type SetFavoriteResponse = UserDeck;

// DELETE /api/user-decks/:deckId - デッキ削除
export type RemoveDeckResponse = {
    success: boolean;
}