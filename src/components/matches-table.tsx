"use client"

import {useEffect, useState} from "react"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Match = {
    id: string
    date: Date
    result: "win" | "lose"
    isFirst: boolean
    turns: number
    myDeck: string
    opponentDeck: string
}

const generateSampleData = (count: number): Match[] => {
    const decks = ["Dragon", "Necro", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]
    const results: ("win" | "lose")[] = ["win", "lose"]

    return Array.from({ length: count }, (_, i) => ({
        id: (i + 1).toString(),
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        result: results[Math.floor(Math.random() * results.length)],
        isFirst: Math.random() > 0.5,
        turns: Math.floor(Math.random() * 15) + 5,
        myDeck: decks[Math.floor(Math.random() * decks.length)],
        opponentDeck: decks[Math.floor(Math.random() * decks.length)],
    })).sort((a, b) => b.date.getTime() - a.date.getTime())
}

const data: Match[] = generateSampleData(50)

const columns: ColumnDef<Match>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => format(row.getValue("date"), "yyyy/MM/dd HH:mm"),
    },
    {
        accessorKey: "result",
        header: "Result",
        cell: ({ row }) => (
            <Badge variant={row.getValue("result") === "win" ? "default" : "destructive"}>
                {row.getValue("result") === "win" ? "Win" : "Loss"}
            </Badge>
        ),
    },
    {
        accessorKey: "isFirst",
        header: "Turn Order",
        cell: ({ row }) => (row.getValue("isFirst") ? "First" : "Second"),
    },
    {
        accessorKey: "turns",
        header: "Turns",
    },
    {
        accessorKey: "myDeck",
        header: "My Deck",
    },
    {
        accessorKey: "opponentDeck",
        header: "Opponent's Deck",
    },
]

export function MatchesTable() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    if (isMobile) {
        return (
            <div className="space-y-4">
                {table.getRowModel().rows.map((row) => (
                    <Card key={row.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div>{format(row.getValue("date"), "yyyy/MM/dd HH:mm")}</div>
                                <Badge variant={row.getValue("result") === "win" ? "default" : "destructive"}>
                                    {row.getValue("result") === "win" ? "Win" : "Loss"}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Turn Order</div>
                                    <div>{row.getValue("isFirst") ? "First" : "Second"}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Turns</div>
                                    <div>{row.getValue("turns")}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">My Deck</div>
                                    <div>{row.getValue("myDeck")}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Opponent's Deck</div>
                                    <div>{row.getValue("opponentDeck")}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: table.getPageCount() }, (_, i) => (
                        <Button
                            key={i}
                            variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => table.setPageIndex(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    )
}


