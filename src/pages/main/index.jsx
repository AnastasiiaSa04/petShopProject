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
} from "@mui/material";
import { Link } from "react-router-dom";

import backgroundImg from "../../assets/images/mainBanner.svg";
import formBanner from "../../assets/images/formBanner.svg";
import styles from "../main/styles.module.css";
import DiscountForm from "./discountForm.jsx";
import theme from "../../theme.js";


export default function Main() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const saleItems = useSelector((state) => state.sale.items || []);
  const [submitted, setSubmitted] = useState(false);

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
            component={Link}
            to="/products"
          >
            Check out
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Button variant="outlined" component={Link} to="/categories">
          All categories
        </Button>
        <Box
          className={styles.lineToButton}
          sx={{ mt: 3, display: "flex", gap: 3, flexWrap: "wrap" }}
        >
          {(categories.items || []).slice(0, 4).map((category) => (
            <Card key={category.id} sx={{ width: 260 }}>
              <CardMedia
                component="img"
                image={`http://localhost:3333${category.image}`}
                alt={category.title}
              />
              <CardContent>
                <Typography variant="h6">{category.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Discount Form Section */}
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
            {/* Ограничиваем шрифты только для формы */}
            <Box sx={{ flex: 1, maxWidth: 600, fontSize: "16px", fontWeight: 400 }}>
              <DiscountForm
                submitted={submitted}
                onSubmit={() => setSubmitted(true)}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Sale Section */}
      <Container sx={{ pt: 5 }}>
        <Typography variant="h2">Sale</Typography>
        <Button variant="outlined" component={Link} to="/sale">
          All sales
        </Button>
        <Box sx={{ mt: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
          {saleItems.slice(0, 4).map((item) => (
            <Card
              key={item.id}
              sx={{
                width: 260,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 360,
                overflow: "hidden",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={`http://localhost:3333${item.image}`}
                alt={item.title}
                sx={{ height: 200, objectFit: "cover" }}
              />

              {/* Card Content */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  {item.price && item.discont_price && (
                    <>
                      <Typography variant="body1" color="black">
                        ${item.discont_price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "gray" }}
                      >
                        ${item.price}
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}





  

 