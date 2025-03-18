"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { GetDecksStatsResponse} from "@/lib/type/StatsType";

export function DeckWinRateChart({ stats }: { stats: GetDecksStatsResponse }) {
    const data = stats.map((stat) => ({
        name: stat.deck_id,
        win_rate: stat.win_rate
    }))

    return (
        <Card>
            <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Bar dataKey="winRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}