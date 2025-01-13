import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartopen, setIsCartopen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartopen(!isCartopen);
  return (
    <div className="cart-icon-container" onClick={() => toggleIsCartOpen()}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
