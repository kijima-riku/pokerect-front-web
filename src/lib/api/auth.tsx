import type { SignInResponse, RefreshTokenResponse, RefreshTokenRequest } from "@/lib/type/AuthType";
import { apiClient } from "./apiClient";

/**
 * サインインAPI（リクエストボディなし）
 */
export async function signIn(): Promise<SignInResponse> {
    const res = await fetch("http://localhost:8080/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
        throw new Error("Failed to sign in");
    }
    return res.json() as Promise<SignInResponse>;
}

/**
 * リフレッシュAPI
 * @param request リフレッシュトークンリクエスト
 */
export async function refreshToken(
    request: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
    // refresh APIはtoken不要のため、apiClientをそのまま利用
    return apiClient<RefreshTokenRequest, RefreshTokenResponse>(
        "http://localhost:8080/api/v1/auth/refresh",
        { method: "POST", body: request }
    );
}
