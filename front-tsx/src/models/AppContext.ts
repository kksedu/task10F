import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { Payment } from '../models/Payment';

export interface AppContext {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    payments: Payment[];
    setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}