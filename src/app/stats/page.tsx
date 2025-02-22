"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const COLORS = ["#2563eb", "#db2777", "#ea580c", "#16a34a", "#7c3aed", "#ca8a04", "#0891b2", "#be123c"]

const decks = ["Dragon", "Necro", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]

export default function StatsPage() {
    const [selectedDeck, setSelectedDeck] = useState<string>("")

    return (
        <div className="container py-6 space-y-8">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">全体の統計</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>総合勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">58.4%</div>
                            <p className="text-sm text-muted-foreground mt-2">総試合数: 89試合</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>先行時の勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">52.8%</div>
                            <p className="text-sm text-muted-foreground mt-2">先行試合数: 45試合</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>後攻時の勝率</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">64.0%</div>
                            <p className="text-sm text-muted-foreground mt-2">後攻試合数: 44試合</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>直近30日間の勝率推移</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={Array.from({ length: 30 }, (_, i) => ({
                                    day: i + 1,
                                    winRate: 40 + Math.random() * 30,
                                }))}
                            >
                                <XAxis dataKey="day" />
                                <YAxis domain={[0, 100]} />
                                <Line type="monotone" dataKey="winRate" stroke={COLORS[0]} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Separator />

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
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>デッキの勝率</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">61.5%</div>
                                    <p className="text-sm text-muted-foreground mt-2">使用回数: 26試合</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>先行時の勝率</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">65.2%</div>
                                    <p className="text-sm text-muted-foreground mt-2">先行試合数: 14試合</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>後攻時の勝率</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">58.3%</div>
                                    <p className="text-sm text-muted-foreground mt-2">後攻試合数: 12試合</p>
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
                                            data={decks.map((d) => ({
                                                name: d,
                                                winRate: Math.floor(Math.random() * 40) + 30,
                                            }))}
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
                                                { name: "全体", turns: 8.5 },
                                                { name: "勝利時", turns: 7.8 },
                                                { name: "敗北時", turns: 9.2 },
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
                            デッキを選択すると、詳細な統計情報が表示されます
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

