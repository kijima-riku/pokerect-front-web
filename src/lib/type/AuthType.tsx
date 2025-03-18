/**
 * =====================================
 * Auth API (認証関連)
 * =====================================
 */

// SignInRequest は引数なし

type AuthResponseBase = {
    user_id: number;
    access_token: string;
    refresh_token: string;
};

export type SignInResponse = AuthResponseBase;

export type RefreshTokenResponse = AuthResponseBase;

export type RefreshTokenRequest = {
    refresh_token: string;
};

export type ApiRequestArgument = {
    access_token: string;
};
