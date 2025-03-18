import { getAuthTokens, setAuthTokens } from "./tokenManager";
import { refreshToken } from "./auth";

// RequestInit の body を除いた型に、TRequest 型の body を追加する
type RequestOptions<TRequest> = Omit<RequestInit, "body"> & { body?: TRequest };

/**
 * 汎用API通信関数
 * @param url APIエンドポイントURL
 * @param options fetchオプション（bodyはTRequest型）
 * @returns レスポンスJSONをTResponse型として返す
 */
export async function apiClient<TRequest, TResponse>(
    url: string,
    options: RequestOptions<TRequest>
): Promise<TResponse> {
    const tokens = getAuthTokens();
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    if (tokens?.access_token) {
        headers.set("Authorization", `Bearer ${tokens.access_token}`);
    }

    const requestOptions: RequestInit = {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    };

    let res = await fetch(url, requestOptions);

    // 401: Unauthorized → トークン更新処理
    if (res.status === 401) {
        const currentTokens = getAuthTokens();
        if (!currentTokens?.refresh_token) {
            throw new Error("No refresh token available");
        }
        try {
            const newTokens = await refreshToken({ refresh_token: currentTokens.refresh_token });
            setAuthTokens(newTokens);
            headers.set("Authorization", `Bearer ${newTokens.access_token}`);
            res = await fetch(url, { ...requestOptions, headers });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new Error("Token refresh failed");
        }
    }

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error ${res.status}: ${errorText}`);
    }
    return res.json() as Promise<TResponse>;
}
