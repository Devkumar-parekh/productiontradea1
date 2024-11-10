"use client";
import { CustomDatatable } from "customdatatabledev";
import React from "react";
import { decodeWithKey } from "../../lib/utils";

function Clients(props) {
  const TableHead = [
    {
      prop: "customCell",
      title: "Client Code",
      cell: (row) => {
        return <>{decodeWithKey(row?.client_code)}</>;
      },
    },
    // { prop: "name", title: "Name" },
  ];
  const tableProps = {
    Pagination: "false",
    SearchFilter: "false",
    classes: "",
    recordPerPageProp: 10,
    id: "1",
    useref: null,
    printOption: false,
    pdfOption: true,
    isResponsive: true,
    TableBody: props.data,
    TableHead: TableHead,
    tableClasses: "table-dark table-hover table-striped", //you can do the changes as needed these are bootstrap classes
    theadClasses: "table-primary", //you can do the changes as needed these are bootstrap classes
    tbodyClasses: "table-success", //you can do the changes as needed these are bootstrap classes
  };
  return (
    <div>
      <CustomDatatable {...tableProps} />
    </div>
  );
}

export default Clients;
