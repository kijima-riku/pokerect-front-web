"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FilterValues = {
    deck: string
    result: string
    turnOrder: string
}

export function RecordsFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const form = useForm<FilterValues>({
        defaultValues: {
            deck: searchParams.get("deck") || "",
            result: searchParams.get("result") || "all",
            turnOrder: searchParams.get("turnOrder") || "all",
        },
    })

    const onSubmit = (data: FilterValues) => {
        const params = new URLSearchParams()
        Object.entries(data).forEach(([key, value]) => {
            if (value && value !== "all") params.append(key, value)
        })
        router.push(`/records?${params.toString()}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="deck"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>デッキ検索</FormLabel>
                                <FormControl>
                                    <Input placeholder="デッキ名を入力..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="result"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>勝敗</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="すべて" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="all">すべて</SelectItem>
                                        <SelectItem value="win">勝利</SelectItem>
                                        <SelectItem value="lose">敗北</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="turnOrder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>手番</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="すべて" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="all">すべて</SelectItem>
                                        <SelectItem value="first">先行</SelectItem>
                                        <SelectItem value="second">後攻</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button type="submit">
                        <Search className="mr-2 h-4 w-4" />
                        検索
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset({
                                deck: "",
                                result: "all",
                                turnOrder: "all",
                            })
                            router.push("/records")
                        }}
                    >
                        <X className="mr-2 h-4 w-4" />
                        リセット
                    </Button>
                </div>
            </form>
        </Form>
    )
}

