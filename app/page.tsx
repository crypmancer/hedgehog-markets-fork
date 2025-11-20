"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/category-filter"
import { MarketCard } from "@/components/market-card"
import { Hero } from "@/components/hero"
import { TradeModal } from "@/components/trade-modal"
import { mockMarkets, type Market } from "@/lib/mock-data"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)

  const filteredMarkets = mockMarkets.filter((market) => {
    const matchesCategory = selectedCategory === "all" || market.category === selectedCategory
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleTrade = (market: Market) => {
    setSelectedMarket(market)
    setIsTradeModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} onTrade={handleTrade} />
          ))}
        </div>
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No markets found</p>
          </div>
        )}
      </main>

      <TradeModal market={selectedMarket} isOpen={isTradeModalOpen} onClose={() => setIsTradeModalOpen(false)} />
    </div>
  )
}
