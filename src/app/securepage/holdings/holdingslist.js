"use client";
import { CustomDatatable } from "customdatatabledev";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { decodeWithKey, encodeWithKey } from "../../lib/utils";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

function HoldingsList(props) {
  console.log(props.data);
  const TableHead = [
    {
      prop: "customCell",
      title: "Client",
      cell: (row) => {
        return (
          <>
            {decodeWithKey(row?.fname)} {decodeWithKey(row?.lname)}
          </>
        );
      },
    },
    // {
    //   prop: "customCell",
    //   title: "Symbol Token",
    //   cell: (row) => {
    //     return <>{row?.symboltoken}</>;
    //   },
    // },
    {
      prop: "customCell",
      title: "Stock Name",
      cell: (row) => {
        return <>{row?.tradingsymbol}</>;
      },
    },
    {
      prop: "customCell",
      title: "Quantity",
      cell: (row) => {
        return <>{row?.quantity}</>;
      },
    },
    {
      prop: "customCell",
      title: "Average Price",
      cell: (row) => {
        return <>{row?.averageprice}</>;
      },
    },
    {
      prop: "customCell",
      title: "LTP",
      cell: (row) => {
        return <>{row?.ltp}</>;
      },
    },
    {
      prop: "customCell",
      title: "Close",
      cell: (row) => {
        return <>{row?.close}</>;
      },
    },
    {
      prop: "customCell",
      title: "Inv. Amt",
      cell: (row) => {
        return (
          // <>{(row?.quantity * row?.ltp).toFixed(2) - row?.profitandloss}</>
          <>{((row?.profitandloss * 100) / row?.pnlpercentage).toFixed(2)}</>
        );
      },
    },
    {
      prop: "customCell",
      title: "Mkt. Value",
      cell: (row) => {
        return <>{(row?.quantity * row?.ltp).toFixed(2)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Total G/L",
      cell: (row) => {
        return (
          <span
            className={`fw-bold ${
              row?.profitandloss >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {row?.profitandloss} ({row?.pnlpercentage}%)
          </span>
        );
      },
    },
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
    onscroll: async (e) => {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        console.log("Hello");
      }
    },
  };

  return (
    <div style={{ fontFamily: "math" }}>
      <CustomDatatable {...tableProps} />
    </div>
  );
}

export default HoldingsList;

function TooltipBS({ id, children, title }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <div
        ref={target}
        style={{ cursor: "pointer" }}
        onClick={() => setShow(!show)}
      >
        {children}
      </div>
      <Overlay target={target.current} show={show} placement="right">
        <Tooltip id={id}>{title}</Tooltip>
      </Overlay>
    </>
  );
}
