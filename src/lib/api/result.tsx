import type { GetMatchResultRequest, GetMatchResultResponse, PostMatchRequest, PostMatchResponse } from "@/lib/type/ResultType";
import { apiClient } from "./apiClient";

/**
 * 試合結果取得API
 * @param requestData クエリパラメータとして試合結果オプションを送信
 */
export async function getMatchResult(requestData: GetMatchResultRequest): Promise<GetMatchResultResponse> {
    const queryParams = new URLSearchParams();
    if (requestData.limit !== undefined) queryParams.append("limit", String(requestData.limit));
    if (requestData.page !== undefined) queryParams.append("page", String(requestData.page));
    if (requestData.deck_id !== undefined) queryParams.append("deck_id", String(requestData.deck_id));
    if (requestData.opponent_deck_id !== undefined) queryParams.append("opponent_deck_id", String(requestData.opponent_deck_id));
    if (requestData.is_first !== undefined) queryParams.append("is_first", String(requestData.is_first));
    if (requestData.outcome !== undefined) queryParams.append("outcome", String(requestData.outcome));
    if (requestData.start_date) queryParams.append("start_date", requestData.start_date.toISOString());
    if (requestData.end_date) queryParams.append("end_date", requestData.end_date.toISOString());

    const url = `http://localhost:8080/api/v1/matches?${queryParams.toString()}`;
    return apiClient<undefined, GetMatchResultResponse>(
        url,
        { method: "GET" }
    );
}

/**
 * 試合結果登録API
 * @param requestData 登録する試合情報
 */
export async function postMatch(requestData: PostMatchRequest): Promise<PostMatchResponse> {
    return apiClient<PostMatchRequest, PostMatchResponse>(
        "http://localhost:8080/api/v1/matches",
        { method: "POST", body: requestData }
    );
}
