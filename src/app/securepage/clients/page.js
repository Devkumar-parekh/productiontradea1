import React from "react";
import Forms from "../../components/Forms";
import jsonObj from "../../lib/formsfields.json";
import { addClient, getClients } from "../../lib/actions";
import { decodeWithKey } from "../../lib/utils";
import { CustomDatatable } from "customdatatabledev";
import Clients from "./clients";

async function Page() {
  const clients = await getClients();

  return (
    <div>
      <Forms
        handleAction={addClient}
        formfields={jsonObj["clientform"]}
        btn={"Submit"}
      />
      <Clients data={clients} />
      {/* <CustomDatatable {...tableProps} /> */}
    </div>
  );
}

export default Page;
