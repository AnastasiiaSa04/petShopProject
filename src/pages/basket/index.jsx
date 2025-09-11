import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import { removeFromBasket, updateQuantity, clearBasket } from "../../redux/slices/basketSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function Basket() {
  const dispatch = useDispatch();
  // Используем имя редьюсера из store: cart
  const items = useSelector((state) => state.cart.items);

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

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Basket
      </Typography>

      {items.length === 0 ? (
        <Typography>Your basket is empty</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((i) => (
              <Box
                key={i.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid #ccc",
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
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(i.id, -1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{i.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(i.id, 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                <Typography sx={{ width: 80, textAlign: "right" }}>
                  ${(i.discont_price || i.price) * i.quantity}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeFromBasket(i.id))}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>

          <Typography variant="h4" sx={{ mt: 3 }}>
            Total: ${total}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#0D50FF", "&:hover": { backgroundColor: "#282828" } }}
            onClick={() => dispatch(clearBasket())}
          >
            Clear Basket
          </Button>
        </>
      )}
    </Container>
  );
}


