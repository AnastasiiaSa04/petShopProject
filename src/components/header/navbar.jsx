import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Button, IconButton, Badge, Box } from "@mui/material";
import logoHeader from "../../assets/icons/logoHeader.svg";
import iconBasket from "../../assets/icons/iconBasket.svg";

export default function Navbar() {
  const items = useSelector((state) => state.cart?.items || []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
        >
          <img src={logoHeader} alt="Pet Shop Logo" style={{ height: 40, marginRight: 10 }} />
        </Box>
        <Box sx={{ display: "flex", gap: 3, flexGrow: 1, justifyContent: "center" }}>
          <Button color="inherit" component={Link} to="/">Main</Button>
          <Button color="inherit" component={Link} to="/categories">Categories</Button>
          <Button color="inherit" component={Link} to="/sales">Sales</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
        </Box>
        <IconButton component={Link} to="/basket" color="inherit">
          <Badge badgeContent={items.length} color="error">
            <img src={iconBasket} alt="Basket" style={{ height: 28 }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

