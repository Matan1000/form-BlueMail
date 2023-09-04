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
    type: "text"
  },
  {
    id: "password",
    name: "Password",
    placeholder: "Required",
    type: "password"
  },
  {
    id: "serverAdress",
    name: "Server Address",
    placeholder: "example.com",
    type: "email"
  },
  {
    id: "serverPath",
    name: "Server Path",
    placeholder: "/calendars/user/",
    type: "url"
  },
  {
    id: "port",
    name: "Port",
    placeholder: "",
    type: "number"
  }
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
    // For now, let's just log the form data to the console
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        py: 6,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "20%", paddingRight: "10px" }}>
            Account Type:
          </div>
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
        </Box>

        {fields.slice(0, 3).map((field) => (
          <Box
            key={field.id}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <div style={{ width: "20%", paddingRight: "10px" }}>
              {field.name + ":"}
            </div>
            <TextField
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
              type={field.type}
              placeholder={field.placeholder}
              style={{ width: "80%" }}
            />
          </Box>
        ))}

        {isAdvanced &&
          fields.slice(3, 4).map((field) => (
            <Box
              key={field.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ width: "20%", paddingRight: "10px" }}>
                {field.name + ":"}
              </div>
              <TextField
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                variant="outlined"
                required
                margin="normal"
                placeholder={field.placeholder}
                style={{ width: "80%" }}
              />
            </Box>
          ))}

        <Box sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          {isAdvanced &&
            fields.slice(4, 5).map((field) => (
              <Box
                key={field.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "50px", paddingRight: "10px" }}>
                  {field.name + ":"}
                </div>
                <TextField
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  margin="normal"
                  placeholder={field.placeholder}
                />
              </Box>
            ))}
          {isAdvanced && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ width: "90px", paddingRight: "10px" }}>
                {" "}
                Use SSL
              </div>
              <Checkbox
                checked={useSSL}
                onChange={(e) => setUseSSL(e.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
                style={{ width: "80%" }}
              />{" "}
            </Box>
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