import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton as MuiIconButton,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeFromBasket, updateQuantity, clearBasket } from "../../redux/slices/basketSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Basket() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const items = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openModal, setOpenModal] = useState(false);

  const handleQuantityChange = (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(item.quantity + delta, 1);
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const total = items.reduce(
    (acc, i) => acc + (i.discont_price || i.price) * i.quantity,
    0
  );

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill in all fields");
      return;
    }
    setOpenModal(true);
    dispatch(clearBasket());
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Shopping cart
      </Typography>

      {items.length === 0 ? (
        <Typography>
          Looks like you have no items in your basket currently.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Список товаров */}
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((i) => (
              <Box
                key={i.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <img
                  src={`http://localhost:3333${i.image}`}
                  alt={i.title}
                  width={100}
                  style={{ borderRadius: "8px" }}
                />
                <Typography sx={{ flex: 1 }}>{i.title}</Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" onClick={() => handleQuantityChange(i.id, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{i.quantity}</Typography>
                  <IconButton size="small" onClick={() => handleQuantityChange(i.id, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Typography sx={{ width: 80, textAlign: "right" }}>
                  ${(i.discont_price || i.price) * i.quantity}
                </Typography>

                <Button color="black" onClick={() => dispatch(removeFromBasket(i.id))}>
                  X
                </Button>
              </Box>
            ))}

          </Box>

          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 3,
              height: "fit-content",
            }}
          >
            <Typography variant="h5" fontWeight="600">
              Order Details
            </Typography>
            <Typography>Items: {itemCount}</Typography>
            <Typography>Total: ${total.toFixed(2)}</Typography>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Phone number"
              variant="outlined"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Button
              variant="contained"
              sx={{ mt: 1, bgcolor: "#0D50FF",
                           color: "#FFF", "&:hover": { bgcolor: "#282828", color: "#FFF" }, }}
              onClick={handleOrder}
            >
              Order
            </Button>
          </Paper>
        </Box>
      )}

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
            width: "420px",
            borderRadius: "12px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            scroll: "none",
            p: 4,
          },
        }}
      >
        <MuiIconButton
          onClick={() => setOpenModal(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </MuiIconButton>

        <DialogTitle
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "40px",
            mb: 2,
            textAlign: "left",
          }}
        >
          Congratulations!
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "600" }}>
            Your order has been successfully placed on the website.
            <br />
            A manager will contact you shortly to confirm your order.
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}





