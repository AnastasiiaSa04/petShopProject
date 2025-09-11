import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, Box, CardMedia, Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToBasket } from "../../redux/slices/basketSlice";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3333/products/${productId}`);
        const data = await res.json();
        if (data.status === "ERR") {
          setProduct(null);
        } else {
          setProduct(data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(prev + delta, 1));
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket({ ...product, quantity }));
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <CardMedia
          component="img"
          image={`http://localhost:3333${product.image}`}
          alt={product.title}
          sx={{ width: 300, height: 300, objectFit: "cover" }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            ${product.discont_price || product.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <IconButton size="small" onClick={() => handleQuantityChange(-1)}><RemoveIcon /></IconButton>
            <Typography>{quantity}</Typography>
            <IconButton size="small" onClick={() => handleQuantityChange(1)}><AddIcon /></IconButton>
          </Box>
          <Button
            variant="contained"
            sx={{ bgcolor: "#0D50FF", "&:hover": { bgcolor: "#282828" } }}
            onClick={handleAddToBasket}
          >
            Add to basket
          </Button>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}



