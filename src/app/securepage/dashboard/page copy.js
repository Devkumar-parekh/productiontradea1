import { getWatchList } from "../../lib/actions";
import Watchlist from "../watchlist/watchlist";
import Instruments from "./Instruments";

export default async function Page(props) {
  const watchListData = await getWatchList();
  return (
    <main>
      <>
        <Instruments />

        <h2>Watch-List</h2>
        <Watchlist data={watchListData} />
      </>
    </main>
  );
}
