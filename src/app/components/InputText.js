const InputText = (props) => {
  return (
    <div className={`m-1 ${props?.className || ""}`}>
      <div style={{ fontWeight: "bold" }}>{props.label}</div>
      <input
        type={props?.type || "text"}
        name={props?.name}
        value={props?.value || ""}
        onChange={props.onChange}
        onKeyPress={(e) => {
          if (props?.type === "number-input" && (e.which < 48 || e.which > 57))
            e.preventDefault();
        }}
        style={{
          borderRadius: "5px",
          margin: "3px",
          padding: "5px",
          fontSize: "16px",
          width: "min(300px,100%)",
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
};
export default InputText;
