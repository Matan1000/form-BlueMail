import React from "react";
import Box from "@mui/material/Box";

export default function Field ({ fieldName, fieldId, children }) {
    return (
      <Box
        key={fieldId}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: fieldId !== "useSSL" ? "20%" : "90px",
            paddingRight: "10px",
          }}
        >
          {fieldId !== "useSSL" ? fieldName + ": " : fieldName}
        </div>
        {children}
      </Box>
    );
  };