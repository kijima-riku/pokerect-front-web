/**
 * =====================================
 * Result API
 * =====================================
 */

// 6️⃣ 結果登録
export type ResultRegistrationResponse = {
    message: string;
    result_id: number;
}

// 7️⃣ 戦績一覧取得
export type ResultItem = {
    id: number;
    user_id: number;
    my_deck: number;
    opponent_deck: number;
    is_first: boolean;
    turn_count: number;
    match_result: number; // 0=引き分け, 1=勝ち, 2=負け
    created_at: string; // ISO形式など
}

export type ResultsListResponse = {
    results: ResultItem[];
}

// 8️⃣ 勝率取得
export type ResultRateResponse = {
    win_rate: number;
    total_games: number;
    wins: number;
    losses: number;
    draws: number;
}

export type ResultsDeckResponse = {
    deckId: number;
    totalMatches: number;
    winRate: number;
}