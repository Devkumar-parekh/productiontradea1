"use client";
import React, { useState } from "react";
// import InputText from "../../components/InputText";
import InputText from "./InputText";
import RadioInput from "./RadioInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
// import axios from "axios";
function Forms(props) {
  const router = useRouter();
  const [formdata, setFormdata] = useState({});
  const [loadings, setLoadings] = useState({});

  const handleFormdata = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleLoadings = (key, value) => {
    setLoadings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    // <div style={{ textAlign: "center" }}>
    <div>
      <form
        action={async (data) => {
          // const temp = await getInstrument(data);
          // console.log(temp);
          // setData(temp);

          console.log(data, "✨💛");
          console.log("Action");
          handleLoadings("login", 1);
          //   handleAction();
          const actionResult = await props?.handleAction(data);
          if (actionResult?.status === 500) {
            alert(actionResult?.message);
          } else {
            alert(actionResult?.message);
            setFormdata({});
          }
          handleLoadings("login", 0);
        }}
      >
        <div className="d-flex flex-wrap">
          {props.formfields?.map((fielditem, feildindex) => {
            if (fielditem.type === "text" || fielditem.type === "password") {
              return (
                <div key={feildindex} className={fielditem?.class}>
                  <InputText
                    placeholder={`Enter ${fielditem?.label}`}
                    name={fielditem?.field}
                    value={formdata?.[fielditem?.field]}
                    onChange={handleFormdata}
                    type={fielditem.type}
                    label={fielditem?.label}
                  />
                </div>
              );
            } else if (fielditem.type === "number-input") {
              return (
                <div key={feildindex} className={fielditem?.class}>
                  <InputText
                    placeholder={`Enter ${fielditem?.label}`}
                    name={fielditem?.field}
                    value={formdata?.[fielditem?.field]}
                    onChange={(e) => {
                      handleFormdata(e);
                    }}
                    type={fielditem.type}
                    label={fielditem?.label}
                  />
                </div>
              );
            } else if (fielditem.type === "radio") {
              return (
                <div key={feildindex} className={fielditem?.class}>
                  <RadioInput
                    placeholder={`Enter ${fielditem?.label}`}
                    name={fielditem?.field}
                    value={formdata?.[fielditem?.field]}
                    onChange={handleFormdata}
                    type={fielditem.type}
                    radiooption={fielditem.options}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className={"button"} style={{ justifyContent: "center" }}>
          <button className={"primary me-2"} type="submit">
            <Image
              className={""}
              src="/vercelsvg.svg"
              alt=""
              width={20}
              height={20}
            />
            {loadings?.login ? "Loading..." : props.btn}
          </button>
          <button
            className={"secondary ms-2"}
            type="reset"
            onClick={async () => {
              setFormdata({});
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forms;
