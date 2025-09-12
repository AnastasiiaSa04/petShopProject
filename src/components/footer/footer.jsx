import { Box, Link as MuiLink,Typography } from "@mui/material";
import ContactUs from "../contact_us/contact_us";

const Footer = () => (
    <Box px={{ xs: '20px', md: '24px' }}>
        <ContactUs />
    </Box>
);

export default Footer;
