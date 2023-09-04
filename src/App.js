import React, { useState } from "react";
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
  },
  {
    id: "password",
    name: "Password",
    placeholder: "Required",
  },
  {
    id: "serverAdress",
    name: "Server Address",
    placeholder: "example.com",
  },
  {
    id: "serverPath",
    name: "Server Path",
    placeholder: "/calendars/user/",
  },
  {
    id: "port",
    name: "Port",
    placeholder: "",
  },
  {
    id: "useSSL",
    name: "Use SSL",
    placeholder: "true",
  },
];

function App() {
  const [accountType, setAccountType] = React.useState("Advanced");
  const [useSSL, setUseSSL] = React.useState(true);
  const [formData, setFormData] = useState({
    accountType: accountType,
    name: "",
    password: "",
    serverAdress: "",
    serverPath: "",
    port: "",
    useSSL: useSSL,
  });
  const isAdvanced = accountType === "Advanced";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeAccountType = (event) => {
    setAccountType(event.target.value);
  };

  const handleChangeUseSSL = (event) => {
    setUseSSL(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // perform form submission logic here, e.g., send data to a server
    // For now, let's just log the form data to the console
    console.log(formData);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <form onSubmit={handleSubmit}>
        <div>Account Type:</div>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={accountType}
          onChange={handleChangeAccountType}
          autoWidth
        >
          <MenuItem value={"Advanced"}>Advanced</MenuItem>
          <MenuItem value={"Manual"}>Manual</MenuItem>
        </Select>
        {fields.slice(0, 4).map((x) => {
          return (
            <Box sx={{ flexDirection: "row" }}>
              <div>{x.name + ":"}</div>
              <TextField
                value={formData[x.id]}
                onChange={handleChange}
                variant="outlined"
                required
                margin="normal"
                placeholder={x.placeholder}
              />
            </Box>
          );
        })}
        {isAdvanced
          ? fields.slice(4, 5).map((x) => {
              return (
                <Box sx={{ flexDirection: "row" }}>
                  <div>{x.name + ":"}</div>
                  <TextField
                    value={formData[x.id]}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    placeholder={x.placeholder}
                  />
                </Box>
              );
            })
          : null}
        {isAdvanced ? (
          <>
            <Checkbox
              checked={useSSL}
              onChange={handleChangeUseSSL}
              inputProps={{ "aria-label": "controlled" }}
            />{" "}
            <div> Use SSL</div>
          </>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;
