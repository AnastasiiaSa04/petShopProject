import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logoHeader from "../../assets/icons/logoHeader.svg";
import iconBasket from "../../assets/icons/iconBasket.svg"


export default function Navbar() {
  return (
    <nav className={styles.header}>
      <img src={logoHeader} alt="Main logo"></img>
      <div className={styles.links}>
      <Link to="/">Main</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/sales">Sales</Link>
      <Link to="/basket">Basket</Link>
      <Link to="products">Produkts</Link>
      </div>
      <img src={iconBasket} alt="Basket"></img>
    </nav>
  );
}