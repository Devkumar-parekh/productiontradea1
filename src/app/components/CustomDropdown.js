import { decodeWithKey } from "../lib/utils";

const CustomDropdown = (props) => {
  return (
    <div className={`m-1 ${props?.className || ""} customdropdown mt-auto`}>
      {/* <div style={{ fontWeight: "bold" }}>{props.label}</div> */}
      <div className="dropdown">
        <button
          className="mt-auto btn btn-sm btn-secondary"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Select {props.label}
          {props.value?.length ? ` ${props.value?.length}` : ""}
        </button>
        <div className="dropdown-content p-2 maxh-200">
          {props.dropdowndata?.map((option, optionindex) => {
            let label = props.decodelabel
              ? decodeWithKey(option[props.datalabel])
              : option[props.datalabel];
            let value = props.decodelabel
              ? decodeWithKey(option[props.datafield])
              : option[props.datafield];
            return (
              <label key={optionindex}>
                <input
                  type="checkbox"
                  name="fruits"
                  value={value}
                  onChange={(e) => {
                    console.log(e.target.checked, props.value);
                    if (e.target.checked) {
                      if (props.value) {
                        // props.value;
                        props.onChange(
                          {
                            name: props.name,
                            value: [...props.value, value],
                          },
                          1
                        );
                      } else {
                        props.onChange(
                          {
                            name: props.name,
                            value: [value],
                          },
                          1
                        );
                      }
                    } else {
                      let temp = props.value?.filter((i) => i !== value);
                      console.log(temp);
                      props.onChange(
                        {
                          name: props.name,
                          value: temp,
                        },
                        1
                      );
                    }
                  }}
                />{" "}
                {label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CustomDropdown;
