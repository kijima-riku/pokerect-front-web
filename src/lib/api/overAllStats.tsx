// lib/api/overall.ts

// OverallStats の型定義をインポート（プロジェクト内の適切なパスに合わせてください）
import type { OverallStats } from "@/type"

/**
 * エンドポイントから overall stats を取得する関数
 * @returns OverallStats型のデータ
 */
export async function getOverallStats(): Promise<OverallStats> {
    const res = await fetch("http://localhost:8080/api/v1/results/overall", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "0e9ef48b-c084-4702-856c-ca3c3090d126",
        },
        // キャッシュを利用する場合は必要に応じてオプション追加
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Failed to fetch overall stats")
    }
    return res.json()
}
