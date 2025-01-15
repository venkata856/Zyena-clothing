import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

import { ItemCount, CartIconContainer, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartopen, setIsCartopen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartopen(!isCartopen);
  return (
    <CartIconContainer onClick={() => toggleIsCartOpen()}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
