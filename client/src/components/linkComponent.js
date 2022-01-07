import React, { useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "@mui/material/Button";

function CustomDialogContent() {
  const dialog = useDialog();
  const [value, setValue] = useState();

  return (
    <div
      style={{ alignContent: "center", alignItems: "center", padding: "10px" }}
    >
      <div>Enter the title</div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>Enter the Link</div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            // Сlose the dialog and return the value
            dialog.close(value);
          }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CustomDialogContent;
