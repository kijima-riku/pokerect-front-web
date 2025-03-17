/**
 * =====================================
 * 共通エラーレスポンス
 * =====================================
 */

export type ErrorResponse = {
    error: {
        code: string;
        message: string;
    };
}
