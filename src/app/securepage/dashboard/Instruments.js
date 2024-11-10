"use client";
import React, { useState } from "react";
import InputText from "../../components/InputText";
import CustomModal from "../../components/CustomModal";
import BuySellForm from "../../components/BuySellForm";
import { getInstrument } from "../../lib/actions";
import { CustomDatatable } from "customdatatabledev";
function Instruments() {
  const [formdata, setFormdata] = useState({
    instrument: "",
  });

  const [data, setData] = useState([]);

  const handleFormdata = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const TableHead = [
    { prop: "symbol", title: "Symbol" },
    {
      prop: "customCell",
      title: "Action",
      cell: (row) => {
        const tempd = new Date();
        return (
          <>
            <div className="text-center" style={{ maxWidth: "300px" }}>
              <CustomModal
                btnText="Buy"
                headerTitle={`Buy ${row?.symbol}`}
                modalBody={
                  <span id={tempd}>
                    <BuySellForm />
                  </span>
                }
              />
            </div>
          </>
        );
      },
    },
    { prop: "name", title: "Name" },
    { prop: "lotsize", title: "Lot Size" },
    { prop: "strike", title: "Strike" },
    { prop: "instrumenttype", title: "Instrument Type" },
    { prop: "exch_seg", title: "Exch seg" },
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
    TableBody: data,
    TableHead: TableHead,
    tableClasses: "table-dark table-hover table-striped", //you can do the changes as needed these are bootstrap classes
    theadClasses: "table-primary", //you can do the changes as needed these are bootstrap classes
    tbodyClasses: "table-success", //you can do the changes as needed these are bootstrap classes
  };

  return (
    <div>
      <>
        <div className="d-flex  justify-content-between">
          <h2>Instruments</h2>
          <form
            name="InstrumentsForm"
            action={async (data) => {
              const temp = await getInstrument(data);
              console.log(temp);
              setData(temp);
            }}
            className="d-flex align-items-center"
          >
            <InputText
              text={""}
              placeholder={"Instrument..."}
              name={"searchstring"}
              value={formdata?.searchstring}
              onChange={(e) => {
                handleFormdata(e);
                if (e.target.value?.length > 3)
                  document.InstrumentsForm.requestSubmit();
              }}
              className={"d-inline"}
            />
            <div>
              <button
                // className={styles.primary}
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          className="table-responsive maxh-500"
          style={{ fontFamily: "math" }}
        >
          <CustomDatatable {...tableProps} />
          {/* {data?.map((dataitem, index) => {
            return <div key={index}>{dataitem.symbol}</div>;
          })} */}
        </div>
      </>
    </div>
  );
}

export default Instruments;
