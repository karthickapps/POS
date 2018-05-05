import React from "react";
import { Button } from "material-ui";

const SelectButton = ({ text, onClick }) => (
  <Button style={{ textTransform: "none", padding: 0 }} onClick={onClick}>
    <p
      style={{
        width: 150,
        overflowWrap: "break-word"
      }}
    >
      {text}
    </p>
  </Button>
);

export default SelectButton;
