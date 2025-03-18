export interface AuthTokens {
    user_id: number;
    access_token: string;
    refresh_token: string;
}

let tokens: AuthTokens | null = null;

export function getAuthTokens(): AuthTokens | null {
    return tokens;
}

export function setAuthTokens(newTokens: AuthTokens): void {
    tokens = newTokens;
}

export function clearAuthTokens(): void {
    tokens = null;
}
