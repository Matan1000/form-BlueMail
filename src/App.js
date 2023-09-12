import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import config from "./data.json";
import { validateValues } from "./utils";
import Field  from "./components/Field";

function App() {
  const fields = config.fields;
  const [accountType, setAccountType] = useState("Advanced");
  const isAdvanced = accountType === "Advanced";
  const [useSSL, setUseSSL] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    accountType: accountType,
    name: "",
    password: "",
    serverAdress: "",
    serverPath: "",
    port: "",
    useSSL: useSSL,
  });

  useEffect(() => {
    // Update formData when accountType / useSSL are changed
    const updatedFormData = {
      ...formData,
      accountType: accountType,
      serverPath: isAdvanced ? formData.serverPath : undefined,
      port: isAdvanced ? formData.port : undefined,
      useSSL: isAdvanced ? useSSL : undefined,
    };
    setFormData(updatedFormData);
  }, [accountType, useSSL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // perform form submission logic here, e.g., send data to a server.
    // For now, let's validate input values, approve submitting and finally log the form data to the console.
    e.preventDefault();
    setFormErrors(validateValues(formData));
    setSubmitting(true);
    console.log(formData);
  };

  return (
    <Box
      key={"fields"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        border: 2,
        boxShadow: 3,
        borderColor: "azure",
        p: 4,
        my: 4,
      }}
    >
      {Object.keys(formErrors).length === 0 && submitting ? (
        <span>Your form has been submitted successfully. Thanks!</span>
      ) : null}
      <form
        onSubmit={handleSubmit}
        style={{
          display:
            !submitting || Object.keys(formErrors).length > 0
              ? "block"
              : "none",
        }}
      >
        <Field fieldName={"Account Type"} fieldId={"accountType"}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            style={{ width: "80%" }}
          >
            <MenuItem value={"Advanced"}>Advanced</MenuItem>
            <MenuItem value={"Manual"}>Manual</MenuItem>
          </Select>
        </Field>

        {fields.slice(0, 3).map((field) => (
          <Field fieldName={field?.name} fieldId={field.id}>
            <TextField
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              variant="outlined"
              required={field.isRequired}
              margin="normal"
              type={field.type}
              placeholder={field.placeholder}
              style={{ width: "80%" }}
              error={formErrors[field?.id]}
              helperText={formErrors[field?.id] ? field.error : undefined}
            />
          </Field>
        ))}

        {isAdvanced &&
          fields.slice(3, 4).map((field) => (
            <Field fieldName={field.name} fieldId={field.id}>
              <TextField
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                variant="outlined"
                required
                margin="normal"
                placeholder={field.placeholder}
                style={{ width: "80%" }}
                error={formErrors[field?.id]}
                helperText={formErrors[field?.id] ? field.error : undefined}
              />
            </Field>
          ))}
        {isAdvanced && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
            {fields.slice(4, 5).map((field) => (
              <Field fieldName={field.name} fieldId={field.id}>
                <TextField
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  margin="normal"
                  placeholder={field.placeholder}
                  error={formErrors[field?.id]}
                  helperText={formErrors[field?.id] ? field.error : undefined}
                />
              </Field>
            ))}
            {
              <Field fieldName={"Use SSL"} fieldId={"useSSL"}>
                <Checkbox
                  checked={useSSL}
                  onChange={(e) => setUseSSL(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                  style={{ width: "80%" }}
                />{" "}
              </Field>
            }
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;