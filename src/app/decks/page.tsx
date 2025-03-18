"use client"

import { useEffect, useState } from "react"
import { Star, StarOff, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    getUserDeck,
    postUserDeck,
    getUserFavoriteDeck,
    patchUserFavoriteDeck,
    deleteUserDeck,
} from "@/lib/api/userDeck"
import type {
    GetUserDeckResponse,
} from "@/lib/type/UserDeckType"

// 利用可能なデッキ（実際は getDeckList で取得するのが望ましいが、ここではダミー）
const availableDecks = ["Dragon", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]

// ダミーのデッキ名→デッキID マッピング
const deckIdMapping: Record<string, number> = {
    dragon: 1,
    shadow: 2,
    blood: 3,
    haven: 4,
    sword: 5,
    forest: 6,
    portal: 7,
    rune: 8,
}

export default function SettingsPage() {
    const [userDecks, setUserDecks] = useState<GetUserDeckResponse>([])
    // 初回取得したお気に入りのデッキID（string形式）を保存
    const [initialFavoriteId, setInitialFavoriteId] = useState<number | null>(null)
    // ユーザが選んだお気に入り（未送信の変更状態）
    const [pendingFavorite, setPendingFavorite] = useState<number | null>(null)
    const [availableDeckList] = useState<string[]>(availableDecks)

    // API から最新のユーザーデッキ情報を取得
    const fetchUserDecks = async () => {
        try {
            const user = await getUserDeck()
            const fav = await getUserFavoriteDeck()
            setUserDecks(user)
            if (fav) {
                setInitialFavoriteId(fav.id)
                // 初期状態の pendingFavorite としても設定
                setPendingFavorite(fav.id)
            }
        } catch (error) {
            console.error("Error fetching user decks:", error)
        }
    }

    useEffect(() => {
        fetchUserDecks()
        // もし availableDeckList を API で取得するなら以下のように:
        // getDeckList().then(all => setAvailableDeckList(all.decks.map(deck => deck.main_name)))
    }, [])

    // コンポーネントのアンマウント時に、ローカルのお気に入り変更があれば patch リクエストを送信
    useEffect(() => {
        return () => {
            if (pendingFavorite && pendingFavorite !== initialFavoriteId) {
                // patchUserFavoriteDeck は非同期だが、ここでは fire-and-forget
                patchUserFavoriteDeck({ deck_id: Number(pendingFavorite) })
                    .then(() => {
                        console.log("お気に入り更新完了")
                    })
                    .catch((err) => {
                        console.error("お気に入り更新失敗:", err)
                    })
            }
        }
    }, [pendingFavorite, initialFavoriteId])

    // デッキ追加（postUserDeck）→最新情報再取得
    const handleAddDeck = async (deckName: string) => {
        try {
            const deckId = deckIdMapping[deckName.toLowerCase()]
            if (!deckId) {
                toast.error("無効なデッキ名です")
                return
            }
            await postUserDeck({ deck_id: deckId })
            toast.success("デッキを追加しました")
            fetchUserDecks()
        } catch (error) {
            console.error("Error adding deck:", error)
            toast.error("デッキの追加に失敗しました")
        }
    }

    // お気に入り更新：ローカル state のみ更新
    const handleSetFavorite = (deckId: number) => {
        // ユーザーデッキ全体を更新して、対象のデッキだけ isFavorite true にする
        setUserDecks((prev) =>
            prev.map((deck) => ({
                ...deck,
                isFavorite: deck.id === deckId,
            })),
        )
        // ローカルの pendingFavorite を更新
        setPendingFavorite(deckId)
        toast.success("お気に入りデッキを変更しました")
    }

    // デッキ削除：deleteUserDeck を呼び出して再取得
    const handleRemoveDeck = async (deckId: number) => {
        try {
            await deleteUserDeck({ deck_id: Number(deckId) })
            toast.success("デッキを削除しました")
            fetchUserDecks()
        } catch (error) {
            console.error("Error removing deck:", error)
            toast.error("デッキの削除に失敗しました")
        }
    }

    return (
        <div className="container py-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>デッキ設定</CardTitle>
                    <CardDescription>
                        使用するデッキの管理とお気に入りデッキの設定ができます
                    </CardDescription>
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
                                        {availableDeckList
                                            .filter(
                                                (deck) =>
                                                    !userDecks.some(
                                                        (userDeck) =>
                                                            userDeck.main_name.toLowerCase() === deck.toLowerCase(),
                                                    ),
                                            )
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
                                    <TableHead>お気に入り</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userDecks.map((deck) => (
                                    <TableRow key={deck.id}>
                                        <TableCell>{deck.main_name}{deck.sub_name}</TableCell>
                                        <TableCell>{deck.created_at.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleSetFavorite(deck.id)}
                                            >
                                                {pendingFavorite ? (
                                                    <Star className="h-4 w-4 fill-primary" />
                                                ) : (
                                                    <StarOff className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveDeck(deck.id)}
                                            >
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
