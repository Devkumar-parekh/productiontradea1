import React from "react";
import Forms from "./Forms";
import jsonObj from "../lib/formsfields.json";
import { addClient } from "../lib/actions";

function BuySellForm() {
  return (
    <div>
      <Forms
        // handleAction={addClient}
        handleAction={() => {
          console.log("handleAction called");
        }}
        formfields={jsonObj["buysellfrom"]}
        btn={"Buy/Sell"}
      />
    </div>
  );
}

export default BuySellForm;
