"use client"

import { type FC, type ReactNode, useMemo, useCallback } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import type { WalletError } from "@solana/wallet-adapter-base"
import { useToast } from "@/hooks/use-toast"

require("@solana/wallet-adapter-react-ui/styles.css")

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), [])
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [])
  const { toast } = useToast()

  const onError = useCallback(
    (error: WalletError) => {
      let errorMessage = error.message || "An error occurred with your wallet connection"

      // Handle specific wallet error cases
      if (error.message?.includes("User rejected")) {
        errorMessage = "You rejected the wallet connection request"
      } else if (error.message?.includes("not found")) {
        errorMessage = "Wallet extension not found. Please install Phantom or Solflare."
      } else if (error.message?.includes("already pending")) {
        errorMessage = "Connection already in progress. Please check your wallet."
      }

      toast({
        title: "Wallet Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("[v0] Wallet error:", error)
    },
    [toast],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
