import { createSlice } from "@reduxjs/toolkit";
import { storeProducts } from "../shared/data";

const initialState = {
  storeProducts
};

export const Products = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("cart/AddOne", (state, action) => {
        const index = state.storeProducts.findIndex(obj=>obj.id === action.payload.id)
        state.storeProducts[index].inCart = true
    });
    builder.addCase("Cart/RemoveOne",(state,action)=>{
      const index = state.storeProducts.findIndex(obj=>obj.id === action.payload.id)
      state.storeProducts[index].inCart = false
    })
  },
});

export default Products.reducer;
