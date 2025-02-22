import { Suspense } from "react"
import { RecordsFilter } from "@/components/features/records/records-filter"
import { MatchesTable } from "@/components/features/records/matches-table"
import type { Match } from "@/type"

// この関数は実際にはAPIやDBからデータを取得します
async function getMatches(): Promise<Match[]> {
    return []
}

export default async function RecordsPage() {
    const initialMatches = await getMatches()

    return (
        <div className="container py-6 space-y-6">
            <RecordsFilter />
            <Suspense fallback={<div>Loading matches...</div>}>
                <MatchesTable initialMatches={initialMatches} />
            </Suspense>
        </div>
    )
}

