"use client"

import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Match } from "@/type"

export function RecentMatches({ matches }: { matches: Match[] }) {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
                {matches.map((match) => (
                    <Card key={match.id} className="w-[300px] shrink-0">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{format(new Date(match.date), "MM/dd HH:mm")}</div>
                                <Badge variant={match.result === "win" ? "default" : "destructive"}>
                                    {match.result === "win" ? "勝利" : "敗北"}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                <div>
                                    <div className="text-muted-foreground">手番</div>
                                    <div>{match.isFirst ? "先行" : "後攻"}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">ターン数</div>
                                    <div>{match.turns}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">使用デッキ</div>
                                    <div>{match.myDeck}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">相手のデッキ</div>
                                    <div>{match.opponentDeck}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

