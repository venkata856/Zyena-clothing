import { ItemCount, CartIconContainer, ShoppingIcon } from "./cart-icon.styles";
import { useSelector } from "react-redux";
import { setIsCartopen } from "../../store/cart/cart.reducer";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux";

const CartIcon = () => {
  const isCartopen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartopen(!isCartopen));
  return (
    <CartIconContainer onClick={() => toggleIsCartOpen()}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
