import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

const data = [
    { deck: "Dragon", winRate: 65 },
    { deck: "Shadow", winRate: 58 },
    { deck: "Blood", winRate: 52 },
    { deck: "Haven", winRate: 48 },
    { deck: "Sword", winRate: 45 },
]

export function QuickStats() {
    return (
        <Card>
            <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="deck" />
                        <YAxis />
                        <Bar dataKey="winRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

