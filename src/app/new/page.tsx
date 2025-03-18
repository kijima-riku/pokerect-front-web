"use client"

import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { getUserFavoriteDeck, getUserDeck } from "@/lib/api/userDeck"
import type { GetUserFavoriteDeckResponse, GetUserDeckResponse } from "@/lib/type/UserDeckType"
import {getDeckList} from "@/lib/api/deck";
import {GetDeckListResponse} from "@/lib/type/DeckType";

export default function DeckSelector() {
    const [favoriteDeck, setFavoriteDeck] = useState<GetUserFavoriteDeckResponse>(null)
    const [userDecks, setUserDecks] = useState<GetUserDeckResponse>([])
    const [allDecks, setAllDecks] = useState<GetDeckListResponse>({ decks: [] })
    const [selectedDeck, setSelectedDeck] = useState<string>("")

    useEffect(() => {
        async function fetchData() {
            try {
                const fav = await getUserFavoriteDeck()
                const user = await getUserDeck()
                const all = await getDeckList()
                setFavoriteDeck(fav)
                setUserDecks(user)
                setAllDecks(all)
                if (fav) {
                    setSelectedDeck(fav.main_name.toLowerCase())
                } else if (user.length > 0) {
                    setSelectedDeck(user[0].main_name.toLowerCase())
                }
            } catch (error) {
                console.error("DeckSelector fetch error:", error)
            }
        }
        fetchData()
    }, [])

    // ユーザー登録済みデッキの名前配列（小文字）
    const userDeckNames = userDecks.map((deck) => deck.main_name.toLowerCase())
    // 全デッキの名前配列（小文字）; Selectのために all.decks を利用
    const allDeckNames = allDecks.decks.map((deck) => deck.main_name.toLowerCase())
    // その他のデッキ：全デッキからユーザー登録済みデッキを除外
    const otherDeckNames = allDeckNames.filter((name) => !userDeckNames.includes(name))

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">使用デッキを選択</h2>
            <Select value={selectedDeck} onValueChange={setSelectedDeck}>
                <SelectTrigger>
                    <SelectValue placeholder="デッキを選択" />
                </SelectTrigger>
                <SelectContent>
                    {/* お気に入りがあれば一番上に表示 */}
                    {favoriteDeck && (
                        <SelectItem key="favorite" value={favoriteDeck.main_name.toLowerCase()}>
                            お気に入り: {favoriteDeck.main_name}
                        </SelectItem>
                    )}
                    {/* ユーザ登録済みのデッキ */}
                    {userDecks.map((deck) => (
                        <SelectItem key={deck.id} value={deck.main_name.toLowerCase()}>
                            {deck.main_name}
                        </SelectItem>
                    ))}
                    {/* その他のデッキ */}
                    {otherDeckNames.map((name) => (
                        <SelectItem key={name} value={name}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
