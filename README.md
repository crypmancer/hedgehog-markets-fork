# Prediction Market Platform

A modern prediction market platform inspired by Hedgehog Markets, built with Next.js and Solana Web3 integration. Bet on outcomes across crypto, politics, tech, sports, and entertainment with real wallet connectivity.

## Features

- **Binary Prediction Markets** - Yes/No betting on various events
- **Multi-Category Support** - Crypto, Politics, Tech, Sports, Entertainment
- **Solana Wallet Integration** - Connect with Phantom, Solflare, and other Solana wallets
- **Real-time Search & Filtering** - Find markets by keyword or category
- **Trading Interface** - Interactive modal for placing bets with price calculations
- **Balance Validation** - Checks SOL balance before transactions
- **Error Handling** - Comprehensive notifications for wallet rejections and errors
- **Dark Theme** - Modern, sleek UI with responsive design

## Contact Me

If you have any question or something, feel free to reach out me anytime.
<br>
#### You're always welcome

Telegram: [@crypmancer](https://t.me/cryp_mancer) <br>

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Blockchain**: Solana Web3.js
- **Wallet Adapter**: @solana/wallet-adapter-react
- **Network**: Solana Devnet (for testing)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Solana wallet browser extension (Phantom or Solflare recommended)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd hedgehog-markets-fork
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Wallet Setup

1. Install [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/) browser extension
2. Create or import a wallet
3. Switch to **Devnet** in your wallet settings
4. Get free devnet SOL from [Solana Faucet](https://faucet.solana.com/)

## Usage

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the header
2. Select your preferred wallet (Phantom, Solflare, etc.)
3. Approve the connection request
4. Your wallet address and balance will appear in the header

### Placing a Bet

1. Browse markets or use search/filters to find an event
2. Click on a market card or the "Trade" button
3. Select "Yes" or "No" for your prediction
4. Enter the amount you want to bet
5. Review the estimated shares and potential return
6. Click "Place Trade" to confirm

### Market Categories

- **Crypto**: Cryptocurrency price predictions and ecosystem events
- **Politics**: Elections, policy decisions, and political outcomes
- **Tech**: Product launches, company announcements, tech trends
- **Sports**: Game outcomes, championship winners, player stats
- **Entertainment**: Award shows, box office results, cultural events

## Error Handling

The platform includes comprehensive error handling for:

- **Wallet Connection Rejected**: User-friendly message when connection is declined
- **Insufficient Balance**: Alerts when you don't have enough SOL
- **Network Issues**: Timeout and connectivity error handling
- **Transaction Failures**: Detailed error messages for failed trades
- **Wallet Not Installed**: Prompts to install a compatible wallet

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx           # Main marketplace page
│   ├── layout.tsx         # Root layout with wallet provider
│   └── globals.css        # Global styles and design tokens
├── components/
│   ├── header.tsx         # Navigation and wallet connection
│   ├── hero.tsx           # Hero section
│   ├── category-filter.tsx # Category filtering
│   ├── market-card.tsx    # Individual market display
│   ├── trade-modal.tsx    # Trading interface
│   └── wallet-provider.tsx # Solana wallet configuration
└── lib/
    ├── mock-data.ts       # Market mock data
    └── solana-utils.ts    # Solana helper functions
\`\`\`

## Mock Data

The platform currently uses mock data for demonstration. Markets include:
- Volume and liquidity stats
- Yes/No prices (totaling 100¢)
- Expiration dates
- Category tags

In production, this would be replaced with real on-chain data from Solana programs.

## Development Notes

### Network Configuration

- Currently configured for **Solana Devnet**
- RPC endpoint: `https://api.devnet.solana.com`
- To switch to mainnet, update the endpoint in `components/wallet-provider.tsx`

### Betting Logic

The current implementation simulates blockchain transactions. To make it production-ready:
1. Deploy a Solana program (smart contract) for market creation and betting
2. Replace `placeBet()` in `lib/solana-utils.ts` with real transaction logic
3. Implement proper escrow and settlement mechanisms
4. Add oracle integration for outcome verification

### Security Considerations

- Always validate user input
- Implement rate limiting for API calls
- Use proper error boundaries for wallet errors
- Test thoroughly on devnet before mainnet deployment

## Customization

### Updating Colors

Edit the design tokens in `app/globals.css`:
\`\`\`css
--primary: ...;
--secondary: ...;
--accent: ...;
\`\`\`

### Adding New Markets

Update `lib/mock-data.ts` with new market data:
\`\`\`typescript
{
  id: 'new-market',
  title: 'Your question?',
  category: 'crypto',
  yesPrice: 55,
  noPrice: 45,
  volume: '100K',
  liquidity: '250K',
  endsAt: '2024-12-31',
}
\`\`\`

## Future Enhancements

- [ ] Real Solana program integration
- [ ] Market creation interface
- [ ] User portfolio dashboard
- [ ] Historical price charts
- [ ] Social features (comments, sharing)
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Liquidity provision mechanism

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project as a starting point for your own prediction market platform.

## Acknowledgments

- Inspired by [Hedgehog Markets](https://www.hedgehog.markets)
- Built with [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Solana](https://solana.com/)
