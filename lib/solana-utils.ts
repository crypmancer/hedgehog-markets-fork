import { Connection, type PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"

// Initialize connection to Solana
export const connection = new Connection("https://api.devnet.solana.com", "confirmed")

// Get SOL balance
export async function getBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error("[v0] Error getting balance:", error)
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error("Network timeout. Please check your connection and try again.")
      }
      if (error.message.includes("429")) {
        throw new Error("Rate limited. Please wait a moment and try again.")
      }
      throw new Error(`Failed to fetch balance: ${error.message}`)
    }
    throw new Error("Failed to fetch balance")
  }
}

// Create a simple transfer transaction (example)
export async function createTransferTransaction(
  fromPubkey: PublicKey,
  toPubkey: PublicKey,
  amount: number,
): Promise<Transaction> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    }),
  )

  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = fromPubkey

  return transaction
}

// Place a bet (in a real app, this would interact with a program)
export async function placeBet(
  marketId: string,
  position: "yes" | "no",
  amount: number,
  walletPublicKey: PublicKey,
): Promise<{ signature: string }> {
  console.log("[v0] Placing bet:", { marketId, position, amount, wallet: walletPublicKey.toBase58() })

  // Validate inputs
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0")
  }

  if (amount > 10) {
    throw new Error("Amount exceeds maximum bet limit of 10 SOL")
  }

  try {
    // In a real implementation, you would:
    // 1. Create an instruction to interact with your prediction market program
    // 2. Build and sign the transaction
    // 3. Send the transaction to the network
    // 4. Wait for confirmation

    // Mock response for now with simulated error scenarios
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random network errors occasionally
        const randomError = Math.random()
        if (randomError < 0.1) {
          reject(new Error("Network error. Please try again."))
        } else {
          resolve({ signature: "mock_signature_" + Math.random().toString(36).substring(7) })
        }
      }, 1000)
    })
  } catch (error) {
    console.error("[v0] Error placing bet:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to place bet. Please try again.")
  }
}

// Get market data from on-chain (mock for now)
export async function getMarketData(marketId: string) {
  console.log("[v0] Fetching market data for:", marketId)

  // In a real implementation, you would:
  // 1. Fetch the market account data from your program
  // 2. Deserialize the account data
  // 3. Return the market information

  return null
}
