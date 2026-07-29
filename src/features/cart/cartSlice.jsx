import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../../axios/api";

const normalizeCart = (cart) => {
  const cartItems = (cart?.items || []).map((item) => ({
    ...item.product,
    id: item.product?._id,
    quantity: item.quantity,
    price: item.price,
  }));

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { cartItems, totalQuantity, totalPrice };
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await getCartApi();
  return normalizeCart(res.data.cart);
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    const res = await addToCartApi(product.id, 1);
    return normalizeCart(res.data.cart);
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (product) => {
    const res = await removeFromCartApi(product.id);
    return normalizeCart(res.data.cart);
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await clearCartApi();
  return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
});

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const applyCartResult = (state, action) => {
  state.loading = false;
  state.cartItems = action.payload.cartItems;
  state.totalQuantity = action.payload.totalQuantity;
  state.totalPrice = action.payload.totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, applyCartResult)
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch cart";
      })

      .addCase(addToCart.fulfilled, applyCartResult)
      .addCase(addToCart.rejected, (state) => {
        state.error = "Failed to add item to cart";
      })

      .addCase(removeFromCart.fulfilled, applyCartResult)
      .addCase(removeFromCart.rejected, (state) => {
        state.error = "Failed to remove item from cart";
      })

      .addCase(clearCart.fulfilled, applyCartResult)
      .addCase(clearCart.rejected, (state) => {
        state.error = "Failed to clear cart";
      });
  },
});

export default cartSlice.reducer;