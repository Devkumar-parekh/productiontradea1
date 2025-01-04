import React from "react";
import Forms from "../../components/Forms";
import jsonObj from "../../lib/formsfields.json";
import { addWatchList, getWatchList } from "../../lib/actions";
import Watchlist from "./watchlist";

async function Page() {
  const watchListData = await getWatchList();

  return (
    <div>
      {/* <Forms
        handleAction={addWatchList}
        formfields={jsonObj["watchlistform"]}
        btn={"Submit"}
      /> */}
      <h2>Watch-List</h2>
      <Watchlist data={watchListData} />
    </div>
  );
}

export default Page;
