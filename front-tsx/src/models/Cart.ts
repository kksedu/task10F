import { Product } from "./Product";

export interface Cart {
    id: number;
    products: Product[];
    total_price: number;
    status: string;
}