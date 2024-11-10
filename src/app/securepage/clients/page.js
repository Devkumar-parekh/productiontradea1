import React from "react";
import Forms from "../../components/Forms";
import jsonObj from "../../lib/formsfields.json";
import { addClient } from "../../lib/actions";

function Page() {
  return (
    <div>
      <Forms
        handleAction={addClient}
        formfields={jsonObj["clientform"]}
        btn={"Submit"}
      />
    </div>
  );
}

export default Page;
