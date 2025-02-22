"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const routes = [
    {
        href: "/",
        label: "ホーム",
    },
    {
        href: "/records",
        label: "記録",
    },
    {
        href: "/new",
        label: "新規記録",
    },
    {
        href: "/stats",
        label: "統計",
    },
    {
        href: "/decks",
        label: "デッキ",
    },
]

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-xl font-bold">
                Card Stats
            </Link>
            <nav className="flex items-center space-x-2 ml-6">
                {routes.map((route) => (
                    <Button key={route.href} variant={pathname === route.href ? "secondary" : "ghost"} asChild>
                        <Link href={route.href}>{route.label}</Link>
                    </Button>
                ))}
            </nav>
        </div>
    )
}

