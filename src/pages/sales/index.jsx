import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleItems } from "../../redux/slices/salesSlice";
import { Box, Card, CardContent, CardMedia, Typography, Container } from "@mui/material";

function SalesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.sale);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSaleItems());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Sale Items</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {items.length === 0 && <Typography>No sale items found.</Typography>}
        {items.map((product) => (
          <Card key={product.id} sx={{ width: 260 }}>
            <CardMedia
              component="img"
              image={`http://localhost:3333${product.image}`}
              alt={product.title}
              sx={{ height: 150, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography color="error">{product.discount} % off</Typography>
              <Typography>{product.price} €</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default SalesPage;
