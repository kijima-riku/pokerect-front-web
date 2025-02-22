import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const recentDecks = [
    { name: "Dragon", games: 15, winRate: 66.7 },
    { name: "Shadow", games: 12, winRate: 58.3 },
    { name: "Blood", games: 10, winRate: 50.0 },
    { name: "Haven", games: 8, winRate: 62.5 },
]

export function RecentDecks() {
    return (
        <Card>
            <CardContent className="pt-4">
                <div className="space-y-4">
                    {recentDecks.map((deck) => (
                        <div key={deck.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <div className="font-medium">{deck.name}</div>
                                <div className="text-sm text-muted-foreground">{deck.games} games played</div>
                            </div>
                            <Badge variant={deck.winRate >= 50 ? "default" : "secondary"}>{deck.winRate}% WR</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

