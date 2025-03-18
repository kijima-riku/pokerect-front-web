import type { GetDeckListResponse, PostDeckRequest, PostDeckListResponse } from "@/lib/type/DeckType";
import { apiClient } from "./apiClient";

/**
 * デッキ一覧取得API
 */
export async function getDeckList(): Promise<GetDeckListResponse> {
    return apiClient<undefined, GetDeckListResponse>(
        "http://localhost:8080/api/v1/decks",
        { method: "GET" }
    );
}

/**
 * デッキ登録API
 * @param requestData 登録するデッキ情報
 */
export async function postDeck(requestData: PostDeckRequest): Promise<PostDeckListResponse> {
    return apiClient<PostDeckRequest, PostDeckListResponse>(
        "http://localhost:8080/api/v1/decks",
        { method: "POST", body: requestData }
    );
}
