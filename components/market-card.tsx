"use client"

import { TrendingUp, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Market } from "@/lib/mock-data"

interface MarketCardProps {
  market: Market
  onTrade: (market: Market) => void
}

export function MarketCard({ market, onTrade }: MarketCardProps) {
  return (
    <Card
      className="p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer bg-card border-border"
      onClick={() => onTrade(market)}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base leading-tight mb-2 text-balance">{market.question}</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 bg-secondary rounded text-foreground">{market.category}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {market.endsIn}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
          <span className="font-medium">Yes</span>
          <div className="text-right">
            <div className="font-bold text-lg text-green-500">{market.yesPrice}¢</div>
            <div className="text-xs text-muted-foreground">{market.yesPercentage}%</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
          <span className="font-medium">No</span>
          <div className="text-right">
            <div className="font-bold text-lg text-red-500">{market.noPrice}¢</div>
            <div className="text-xs text-muted-foreground">{market.noPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>{market.volume} vol</span>
        </div>
        <Button
          size="sm"
          className="h-8"
          onClick={(e) => {
            e.stopPropagation()
            onTrade(market)
          }}
        >
          Trade
        </Button>
      </div>
    </Card>
  )
}
