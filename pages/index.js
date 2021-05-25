import Head from "next/head";
import Image from "next/image";
import Coin from "../Components/Coins";
import CoinList from "../Components/Coins/CoinList";
import Layout from "../Components/Layout";
import Logo from "../Components/Logo";
import SearchBar from "../Components/Search-bar";

export default function Home({ filteredCoins }) {
  return (
    <div>
      <Layout />
      <main>
        <Logo />
        <SearchBar type="text" />
        <CoinList filteredCoins={filteredCoins} />
      </main>

      <footer>Made with ♥ by Rishita</footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false`
  );
  const filteredCoins = await res.json();

  if (!filteredCoins) {
    return {
      notFound: true,
    };
  }

  return {
    props: { filteredCoins }, // will be passed to the page component as props
  };
}
