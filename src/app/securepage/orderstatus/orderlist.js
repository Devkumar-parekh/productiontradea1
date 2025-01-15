"use client";
import { CustomDatatable } from "customdatatabledev";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { decodeWithKey, encodeWithKey } from "../../lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// import { SmartAPI } from "smartapi-javascript";
import { createWebSocket } from "../../../socket";
import CustomModal from "../../components/CustomModal";
import BuySellForm from "../../components/BuySellForm";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

function OrderList(props) {
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
    {
      prop: "customCell",
      title: "Orderid",
      cell: (row) => {
        return <>{row?.orderid}</>;
      },
    },
    {
      prop: "customCell",
      title: "Order Status",
      cell: (row) => {
        return <>{row?.orderstatus}</>;
      },
    },
    {
      prop: "customCell",
      title: "Symbol Token",
      cell: (row) => {
        return <>{row?.symboltoken}</>;
      },
    },
    {
      prop: "customCell",
      title: "Trading Symbol",
      cell: (row) => {
        return <>{row?.tradingsymbol}</>;
      },
    },
    {
      prop: "customCell",
      title: "Price",
      cell: (row) => {
        return <>{row?.price}</>;
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
      title: "Description",
      cell: (row) => {
        return (
          <>
            <TooltipBS id={row.uniqueorderid} title={row?.text}>
              {row?.text?.length > 15
                ? `${row?.text?.slice(0, 15)}...`
                : row?.text}
            </TooltipBS>
          </>
        );
      },
    },
    {
      prop: "customCell",
      title: "Transaction Type",
      cell: (row) => {
        return <>{row?.transactiontype}</>;
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
        // console.log("Hello");
      }
    },
  };

  return (
    <div style={{ fontFamily: "math" }}>
      <CustomDatatable {...tableProps} />
    </div>
  );
}

export default OrderList;

// const TooltipBS = ({ id, children, title }) => (
//   <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
//     <span>{children}</span>
//   </OverlayTrigger>
// );

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
