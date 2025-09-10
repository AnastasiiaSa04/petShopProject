import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

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
      <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
        Thank you! Your discount request has been submitted.
      </Typography>
    );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        variant="filled"
        InputProps={{ sx: { fontSize: "16px", color: "#fff" } }}
        InputLabelProps={{ sx: { fontSize: "14px", color: "#fff" } }}
        sx={{
          borderRadius: 2,
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(171, 222, 232, 0.1)",
            "&:hover": { backgroundColor: "rgba(166, 202, 224, 0.15)" },
          },
        }}
      />
      <TextField
        label="Phone number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        variant="filled"
        InputProps={{ sx: { fontSize: "16px", color: "#fff" } }}
        InputLabelProps={{ sx: { fontSize: "14px", color: "#fff" } }}
        sx={{
          borderRadius: 2,
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(171, 222, 232, 0.1)",
            "&:hover": { backgroundColor: "rgba(166, 202, 224, 0.15)" },
          },
        }}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        variant="filled"
        InputProps={{ sx: { fontSize: "16px", color: "#fff" } }}
        InputLabelProps={{ sx: { fontSize: "14px", color: "#fff" } }}
        sx={{
          borderRadius: 2,
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(171, 222, 232, 0.1)",
            "&:hover": { backgroundColor: "rgba(166, 202, 224, 0.15)" },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 10, textTransform: "none" }}
      >
        Get a discount
      </Button>
    </Box>
  );
}
