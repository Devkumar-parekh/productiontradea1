import React from "react";
import Forms from "./Forms";
import jsonObj from "../lib/formsfields.json";
import { addClient } from "../lib/actions";

function BuySellForm(props) {
  return (
    <div>
      <Forms
        handleForm={props.handleForm}
        formfields={jsonObj["buysellfrom"]}
        btn={"Buy/Sell"}
        dropdowndata={props.dropdowndata}
      />
    </div>
  );
}

export default BuySellForm;
