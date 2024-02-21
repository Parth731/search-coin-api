// import { NextResponse } from "next/server";

// async function fetchCoins() {
//   const response = await fetch(
//     "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
//     {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "d60309a2dbmsh632044c5269d41cp115ad2jsn95dbc3ebd84c",
//         "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//       },
//     }
//   );

//   const coins = await response.json();
//   return coins;
// }

// export async function GET(request) {
//   const coins = await fetchCoins();
//   const { searchParams } = new URL(request.url);
//   console.log(searchParams.get("query"));
//   const query = searchParams.get("query");

//   const filteredCoins = coins.data.coins.filter((coin) => {
//     return (
//       coin.name.toLowerCase().includes(query.toLowerCase()) ||
//       coin.symbol.toLowerCase().includes(query.toLowerCase())
//     );
//   });

//   return NextResponse.json(filteredCoins);
// }

import axios from "axios";
import { NextResponse } from "next/server";

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coins",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    "tiers[0]": "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
    offset: "1",
  },
  headers: {
    "X-RapidAPI-Key": "8efe37cc3amshac52a8ac7c4a243p1db815jsn61e6ce569d9f",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

export async function GET(request) {
  try {
    console.log(request.url);
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const offset = searchParams.get("offset");
    const size = searchParams.get("size");
    console.log(query, offset, size);
    const response = await axios.request({
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: size,
        offset: offset,
      },
      headers: {
        "X-RapidAPI-Key": "8efe37cc3amshac52a8ac7c4a243p1db815jsn61e6ce569d9f",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    });
    console.log(response.data.data.stats);
    const filteredCoins = response.data.data.coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    console.log(filteredCoins);
    return NextResponse.json(filteredCoins);
  } catch (error) {
    console.error(error);
  }
}
