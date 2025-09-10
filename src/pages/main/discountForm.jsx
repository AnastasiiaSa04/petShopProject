import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const inputStyle = {
  input: { color: "#fff" },
  label: { color: "#fff" },
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: 2,
  "& .MuiFilledInput-root": {
    backgroundColor: "rgba(255,255,255,0.1)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
  },
  "& .MuiInputBase-root:before, & .MuiInputBase-root:after": {
    borderBottom: "none",
  },
};

export default function DiscountForm({ submitted, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, email });
    setName("");
    setPhone("");
    setEmail("");
  };

  if (submitted)
    return (
      <Typography variant="body1" sx={{ color: "#fff" }}>
       Thank you! Your discount request has been submitted.
      </Typography>
      
    );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {["Name", "Phone number", "Email"].map((label, idx) => (
        <TextField
          key={label}
          label={label}
          type={label === "Email" ? "email" : "text"}
          value={[name, phone, email][idx]}
          onChange={(e) => {
            if (idx === 0) setName(e.target.value);
            if (idx === 1) setPhone(e.target.value);
            if (idx === 2) setEmail(e.target.value);
          }}
          required
          variant="filled"
          sx={inputStyle}
        />
      ))}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Get Discount
      </Button>
    </Box>
  );
}