import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/features/dashboard/stats-cards"
import { DeckWinRateChart } from "@/components/features/dashboard/deck-stats"
import { DeckUsage } from "@/components/features/dashboard/deck-usage"
import { RecentMatches } from "@/components/features/dashboard/recent-matches"
import { calculateOverallStats } from "@/lib/utils/stats"
import type { Match, DeckStats } from "@/type"

// この関数は実際にはAPIやDBからデータを取得します
async function getInitialData(): Promise<{
  matches: Match[]
  deckStats: DeckStats[]
}> {
  // サンプルデータを生成
  const matches: Match[] = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    result: Math.random() > 0.5 ? "win" : "lose",
    isFirst: Math.random() > 0.5,
    turns: Math.floor(Math.random() * 10) + 5,
    myDeck: ["Dragon", "Shadow", "Blood", "Haven"][Math.floor(Math.random() * 4)],
    opponentDeck: ["Dragon", "Shadow", "Blood", "Haven"][Math.floor(Math.random() * 4)],
  }))

  const deckStats: DeckStats[] = [
    { name: "Dragon", games: 25, winRate: 65, firstWinRate: 60, secondWinRate: 70, averageTurns: 8.5 },
    { name: "Shadow", games: 20, winRate: 55, firstWinRate: 52, secondWinRate: 58, averageTurns: 7.8 },
    { name: "Blood", games: 15, winRate: 48, firstWinRate: 45, secondWinRate: 51, averageTurns: 9.2 },
    { name: "Haven", games: 12, winRate: 58, firstWinRate: 62, secondWinRate: 54, averageTurns: 8.1 },
  ]

  return { matches, deckStats }
}

export const revalidate = 3600 // 1時間ごとに再生成

export default async function Home() {
  const { matches, deckStats } = await getInitialData()
  const overallStats = calculateOverallStats(matches)

  return (
      <div className="container px-4 py-6 space-y-6">
        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsCards stats={overallStats} />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">デッキ別勝率</h2>
            <Suspense fallback={<div>Loading chart...</div>}>
              <DeckWinRateChart stats={deckStats} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">デッキ別使用回数</h2>
            <Suspense fallback={<div>Loading usage stats...</div>}>
              <DeckUsage stats={deckStats} />
            </Suspense>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">最近の対戦</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/records">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Suspense fallback={<div>Loading recent matches...</div>}>
            <RecentMatches matches={matches} />
          </Suspense>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/new">
              対戦記録を追加する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/stats">
              統計情報を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
  )
}

