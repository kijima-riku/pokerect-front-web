import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Card Game Stats",
    description: "Track your card game match results",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
                <header className="border-b">
                    <div className="container flex h-16 items-center px-4">
                        <MainNav />
                    </div>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}

