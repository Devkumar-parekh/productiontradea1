"use client";
import { useEffect, useState } from "react";
import Watchlist from "../watchlist/watchlist";
import Instruments from "./Instruments";
import axios from "axios";

export default function Page(props) {
  const [watchListData, setwatchListData] = useState([]);
  const [refreshwatchlist, setrefreshwatchlist] = useState(1);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/watchlist");
      console.log(data.data);
      setwatchListData(data.data);
    })();
  }, [refreshwatchlist]);
  return (
    <main>
      <>
        <Instruments setrefreshwatchlist={setrefreshwatchlist} />

        <h2>Watch-List</h2>
        <Watchlist
          data={watchListData}
          setrefreshwatchlist={setrefreshwatchlist}
        />
      </>
    </main>
  );
}
