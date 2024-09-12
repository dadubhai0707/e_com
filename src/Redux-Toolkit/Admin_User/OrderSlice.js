import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  addcart: [

  ],
  order: [

  ],
  states: [

  ],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // _______________________________________________________
    // Add To Cart Product  / update product quntity
    // _______________________________________________________
    addcart: (state, action) => {
      const { userId, productId, quntity } = action.payload;
      const existingItem = state.addcart.find(
        (item) => item.userId === userId && item.productId === productId
      );
      if (existingItem) {
        existingItem.quntity += quntity;
      } else {
        state.addcart.push(action.payload);
      }
    },
    // _______________________________________________________
    // Remove Add To Cart 
    // _______________________________________________________
    removeItem: (state, action) => {
      const { userId, productId } = action.payload;
      state.addcart = state.addcart.filter(
        (item) => !(item.userId === userId && item.productId === productId)
      );
    },
    // _______________________________________________________
    // Order User 
    // _______________________________________________________
    orderUser: (state, action) => {
      const { userId, orders, order_id, time, states } = action.payload;
      state.order.push({ order_id, userId, orders, time, states });
      state.addcart = []
      console.log("thius is data", JSON.stringify(state.order, null, 2));
    },
    // _______________________________________________________
    // Confirm Order 
    // _______________________________________________________
    confirmOrder: (state, action) => {
      const orderId = action.payload;
      const orderToConfirm = state.order.find(order => order.order_id === orderId);

      if (orderToConfirm.states === 'Your Order Is Pending') {
        orderToConfirm.states = 'Confirmed';
        state.states.push({
          orderId: action.payload,
          status: 'Confirmed'
        })
        toast.success(`Order ${orderId} confirmed.`);
        console.log(`Order ${orderId} confirmed.`);
      } else if (orderToConfirm.states === 'Confirmed') {
        orderToConfirm.states = 'Order Delivered';
        state.states.push({
          orderId: action.payload,
          status: 'Order Delivered'
        })
        toast.success(`Delivered ${orderId} Order.`);
      } else if (orderToConfirm.states === 'Cancelled'){
        toast.warn(`Order Is  Cancelled .`);
      
      }else {
        toast.warn(`Order Alradey Delevierd.`);

      }
    },
    // _________________________________________________
    // Cencel Ordr 
    // _________________________________________________
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const orderToCancel = state.order.find(order => order.order_id === orderId);

      if (orderToCancel.states === 'Confirmed') {
        toast.warn(`Do Not Cancelled.`);
      }
      if (orderToCancel.states === 'Order Delivered') {
        toast.warn(`Do Not Cancelled.`);
      }
      else if(orderToCancel.states === 'Cancelled'){
        toast.warn(`Order Alradey Cancelled.`);
      }else{
        orderToCancel.states = 'Cancelled';
        state.states.push({
          orderId: action.payload,
          status: 'Cancelled'
        })
        console.log(`Order ${orderId} not found.`);
      }
    }

  }
});

export const { addcart, removeItem, orderUser, confirmOrder, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;

