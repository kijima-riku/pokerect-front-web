"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DeckStats } from "@/type"

export function DeckUsage({ stats }: { stats: DeckStats[] }) {
    const sortedStats = [...stats].sort((a, b) => b.games - a.games)

    return (
        <Card>
            <CardContent className="pt-4">
                <div className="space-y-4">
                    {sortedStats.map((deck) => (
                        <div key={deck.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <div className="font-medium">{deck.name}</div>
                                <div className="text-sm text-muted-foreground">{deck.games}試合</div>
                            </div>
                            <Badge variant={deck.winRate >= 50 ? "default" : "secondary"}>{deck.winRate.toFixed(1)}% 勝率</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


