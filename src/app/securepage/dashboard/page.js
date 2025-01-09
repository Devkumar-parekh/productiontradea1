import { getWatchList } from "../../lib/actions";
import Watchlist from "../watchlist/watchlist";
import Instruments from "./Instruments";

export default async function Page() {
  const watchListData = await getWatchList();
  return (
    <main>
      {/* <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1> */}
      <>
        {/* api_key: "", client_code: "", password: "", totp: "", type: "", */}
        {/* <Instruments /> */}

        <h2>Watch-List</h2>
        <Watchlist data={watchListData} />
      </>
    </main>
  );
}
