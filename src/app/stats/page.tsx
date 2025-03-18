"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// API 関数
import { getOverallStats, getWinRateTrend } from "@/lib/api/stats"
import { getDeckDetailedStats } from "@/lib/api/stats" // getDeckDetailedStats(deckId: number) の実装済み

// 型定義
import type { GetOverallStatsResponse, GetWinRateTrendResponse, GetDeckDetailedStatsResponse } from "@/lib/type/StatsType"

// 定数（ダミーのデッキ名リスト）
const decks = ["Dragon", "Necro", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]

// ダミーのデッキ名→デッキID マッピング
const deckIdMapping: Record<string, number> = {
    dragon: 1,
    necro: 2,
    shadow: 3,
    blood: 4,
    haven: 5,
    sword: 6,
    forest: 7,
    portal: 8,
    rune: 9,
}

// 色定義
const COLORS = ["#2563eb", "#db2777", "#ea580c", "#16a34a", "#7c3aed", "#ca8a04", "#0891b2", "#be123c"]

export default function StatsPage() {
    // 全体統計・勝率推移は初回取得
    const [overallStats, setOverallStats] = useState<GetOverallStatsResponse | null>(null)
    const [winRateTrend, setWinRateTrend] = useState<GetWinRateTrendResponse>([])

    // 選択されたデッキ（小文字）
    const [selectedDeck, setSelectedDeck] = useState<string>("")
    // 選択されたデッキの詳細統計
    const [deckDetailedStats, setDeckDetailedStats] = useState<GetDeckDetailedStatsResponse | null>(null)

    // ページロード時に全体統計と30日間の勝率推移を取得
    useEffect(() => {
        async function fetchStats() {
            try {
                const overall = await getOverallStats()
                setOverallStats(overall)
                const trend = await getWinRateTrend()
                setWinRateTrend(trend)
            } catch (error) {
                console.error("Stats fetch error:", error)
                toast.error("統計情報の取得に失敗しました")
            }
        }
        fetchStats()
    }, [])

    // 選択されたデッキが変わった場合、詳細統計を取得
    useEffect(() => {
        async function fetchDeckStats() {
            if (!selectedDeck) {
                setDeckDetailedStats(null)
                return
            }
            const deckId = deckIdMapping[selectedDeck]
            if (!deckId) return
            try {
                const stats = await getDeckDetailedStats(deckId)
                setDeckDetailedStats(stats)
            } catch (error) {
                console.error("Deck detailed stats fetch error:", error)
                toast.error("デッキ詳細統計の取得に失敗しました")
            }
        }
        fetchDeckStats()
    }, [selectedDeck])

    return (
        <div className="container py-6 space-y-8">
            {/* 全体統計セクション */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">全体の統計</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>総合勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{overallStats ? `${overallStats.win_rate}%` : "-"}</div>
                            <p className="text-sm text-muted-foreground mt-2">
                                総試合数: {overallStats ? overallStats.total_matches : "-"} 試合
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>先行時の勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* ここは全体統計から算出済みなら値を入れる */}
                            <div className="text-3xl font-bold">--%</div>
                            <p className="text-sm text-muted-foreground mt-2">先行試合数: -- 試合</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>後攻時の勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">--%</div>
                            <p className="text-sm text-muted-foreground mt-2">後攻試合数: -- 試合</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>直近30日間の勝率推移</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={winRateTrend}>
                                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString()} />
                                <YAxis domain={[0, 100]} />
                                <Line type="monotone" dataKey="win_rate" stroke={COLORS[0]} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            {/* デッキ別統計セクション */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">デッキ別統計</h2>
                    <Select value={selectedDeck} onValueChange={setSelectedDeck}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="デッキを選択" />
                        </SelectTrigger>
                        <SelectContent>
                            {decks.map((deck) => (
                                <SelectItem key={deck} value={deck.toLowerCase()}>
                                    {deck}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedDeck ? (
                    deckDetailedStats ? (
                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>デッキの勝率</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{deckDetailedStats.win_rate}%</div>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            使用回数: {deckDetailedStats.total_matches} 試合
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>先行時の勝率</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{deckDetailedStats.first_win_rate}%</div>
                                        <p className="text-sm text-muted-foreground mt-2">先行試合数: -- 試合</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>後攻時の勝率</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{deckDetailedStats.second_win_rate}%</div>
                                        <p className="text-sm text-muted-foreground mt-2">後攻試合数: -- 試合</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>対デッキ別勝率</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart
                                                data={[
                                                    // ここは詳細統計に合わせたデータを利用する想定。ダミーデータ例です。
                                                    { name: "Dragon", winRate: Math.floor(Math.random() * 40) + 30 },
                                                    { name: "Shadow", winRate: Math.floor(Math.random() * 40) + 30 },
                                                    { name: "Blood", winRate: Math.floor(Math.random() * 40) + 30 },
                                                ]}
                                            >
                                                <XAxis dataKey="name" />
                                                <YAxis domain={[0, 100]} />
                                                <Bar dataKey="winRate" fill={COLORS[0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>平均ターン数</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart
                                                data={[
                                                    { name: "全体", turns: Math.floor(Math.random() * 5) + 7 },
                                                    { name: "勝利時", turns: Math.floor(Math.random() * 5) + 7 },
                                                    { name: "敗北時", turns: Math.floor(Math.random() * 5) + 7 },
                                                ]}
                                            >
                                                <XAxis dataKey="name" />
                                                <YAxis domain={[0, 15]} />
                                                <Bar dataKey="turns" fill={COLORS[4]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-10 text-center text-muted-foreground">
                                詳細統計を取得中…
                            </CardContent>
                        </Card>
                    )
                ) : (
                    <Card>
                        <CardContent className="py-10 text-center text-muted-foreground">
                            デッキを選択すると、詳細な統計情報が表示されます
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
