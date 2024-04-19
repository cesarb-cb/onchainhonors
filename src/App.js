
import {
  ConnectWallet, useNFTs, useContract,
  useMintNFT, Web3Button
} from "@thirdweb-dev/react";
import "./styles/Home.css";
const process = require('process');

export default function Home() {
  const { contract } = useContract(process.env.WALLET_ADDRESS); // replace '0x...' with your contract address
  const { data: nfts, isLoadingNFT } = useNFTs(contract);
  const {
    mutateAsync: mintNft,
    isLoading,
    error,
  } = useMintNFT(contract);

  let nftElement;

  if (isLoadingNFT) {
    nftElement = <div>Loading...</div>;
  }
  if (!nfts) {
    nftElement = "! nfts</div>";
  }
  if (nfts?.length === 0) {
    nftElement = "NFTs length is 0";
  }
  if (nfts?.error) {
    nftElement = "Error: {nfts.error.message}</div>";
  }
  if (nfts) {
    nftElement = JSON.stringify(nfts);
  }

  return (
    <main className="main">
      <div className="container">
        <div className="header">

          <div>
            <Web3Button
              contractAddress={process.env.CONTRACT_ADDRESS}
              action={() =>{
                mintNft({
                  metadata: {
                    name: "My NFT",
                    description: "This is my NFT",
                    image: "https://i.seadn.io/s/raw/files/5203cc97c7c8e602c0adc5f789224c77.png?auto=format&dpr=1&w=1000", // Accepts any URL or File type
                  },
                  to: "0xF0A2516C6a9C0B6B775dF2d4E09E81268492dcB7", // Use useAddress hook to get current wallet address
                })
              }}
            >
              Mint NFT
            </Web3Button>
          </div>

        </div>
      </div>
    </main>
  );
}
