import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { Payment } from '../models/Payment';
import { AppContext } from '../models/AppContext';

const defaultValue: AppContext = {
    products: [],
    setProducts: () => [],
    cart: { id: 0, products: [], total_price: 0, status: "new" },
    setCart: () => null,
    payments: [],
    setPayments: () => [],
};

const Context = createContext<AppContext>(defaultValue);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart>({ id: 0, products: [], total_price: 0, status: "new" });
    const [payments, setPayments] = useState<Payment[]>([]);

  return (
    <Context.Provider value={{ products, setProducts, cart, setCart, payments, setPayments }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
    return useContext(Context);
  };
