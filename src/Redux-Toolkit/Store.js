import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from './Admin_User/authSlice';
import orderReducer from './Admin_User/OrderSlice';
import productReducer from './Admin_User/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
});

const persistConfig = {
  key: 'e_commerce',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);
