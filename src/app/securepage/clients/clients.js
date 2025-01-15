"use client";
import { CustomDatatable } from "customdatatabledev";
import React from "react";
import { decodeWithKey } from "../../lib/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

function Clients(props) {
  const router = useRouter();

  const TableHead = [
    {
      prop: "customCell",
      title: "First Name",
      cell: (row) => {
        return <>{decodeWithKey(row?.fname)}</>;
      },
      issortable: false,
    },
    {
      prop: "customCell",
      title: "Last Name",
      cell: (row) => {
        return <>{decodeWithKey(row?.lname)}</>;
      },
      issortable: false,
    },
    {
      prop: "customCell",
      title: "Client Code",
      cell: (row) => {
        return <>{decodeWithKey(row?.client_code)}</>;
      },
      issortable: false,
    },
    {
      prop: "customCell",
      title: "Action",
      cell: (row) => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this client?")) {
                const temp = await axios.post("/api/delete", {
                  _id: row._id,
                  tbl: "client",
                });
                router.refresh();
              }
            }}
          >
            Delete
          </button>
        );
      },
      issortable: false,
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
