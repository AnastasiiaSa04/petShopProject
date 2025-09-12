import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchSaleItems } from "../../redux/slices/salesSlice.js";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import backgroundImg from "../../assets/images/mainBanner.svg";
import formBanner from "../../assets/images/formBanner.svg";
import styles from "../main/styles.module.css";
import DiscountForm from "./discountForm.jsx";

export default function Main() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const saleItems = useSelector((state) => state.sale.items || []);
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSaleItems());
  }, [dispatch]);

  return (
    <Box>

      <Box
        className={styles.bannerContainer}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <Container>
          <Typography variant="h1" sx={{ mb: 3 }}>
            Amazing Discounts on Pets Products!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/products"
          >
            Check out
          </Button>
        </Container>
      </Box>

      <Container sx={{ py: 6 }} maxWidth={false}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h2" sx={{ whiteSpace: "nowrap" }} pr={2}>
            Categories
          </Typography>
          <Box sx={{ flex: 1, borderBottom: "1px solid #8B8B8B" }} />
          <Button
            component={RouterLink}
            to="/categories"
            variant="outlined"
            sx={{
              whiteSpace: "nowrap",
              border: "1px solid #8B8B8B",
              fontSize: theme.typography.button.fontSize,
              color: "#8B8B8B",
              fontWeight: theme.typography.button.fontWeight,
              textTransform: theme.typography.button.textTransform,
            }}
          >
            All categories
          </Button>
        </Box>
        <Grid container  spacing={4} sx={{ mt: 3 }}>
          {(categories.items || []).slice(0, 4).map((category) => (
            <Grid size={{ xs: 6, md: 3 }}>
              <Card
                key={category.id}
                component={RouterLink}
                to={`/categories/${category.id}`} 
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3333${category.image}`}
                  alt={category.title}
                />
                <CardContent>
                  <Typography variant="h6">{category.title}</Typography>
                </CardContent>
              </Card>
              </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ background: "linear-gradient(90deg, #0D50FF 0%, #2451C6 100%)" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            color: "#fff",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center", py: 4 }}>
            5% off on the first order
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 6,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={formBanner}
              alt="Pets"
              sx={{ display: { xs: "none", md: "block" }, width: "auto" }}
            />
            <Box sx={{ flex: 1, maxWidth: 600, fontSize: theme.typography.body1.fontSize }}>
              <DiscountForm submitted={submitted} onSubmit={() => setSubmitted(true)} />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ pt: 5 }} maxWidth={false}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h2" sx={{ whiteSpace: "nowrap" }} pr={2}>
            Sale
          </Typography>
          <Box sx={{ flex: 1, borderBottom: "1px solid #8B8B8B" }} />
          <Button
            component={RouterLink}
            to="/sales"
            variant="outlined"
            sx={{
              whiteSpace: "nowrap",
              border: "1px solid #8B8B8B",
              fontSize: theme.typography.button.fontSize,
              color: "#8B8B8B",
              fontWeight: theme.typography.button.fontWeight,
              textTransform: theme.typography.button.textTransform,
            }}
          >
            All sales
          </Button>
        </Box>

        <Grid container spacing={4}>
          {saleItems.slice(0, 4).map((item) => {
            const discountPercent =
              item.price && item.discont_price
                ? Math.round(((item.price - item.discont_price) / item.price) * 100)
                : 0;

            return (
              <Grid size={{ xs: 6, md: 3 }} spacing={4}>
                <Card
                key={item.id}
                component={RouterLink}
                to={`/products/${item.id}`} 
                sx={{
                  width: 260,
                  position: "relative",
                  textDecoration: "none",
                  color: "inherit",
                }}
                >
                  {discountPercent > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: theme.palette.secondary.main,
                        color: "#fff",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: theme.typography.button.fontWeight,
                        fontSize: theme.typography.button.fontSize,
                        fontFamily: theme.typography.fontFamily,
                        zIndex: 10,
                      }}
                    >
                      -{discountPercent}%
                    </Box>
                  )}

                  <CardMedia
                    component="img"
                    image={`http://localhost:3333${item.image}`}
                    alt={item.title}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    {item.price && item.discont_price && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography fontSize="40px" fontWeight="600" color="black">
                          ${item.discont_price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: "line-through", color: "gray" }}
                        >
                          ${item.price}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}






  

 