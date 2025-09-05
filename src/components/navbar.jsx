import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Main</Link> |{" "}
      <Link to="/categories">Categories</Link> |{" "}
      <Link to="/sales">Sales</Link> |{" "}
      <Link to="/basket">Basket</Link>
    </nav>
  );
}