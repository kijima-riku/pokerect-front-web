"use client"

import { useState } from "react"
import { Star, StarOff, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 仮のデータ（実際はAPIから取得）
const availableDecks = ["Dragon", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]

type UserDeck = {
    id: string
    name: string
    isActive: boolean
    isFavorite: boolean
    addedAt: string
}

export default function SettingsPage() {
    const [userDecks, setUserDecks] = useState<UserDeck[]>([
        {
            id: "1",
            name: "Dragon",
            isActive: true,
            isFavorite: true,
            addedAt: "2024-02-23",
        },
        {
            id: "2",
            name: "Shadow",
            isActive: true,
            isFavorite: false,
            addedAt: "2024-02-23",
        },
        {
            id: "3",
            name: "Blood",
            isActive: false,
            isFavorite: false,
            addedAt: "2024-02-23",
        },
    ])

    const handleAddDeck = (deckName: string) => {
        const newDeck: UserDeck = {
            id: Math.random().toString(),
            name: deckName,
            isActive: true,
            isFavorite: false,
            addedAt: new Date().toISOString().split("T")[0],
        }
        setUserDecks([...userDecks, newDeck])
        toast.success("デッキを追加しました")
    }

    const handleToggleActive = (deckId: string) => {
        setUserDecks(userDecks.map((deck) => (deck.id === deckId ? { ...deck, isActive: !deck.isActive } : deck)))
        toast.success("デッキの状態を更新しました")
    }

    const handleSetFavorite = (deckId: string) => {
        setUserDecks(
            userDecks.map((deck) => ({
                ...deck,
                isFavorite: deck.id === deckId,
            })),
        )
        toast.success("お気に入りデッキを設定しました")
    }

    const handleRemoveDeck = (deckId: string) => {
        setUserDecks(userDecks.filter((deck) => deck.id !== deckId))
        toast.success("デッキを削除しました")
    }

    return (
        <div className="container py-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>デッキ設定</CardTitle>
                    <CardDescription>使用するデッキの管理とお気に入りデッキの設定ができます</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <Select onValueChange={handleAddDeck}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="デッキを追加" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableDecks
                                            .filter((deck) => !userDecks.some((userDeck) => userDeck.name === deck))
                                            .map((deck) => (
                                                <SelectItem key={deck} value={deck}>
                                                    {deck}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>デッキ名</TableHead>
                                    <TableHead>追加日</TableHead>
                                    <TableHead>状態</TableHead>
                                    <TableHead>お気に入り</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userDecks.map((deck) => (
                                    <TableRow key={deck.id}>
                                        <TableCell>{deck.name}</TableCell>
                                        <TableCell>{deck.addedAt}</TableCell>
                                        <TableCell>
                                            <Switch checked={deck.isActive} onCheckedChange={() => handleToggleActive(deck.id)} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => handleSetFavorite(deck.id)}>
                                                {deck.isFavorite ? <Star className="h-4 w-4 fill-primary" /> : <StarOff className="h-4 w-4" />}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveDeck(deck.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

