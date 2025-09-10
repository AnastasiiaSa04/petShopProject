import React from "react";
import { Box, Link as MuiLink } from "@mui/material";
import instagramm from "../../assets/icons/instagram.png";
import Whatsapp from "../../assets/icons/Whatsapp.svg";

const Card = ({ label, children, width }) => (
  <Box
    sx={{
      width: width,
      height: "70px",
      p: "20px",
      bgcolor: "#F1F3F4",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Box sx={{ fontSize: "14px", color: "#6B6B6B", mb: "8px" }}>{label}</Box>
    <Box sx={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A" }}>
      {children}
    </Box>
  </Box>
);

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: "60px",
          px: "40px",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ fontSize: "40px", fontWeight: 700, mb: "32px" }}>
          Contact
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "200px",
            mb: "24px",
          }}
        >
          <Card label="Phone" width="700px">
            +49 30 915-88492
          </Card>
          <Card label="Socials" width="400px">
            <Box sx={{ display: "flex", gap: "15px" }}>
              <MuiLink href="#" target="_blank">
                <img src={instagramm} alt="Instagram" width={24} />
              </MuiLink>
              <MuiLink href="#" target="_blank">
                <img src={Whatsapp} alt="WhatsApp" width={24} />
              </MuiLink>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "200px",
            mb: "24px",
          }}
        >
          <Card label="Address" width="700px">
            Wallstraße 9-13, 10179 Berlin, Deutschland
          </Card>
          <Card label="Working Hours" width="400px">
            24 hours a day
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          borderRadius: 8, 
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.611590756681!2d13.388859216126816!3d52.51861197981133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c8f9e0c1f5%3A0x78b4c8bb24d2e4b!2sIT%20Career%20Hub%2C%20Berlin!5e0!3m2!1sen!2sde!4v1694372234567!5m2!1sen!2sde"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location"
        />
      </Box>
    </>
  );
}













