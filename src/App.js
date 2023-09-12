import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

const fields = [
  {
    id: "name",
    name: "User Name",
    placeholder: "name@example.com",
    isRequired: true,
    error: "user name should be an email"
  },
  {
    id: "password",
    name: "Password",
    placeholder: "Required",
    isRequired: true,
    error: "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
    type: "password",
  },
  {
    id: "serverAdress",
    name: "Server Address",
    placeholder: "example.com",
    error:"server adress should be a URL"
  },
  {
    id: "serverPath",
    name: "Server Path",
    placeholder: "/calendars/user/",
    error:"please provide a valid path (contains alphanumeric characters and '/')"
  },
  {
    id: "port",
    name: "Port",
    placeholder: "",
    error: "Please enter a valid Port (number)"
  },
];

function App() {
  const [accountType, setAccountType] = useState("Advanced");
  const [useSSL, setUseSSL] = useState(true);
  const [formData, setFormData] = useState({
    accountType: accountType,
    name: "",
    password: "",
    serverAdress: "",
    serverPath: "",
    port: "",
    useSSL: useSSL,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting,setSubmitting] =useState(false);

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

  const isAdvanced = accountType === "Advanced";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // perform form submission logic here, e.g., send data to a server
    // For now, let's just log the form data to the console & validate input values
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
        border:2,
        boxShadow: 3,
        p:4,
        borderColor:"azure", my:4
      }}
    >
      {Object.keys(formErrors).length === 0 && submitting ? (
<span>Your Application submitted successfully. Thanks!</span>
      ): null}
      <form onSubmit={handleSubmit} style={{display: !submitting ? "block" :"none"}}>
        <Field fieldName={"Account Type"} fieldId={"accountType"}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            autoWidth
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
                // ^\/([a-zA-Z0-9\/]*)$
                // inputProps={{ inputMode: 'text', pattern: '[a-zA-Z0-9\/]*' }}
              /> 
            </Field>
          ))}

        <Box sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          {isAdvanced &&
            fields.slice(4, 5).map((field) => (
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
          {isAdvanced && (
            <Field fieldName={"Use SSL"} fieldId={"useSSL"}>
              <Checkbox
                checked={useSSL}
                onChange={(e) => setUseSSL(e.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
                style={{ width: "80%" }}
              />{" "}
            </Field>
          )}
        </Box>

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

const Field = ({ fieldName, fieldId, children }) => {
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

const validateValues = (inputValues) => {
  let errors = {};
  if (!inputValues?.name.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
  errors["name"] = true;
  if (!inputValues?.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$"))
  errors["password"] =true
  if (!inputValues?.serverAdress.match("^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$"))
  errors["serverAdress"] =true
  if (!inputValues?.serverPath.match("^[a-zA-Z0-9/]*$"))
  errors["serverPath"] =true;
if(!inputValues?.port.match("^[0-9]+$")){errors["port"]=true}
return errors
}