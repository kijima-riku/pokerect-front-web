/**
 * =====================================
 * Matches API（対戦記録関連）
 * =====================================
 */

export type Match = {
    id: string;
    date: string; // ISO文字列など（サーバー生成時の値）
    result: "win" | "lose";
    isFirst: boolean;
    turns: number;
    myDeck: string;
    opponentDeck: string;
}

// GET /api/matches（クエリパラメータも参考）
export type GetMatchesQuery = {
    page?: number;
    pageSize?: number;
    myDeck?: string;
    opponentDeck?: string;
    result?: "win" | "lose";
    isFirst?: boolean;
    startDate?: string;
    endDate?: string;
}

export type GetMatchesResponse = {
    matches: Match[];
    total: number;
    page: number;
    pageSize: number;
}

// POST /api/matches のリクエスト型（参考）
export type CreateMatchRequest = {
    isFirst: boolean;
    turns: number;
    result: "win" | "lose";
    myDeck: string;
    opponentDeck: string;
}

// GET /api/matches/recent（ホーム画面用）
export type GetRecentMatchesResponse = {
    matches: Match[];
}