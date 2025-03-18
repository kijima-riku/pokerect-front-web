"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { postMatch } from "@/lib/api/result"  // API呼び出し関数
import { getUserFavoriteDeck, getUserDeck } from "@/lib/api/userDeck"
import type {
    GetUserFavoriteDeckResponse,
    GetUserDeckResponse,
} from "@/lib/type/UserDeckType"
import { getDeckList } from "@/lib/api/deck"
import type { GetDeckListResponse } from "@/lib/type/DeckType"

const formSchema = z.object({
    turnOrder: z.enum(["first", "second"]),
    turns: z.string().min(1, "入力必須です"),
    result: z.enum(["win", "lose"]),
    myDeck: z.number().refine((val) => val > 0, { message: "選択必須です" }),
    opponentDeck: z.number().refine((val) => val > 0, { message: "選択必須です" }),
})

/**
 * DeckSelect コンポーネント
 * @param includeFavorite お気に入りを先頭に表示するかどうか
 * @param value 現在の選択値（数値のデッキID）
 * @param onValueChange 選択変更時のハンドラ（数値）
 */
function DeckSelect({
                        includeFavorite = false,
                        value,
                        onValueChange,
                    }: {
    includeFavorite?: boolean
    value: number
    onValueChange: (value: number) => void
}) {
    const [favoriteDeck, setFavoriteDeck] = useState<GetUserFavoriteDeckResponse>(null)
    const [userDecks, setUserDecks] = useState<GetUserDeckResponse>([])
    const [allDecks, setAllDecks] = useState<GetDeckListResponse>({ decks: [] })

    useEffect(() => {
        async function fetchData() {
            try {
                const fav = await getUserFavoriteDeck()
                const user = await getUserDeck()
                const all = await getDeckList()
                setFavoriteDeck(fav)
                setUserDecks(user)
                setAllDecks(all)
                // デフォルト選択が未設定の場合、favorite があればそれ、なければユーザー登録済みの先頭を設定
                if (!value || value <= 0) {
                    if (fav && includeFavorite) {
                        onValueChange(fav.id)
                    } else if (user.length > 0) {
                        onValueChange(user[0].id)
                    }
                }
            } catch (error) {
                console.error("DeckSelect fetch error:", error)
            }
        }
        fetchData()
    }, [includeFavorite, onValueChange, value])

    // ユーザー登録済みデッキのIDリスト
    const userDeckIds = userDecks.map((deck) => deck.id)
    // 全デッキの一覧
    const otherDecks = allDecks.decks.filter((deck) => !userDeckIds.includes(deck.id))

    return (
        <Select
            value={value ? value.toString() : ""}
            onValueChange={(val) => onValueChange(Number(val))}
        >
            <SelectTrigger>
                <SelectValue placeholder="デッキを選択" />
            </SelectTrigger>
            <SelectContent>
                {includeFavorite && favoriteDeck && (
                    <SelectItem key="favorite" value={favoriteDeck.id.toString()}>
                        お気に入り: {favoriteDeck.main_name}
                    </SelectItem>
                )}
                {userDecks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id.toString()}>
                        {deck.main_name}
                    </SelectItem>
                ))}
                {otherDecks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id.toString()}>
                        {deck.main_name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default function NewRecordPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            turns: "",
            // 初期値は仮に 0 としておき、DeckSelect 内で上書きされる前提
            myDeck: 0,
            opponentDeck: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // フォーム値の変換
        const isFirst = values.turnOrder === "first"
        const turnCount = Number(values.turns)
        const outcome = values.result === "win" ? 1 : 0

        // requestData は MatchInput 型（my_deck, opponent_deck は number）
        const requestData = {
            my_deck: values.myDeck,
            opponent_deck: values.opponentDeck,
            is_first: isFirst,
            outcome,
            turn_count: turnCount,
        }

        try {
            await postMatch(requestData)
            toast.success("記録を追加しました！")
            form.reset()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("記録の追加に失敗しました")
        }
    }

    return (
        <div className="container max-w-2xl py-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="turnOrder"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>手番</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="first" />
                                            </FormControl>
                                            <FormLabel className="font-normal">先行</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="second" />
                                            </FormControl>
                                            <FormLabel className="font-normal">後攻</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="turns"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ターン数</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="result"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>勝敗</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="win" />
                                            </FormControl>
                                            <FormLabel className="font-normal">勝利</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="lose" />
                                            </FormControl>
                                            <FormLabel className="font-normal">敗北</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="myDeck"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>使用デッキ</FormLabel>
                                <FormControl>
                                    <DeckSelect includeFavorite={true} value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="opponentDeck"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>相手のデッキ</FormLabel>
                                <FormControl>
                                    <DeckSelect includeFavorite={false} value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        登録
                    </Button>
                </form>
            </Form>
        </div>
    )
}
