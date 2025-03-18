import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/features/dashboard/stats-cards"
import { DeckWinRateChart } from "@/components/features/dashboard/deck-stats"
import { DeckUsage } from "@/components/features/dashboard/deck-usage"
import { RecentMatches } from "@/components/features/dashboard/recent-matches"
import { getOverallStats, getDecksStats } from "@/lib/api/stats"
import { getMatchResult } from "@/lib/api/result"

export default async function Home() {
  const [overallStats, deckStats, matchResults] = await Promise.all([
    getOverallStats(),
    getDecksStats(),
    getMatchResult({})
  ])


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
            <RecentMatches matches={matchResults} />
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
