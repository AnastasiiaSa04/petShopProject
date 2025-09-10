import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
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
            <Typography variant="body2">Price: {product.price}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductPage;

