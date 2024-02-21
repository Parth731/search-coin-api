"use client";

import { useState, useEffect } from "react";
import Coins from "./components/Coins";
import SearchCoins from "./components/SearchCoins";
import CustomPagination from "./components/CustomPagination";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [perPageRecords, setPerPageRecords] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPagesData, setTotalPagesData] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getCoins = async () => {
      setloading(true);
      const response = await fetch(
        `/api/coins?offset=${page}&size=${perPageRecords}`
      );
      const coins = await response.json();
      setCoins(coins.data.coins);
      if (coins?.data?.stats?.total) {
        console.log(coins?.data);
        setTotalPagesData(coins?.data?.stats?.total);
      }
      setloading(false);
    };

    getCoins();
  }, [page, setCoins]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="text-center">
          <h1 className="font-bold text-6xl mt-14">Crypto Coins</h1>
          <SearchCoins
            getSearchResults={(results) => setCoins(results)}
            page={page}
            perPageRecords={perPageRecords}
          />
          <Coins coins={coins} />

          <div>
            {totalPagesData !== 0 && (
              <CustomPagination
                currentPage={page}
                count={totalPages}
                totalPageCount={Math.ceil(totalPagesData / perPageRecords)}
                perPageRecords={perPageRecords}
                setPerPageRecords={setPerPageRecords}
                onPageChange={(val) => setPage(val)}
                totalRecords={totalPagesData}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// currentPage,
// totalPageCount,
// onPageChange,
// perPageRecords,
// setPerPageRecords,
// totalRecords,
