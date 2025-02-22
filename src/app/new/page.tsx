"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

const formSchema = z.object({
    turnOrder: z.enum(["first", "second"]),
    turns: z.string().min(1, "入力必須です"),
    result: z.enum(["win", "lose"]),
    myDeck: z.string().min(1, "入力必須です"),
    opponentDeck: z.string().min(1, "入力必須です"),
})

const decks = ["Dragon", "Necro", "Shadow", "Blood", "Haven", "Sword", "Forest", "Portal", "Rune"]

export default function NewRecordPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            turns: "",
            myDeck: "",
            opponentDeck: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast.success("記録を追加しました！")
        form.reset()
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
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="デッキを選択" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {decks.map((deck) => (
                                            <SelectItem key={deck} value={deck.toLowerCase()}>
                                                {deck}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="デッキを選択" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {decks.map((deck) => (
                                            <SelectItem key={deck} value={deck.toLowerCase()}>
                                                {deck}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

