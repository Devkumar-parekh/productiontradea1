"use client";
import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import CustomModal from "../../components/CustomModal";
import BuySellForm from "../../components/BuySellForm";
import { addWatchList, getInstrument } from "../../lib/actions";
import { CustomDatatable } from "customdatatabledev";
import { useSelector } from "react-redux";
import axios from "axios";
import { Accordion, Button, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/navigation";
function Instruments(props) {
  const router = useRouter();

  const [nextpageid, setnextpageid] = useState("");
  const [formdata, setFormdata] = useState({
    instrument: "",
  });

  const [loaders, setloaders] = useState({});

  const addLoader = (key, value) => {
    setloaders((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const [data, setData] = useState([]);

  const handleFormdata = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // if (formdata?.searchstring > 3) {
      console.log(
        `I can see you're not typing. I can use "${formdata?.searchstring}" now!`
      );
      if (formdata?.searchstring) {
        // setFormdata("");
        setnextpageid((prev) => "");
        setData([]);
        // tempfdata;
        const submitButton = document.querySelector("#btnsubmitter");
        document.InstrumentsForm.requestSubmit(submitButton);
      }
      // }
    }, 1000);
    setnextpageid((prev) => "");
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formdata?.searchstring]);

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
              <button
                className="btn btn-primary p-1 btn-sm"
                onClick={async () => {
                  addLoader("index", row._id);
                  await addWatchList(row);

                  addLoader("index", 0);
                  const d = new Date();
                  props.setrefreshwatchlist(d);
                  // props.setRefreshchildren(1000);
                  // router.refresh();
                }}
              >
                {loaders?.index === row._id
                  ? "Loading ..."
                  : "Add To WatchList"}
              </button>
              {/* <CustomModal
                btnText="Buy"
                headerTitle={`Buy ${row?.symbol}`}
                modalBody={
                  <span id={tempd}>
                    <BuySellForm />
                  </span>
                }
              /> */}
            </div>
          </>
        );
      },
    },
    // {
    //   prop: "customCell",
    //   title: "Action",
    //   cell: (row) => {
    //     const tempd = new Date();
    //     return (
    //       <>
    //         <div className="text-center" style={{ maxWidth: "300px" }}>
    //           <CustomModal
    //             btnText="Buy"
    //             headerTitle={`Buy ${row?.symbol}`}
    //             modalBody={
    //               <span id={tempd}>
    //                 <BuySellForm />
    //               </span>
    //             }
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    // },
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
    onscroll: async (e) => {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        document.InstrumentsForm.requestSubmit();
        // await getInstrument(data);
      }
    },
  };

  const authstate = useSelector((state) => state.auth);

  return (
    <div>
      <>
        <div className="d-flex  justify-content-between">
          {/* <h2>Instruments</h2> */}
          <h2></h2>
          <form
            name="InstrumentsForm"
            action={async (data) => {
              const temp = await getInstrument(data, nextpageid);
              console.log(temp);

              if (temp?.length >= 30) {
                setnextpageid(temp?.[temp?.length - 1]?._id);
              }
              setData((prev) => (nextpageid ? [...prev, ...temp] : temp));
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
                // if (e.target.value?.length > 3)
                //   document.InstrumentsForm.requestSubmit();
              }}
              className={"d-inline"}
            />
            {/* <div style={{ display: "none" }}>
              <button
                // className={styles.primary}
                id="btnsubmitter"
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Search
              </button>
            </div> */}
          </form>
        </div>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Instruments List</Accordion.Header>
            <Accordion.Body>
              <div
                className="table-responsive mx-3"
                style={{
                  fontFamily: "math",
                  // position: "absolute",
                  // right: "10px",
                  // background: "white",
                  // padding: "10px",
                  // zIndex: 9,
                  // borderRadius: "10px",
                }}
              >
                {data?.length > 0 ? (
                  <CustomDatatable {...tableProps} />
                ) : (
                  <>No data found</>
                )}
                {/* {data?.map((dataitem, index) => {
            return <div key={index}>{dataitem.symbol}</div>;
          })} */}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    </div>
  );
}

export default Instruments;
