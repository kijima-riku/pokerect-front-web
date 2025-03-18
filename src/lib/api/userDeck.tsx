// /lib/api/userDeck.ts
import type { GetUserDeckResponse, PostUserDeckRequest, PostUserDeckResponse, GetUserFavoriteDeckResponse, PatchUserFavoriteDeckRequest, DeleteUserDeckRequest } from "@/lib/type/UserDeckType";
import { apiClient } from "./apiClient";

/**
 * ユーザーデッキ一覧取得API
 */
export async function getUserDeck(): Promise<GetUserDeckResponse> {
    return apiClient<undefined, GetUserDeckResponse>(
        "http://localhost:8080/api/v1/user-decks",
        { method: "GET" }
    );
}

/**
 * ユーザーデッキ登録API
 * @param requestData 登録するデッキID情報
 */
export async function postUserDeck(requestData: PostUserDeckRequest): Promise<PostUserDeckResponse> {
    return apiClient<PostUserDeckRequest, PostUserDeckResponse>(
        "http://localhost:8080/api/v1/user-decks",
        { method: "POST", body: requestData }
    );
}

/**
 * お気に入りデッキ取得API
 */
export async function getUserFavoriteDeck(): Promise<GetUserFavoriteDeckResponse> {
    return apiClient<undefined, GetUserFavoriteDeckResponse>(
        "http://localhost:8080/api/v1/user-decks/favorite",
        { method: "GET" }
    );
}

/**
 * お気に入りデッキ更新API
 * @param requestData 更新するデッキID情報
 */
export async function patchUserFavoriteDeck(requestData: PatchUserFavoriteDeckRequest): Promise<Record<string, never>> {
    return apiClient<PatchUserFavoriteDeckRequest, Record<string, never>>(
        "http://localhost:8080/api/v1/user-decks/favorite",
        { method: "PATCH", body: requestData }
    );
}

/**
 * ユーザーデッキ削除API
 * @param requestData 削除するデッキID情報
 */
export async function deleteUserDeck(requestData: DeleteUserDeckRequest): Promise<Record<string, never>> {
    return apiClient<DeleteUserDeckRequest, Record<string, never>>(
        "http://localhost:8080/api/v1/user-decks",
        { method: "DELETE", body: requestData }
    );
}
