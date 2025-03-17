/**
 * =====================================
 * Auth API
 * =====================================
 */

// 1️⃣ デバイスセットアップ（トークン発行）
export type AuthSetupResponse = {
    token: string;
}

// 2️⃣ サインイン（トークン認証）
export type AuthSigninResponse = {
    user_id: number;
    message: string;
}
