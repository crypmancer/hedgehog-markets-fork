"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Market } from "@/lib/mock-data"
import { useWallet } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { placeBet, getBalance } from "@/lib/solana-utils"

interface TradeModalProps {
  market: Market | null
  isOpen: boolean
  onClose: () => void
}

export function TradeModal({ market, isOpen, onClose }: TradeModalProps) {
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()

  if (!market) return null

  const currentPrice = selectedSide === "yes" ? market.yesPrice : market.noPrice
  const shares = amount ? ((Number.parseFloat(amount) / currentPrice) * 100).toFixed(2) : "0"

  const handleTrade = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to place a bet",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const balance = await getBalance(publicKey)
      console.log("[v0] Wallet balance:", balance, "SOL")

      if (balance < Number.parseFloat(amount)) {
        toast({
          title: "Insufficient balance",
          description: `You need ${amount} SOL but only have ${balance.toFixed(4)} SOL`,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const result = await placeBet(market.id, selectedSide, Number.parseFloat(amount), publicKey)

      console.log("[v0] Bet placed successfully:", result)

      toast({
        title: "Trade successful!",
        description: `Placed ${amount} SOL on ${selectedSide.toUpperCase()} for "${market.question}"`,
      })

      setAmount("")
      onClose()
    } catch (error) {
      console.error("[v0] Error placing bet:", error)

      let errorMessage = "Failed to place bet. Please try again."

      if (error instanceof Error) {
        // Handle specific error cases
        if (error.message.includes("rejected")) {
          errorMessage = "Transaction was rejected by wallet"
        } else if (error.message.includes("timeout") || error.message.includes("Network")) {
          errorMessage = "Network timeout. Please check your connection and try again."
        } else if (error.message.includes("Insufficient")) {
          errorMessage = error.message
        } else if (error.message.includes("limit")) {
          errorMessage = error.message
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Trade failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-balance">{market.question}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!connected && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
              <p className="text-sm text-yellow-500">Please connect your Solana wallet to trade</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant={selectedSide === "yes" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSelectedSide("yes")}
            >
              Yes {market.yesPrice}¢
            </Button>
            <Button
              variant={selectedSide === "no" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSelectedSide("no")}
            >
              No {market.noPrice}¢
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (SOL)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
              step="0.01"
              min="0"
              disabled={!connected}
            />
          </div>

          <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg price</span>
              <span className="font-medium">{currentPrice}¢</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. shares</span>
              <span className="font-medium">{shares}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential return</span>
              <span className="font-medium text-green-500">
                {amount ? `${(Number.parseFloat(shares) - Number.parseFloat(amount)).toFixed(2)} SOL` : "0 SOL"}
              </span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleTrade}
            disabled={!connected || !amount || Number.parseFloat(amount) <= 0 || isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </Button>

          {publicKey && (
            <p className="text-xs text-center text-muted-foreground">
              Wallet: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
