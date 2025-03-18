import type {   GetOverallStatsRequest,
    GetOverallStatsResponse,
    GetDecksStatsResponse,
    GetWinRateTrendRequest,
    GetWinRateTrendResponse,
    GetDeckDetailedStatsResponse,
} from "@/lib/type/StatsType";
import { apiClient } from "./apiClient";

/**
 * 全体統計取得API
 * @param requestData クエリパラメータとして全体統計のオプションを送信
 */
export async function getOverallStats(requestData?: GetOverallStatsRequest): Promise<GetOverallStatsResponse> {
    const queryParams = requestData ? new URLSearchParams() : undefined;
    if (queryParams && requestData) {
        if (requestData.limit !== undefined) queryParams.append("limit", String(requestData.limit));
        if (requestData.page !== undefined) queryParams.append("page", String(requestData.page));
        if (requestData.deck_id !== undefined) queryParams.append("deck_id", String(requestData.deck_id));
        if (requestData.opponent_deck_id !== undefined) queryParams.append("opponent_deck_id", String(requestData.opponent_deck_id));
        if (requestData.is_first !== undefined) queryParams.append("is_first", String(requestData.is_first));
        if (requestData.outcome !== undefined) queryParams.append("outcome", String(requestData.outcome));
        if (requestData.start_date) queryParams.append("start_date", requestData.start_date.toISOString());
        if (requestData.end_date) queryParams.append("end_date", requestData.end_date.toISOString());
    }
    const url = queryParams
        ? `http://localhost:8080/api/v1/stats/overall?${queryParams.toString()}`
        : "http://localhost:8080/api/v1/stats/overall";
    return apiClient<undefined, GetOverallStatsResponse>(
        url,
        { method: "GET" }
    );
}

/**
 * デッキごとの統計情報取得API
 */
export async function getDecksStats(): Promise<GetDecksStatsResponse> {
    return apiClient<undefined, GetDecksStatsResponse>(
        "http://localhost:8080/api/v1/stats/decks",
        { method: "GET" }
    );
}

/**
 * 30日間の勝率推移取得API
 * @param requestData クエリパラメータとして30日間の勝率推移オプションを送信
 */
export async function getWinRateTrend(
    requestData?: GetWinRateTrendRequest
): Promise<GetWinRateTrendResponse> {
    const queryParams = requestData ? new URLSearchParams() : undefined;
    if (queryParams && requestData) {
        if (requestData.limit !== undefined) queryParams.append("limit", String(requestData.limit));
        if (requestData.page !== undefined) queryParams.append("page", String(requestData.page));
        if (requestData.deck_id !== undefined) queryParams.append("deck_id", String(requestData.deck_id));
        if (requestData.opponent_deck_id !== undefined) queryParams.append("opponent_deck_id", String(requestData.opponent_deck_id));
        if (requestData.is_first !== undefined) queryParams.append("is_first", String(requestData.is_first));
        if (requestData.outcome !== undefined) queryParams.append("outcome", String(requestData.outcome));
        if (requestData.start_date) queryParams.append("start_date", requestData.start_date.toISOString());
        if (requestData.end_date) queryParams.append("end_date", requestData.end_date.toISOString());
    }
    const url = queryParams
        ? `http://localhost:8080/api/v1/stats/win-rate-trend?${queryParams.toString()}`
        : "http://localhost:8080/api/v1/stats/win-rate-trend";
    return apiClient<undefined, GetWinRateTrendResponse>(url, { method: "GET" });
}
/**
 * デッキの詳細統計取得API
 * @param deckId 取得するデッキのID
 */
export async function getDeckDetailedStats(deckId: number): Promise<GetDeckDetailedStatsResponse> {
    return apiClient<undefined, GetDeckDetailedStatsResponse>(
        `http://localhost:8080/api/v1/stats/deck-detailed/${deckId}`,
        { method: "GET" }
    );
}


