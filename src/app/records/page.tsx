// pages/records.tsx
import { Suspense } from "react"
import { RecordsFilter } from "@/components/features/records/records-filter"
import { MatchesTable } from "@/components/features/records/matches-table"
import type { GetMatchResultResponse } from "@/lib/type/ResultType"
import { getMatchResult } from "@/lib/api/result"

export default async function RecordsPage() {
    const initialMatches: GetMatchResultResponse = await getMatchResult({})

    return (
        <div className="container py-6 space-y-6">
            <RecordsFilter />
            <Suspense fallback={<div>Loading matches...</div>}>
                <MatchesTable initialMatches={initialMatches} />
            </Suspense>
        </div>
    )
}
