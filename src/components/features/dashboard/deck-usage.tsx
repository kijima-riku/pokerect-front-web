"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GetDecksStatsResponse} from "@/lib/type/StatsType";

export function DeckUsage({ stats }: { stats: GetDecksStatsResponse }) {
    const sortedStats = [...stats].sort((a, b) => b.total_matches - a.total_matches)

    return (
        <Card>
            <CardContent className="pt-4">
                <div className="space-y-4">
                    {sortedStats.map((deck) => (
                        <div key={deck.deck_id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <div className="font-medium">{deck.deck_id}</div>
                                <div className="text-sm text-muted-foreground">{deck.total_matches}試合</div>
                            </div>
                            <Badge variant={deck.win_rate >= 50 ? "default" : "secondary"}>{deck.win_rate.toFixed(1)}% 勝率</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


