import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/navbar";

import Main from "./pages/main";
import ProductPage from "./pages/products";
import BasketPage from "./pages/basket";
import CategoriesPage from "./pages/categories";
import SalesPage from "./pages/sales";
import NotFound from "./pages/notFoundPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;