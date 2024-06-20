import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};

export const Cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddOne: (state, action) => {
      const index = state.cart.findIndex(obj=>obj.id === action.payload.id)
      if(index !== -1){
        console.log("existe dejà")
      }else{
        state.cart.push({...action.payload})
      }
    },
    RemoveOne: (state,action)=>{
      const prod = state.cart.find(obj=>obj.id === action.payload.id)
      state.cart.splice(state.cart.indexOf(prod),1)
    },
    AddQuant: (state,action)=>{
      const index = state.cart.findIndex(obj=>obj.id === action.payload.id)
      state.cart[index].count++
      console.log(state.cart[index].count)
    },
    RemoveQuant: (state,action)=>{
      const prod = state.cart.find(obj=>obj.id === action.payload.id)
      const index = state.cart.findIndex(obj=>obj.id === action.payload.id)
      if(state.cart[index].count > 1){
        state.cart[index].count--
      }else{
        state.cart.splice(state.cart.indexOf(prod),1)
      }

    },
    RemoveAll: (state,action)=>{
      state.cart = []
    }
  },
});

export const a = Cart.actions;
export default Cart.reducer;
