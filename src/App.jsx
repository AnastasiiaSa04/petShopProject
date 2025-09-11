import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/header/navbar";
import { ThemeProvider } from "@mui/material/styles";
import Main from "./pages/main";
import ProductPage from "./pages/products";
import BasketPage from "./pages/basket";
import CategoriesPage from "./pages/categories";
import CategoriesListPage from "./pages/categories/categoriesListPage.jsx";
import SalesPage from "./pages/sales";
import NotFound from "./pages/notFoundPage";
import "./App.css";
import theme from "./theme";
import Footer from "./components/footer/footer.jsx";
import ProductDetailsPage from "./pages/products/productDetailsPage.jsx";


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/categories" element={<CategoriesListPage />} />
          <Route path="/categories/:id" element={<CategoriesPage />} />      
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
    </ThemeProvider>
  );
}

export default App;